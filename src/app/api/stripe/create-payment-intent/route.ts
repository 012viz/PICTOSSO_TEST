import { NextRequest, NextResponse } from "next/server";
import { GelatoOrderData, TPaymentIntentResponse, TStripeIntentMeta, TGetPrice, TCreatePaymentPictoMeta, PeriodType } from '@/types';
import { createGelatoOrder, patchGelatoDraftOrder } from '@/utils/gelatoHelpers';
import { stripeInstance } from "../stripeSingleton";
import { epsilon2, formatDate, getPrice } from "@/utils";
import fs from "fs";
export const dynamic = "force-dynamic";
import { v4 as uuid } from 'uuid';
import { OrderParameters, sendMailOrderReceived } from "@/utils/mailjet";
const { exec } = require("child_process");

const BRANDED_INSERT = true;
const BRANDED_STICKER = true;

async function saveArtworkToDisk(svgFile: Blob, filePathNoExtension: string): Promise<void> {
    const svgPath = `${filePathNoExtension}.svg`
    const jpegPath = `${filePathNoExtension}.jpeg`
    // Convert Blob to Buffer
    const buffer = await svgFile.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    // Write the Buffer to file
    return new Promise((resolve, reject) => {
        // @ts-ignore
        fs.writeFile(svgPath, fileBuffer, (err) => {
            if (err) {
                console.error('Error saving SVG file:', err);
                reject('Error saving SVG file');
            } else {
                console.log('SVG file saved successfully:', svgPath);
                exec(`rsvg-convert ${svgPath} -w 8192 -o ${jpegPath} -b "#fff"`, (error: any, stdout: any, stderr: any) => {
                    if (error) return console.log(`error: ${error.message}`);
                    resolve();
                });

            }
        });
    });
}


export const POST = async (req: NextRequest) => {
    // const json = await req.json();
    // console.log("JSON", json);

    const formData = await req.formData();
    const svgFile = formData.get('svgFile') as Blob;
    const data = Object.fromEntries(formData.entries()) as unknown as { body: string, metadata: string };
    const input = JSON.parse(data.body) as TGetPrice;
    const metadata = JSON.parse(data.metadata) as TCreatePaymentPictoMeta;

    const { firstName, lastName, addressLine1, addressLine2, state, city, postCode, country, email, phone, shipmentMethodUid, couponCode } = input;
    const { startDate, endDate, iconNumber, periodType, title, size, quantity, currency, iconPath } = metadata;

    try {
        const price = await getPrice(input);

        // create a stripe custommer for stripe
        const customer = await stripeInstance.customers.create({
            description: `Order from ${firstName} ${lastName}`,
            email: email,
            name: `${firstName} ${lastName}`,
            shipping: {
                address: {
                    city: city,
                    country: country,
                    line1: addressLine1,
                    line2: addressLine2 || "",
                    postal_code: postCode,
                    state: state,
                },
                name: `${firstName} ${lastName}`,
            }
        });

        console.log("Stipre customer created")



        const imageName = uuid();
        const imagePublicUrlNoExtension = `${process.env.WEBSITE_BASE_URL}/api/images/${imageName}`;
        const imagePublicUrlSvg = `${imagePublicUrlNoExtension}.svg`;
        const imagePublicUrlJpeg = `${imagePublicUrlNoExtension}.jpeg`;
        const filePathNoExtension = `public/pictossos/${imageName}`;
        await saveArtworkToDisk(svgFile, filePathNoExtension);
        // TODO: no more array 
        // grab items from user cart to add to order
        // if the image needs to be upscaled do it
        let items = [];
        for (let i = 0; i < input.products.length; i++) {
            let product = input.products[i];
            // let imagePath = product.publicPath;
            items.push({
                itemReferenceId: `cartItemId-${product.productUid}`,
                productUid: product.productUid,
                files: [
                    {
                        type: "default",
                        url: imagePublicUrlJpeg
                    },
                ],
                quantity: product.quantity,
            });
        }

        const formattedStartDate = formatDate(new Date(startDate), periodType);
        const formattedEndDate = formatDate(new Date(endDate), periodType);
        if (BRANDED_INSERT == true) {
            const brandedInsertUrl = encodeURI(`${process.env.NEXT_PUBLIC_WEBSITE_BASE_URL}/api/gelato/packaging/insert?startDate=${formattedStartDate}&endDate=${formattedEndDate}&numberIcons=${iconNumber}&periodType=${periodType}&iconPath=${iconPath}`);
            console.log("brandedInsertUrl", brandedInsertUrl)
            items.push({
                "itemReferenceId": "branded-insert-vertical",
                "productUid": "branded_insert_101x152-mm-4x6-inch_170-gsm-65lb-uncoated_insert_4-0_ver",
                "files": [{
                    "url": brandedInsertUrl,
                    "type": "default"
                }
                ],
                "quantity": 1
            },)
        }
        if (BRANDED_STICKER == true) {
            const brandedLabeltUrl = `${process.env.NEXT_PUBLIC_WEBSITE_BASE_URL}/label.jpg`;
            console.log("brandedLabeltUrl", brandedLabeltUrl)
            items.push({
                "itemReferenceId": "branded-label-horizontal",
                "productUid": "branded_sticker_101x76-mm-4x3-inch-label_bopp-white-gloss-perm-60-micron_external-application_4-0_hor",
                "files": [{
                    "url": brandedLabeltUrl,
                    "type": "default"
                }
                ],
                "quantity": 1
            },)
        }

        // Place gelato order as draft. The order will not be payed until it is patched.
        // The order is patched as soon as stripe fetch the webhook to confirm the payment, with the gelatoOrderId in the metadata
        const gelatoOrderDataDraft: GelatoOrderData = {
            orderType: "draft",
            orderReferenceId: `${firstName} ${lastName}`,
            customerReferenceId: `pictosso-userid-${input.email}`,
            currency: "EUR",
            items: items,
            shipmentMethodUid: input.shipmentMethodUid,
            shippingAddress: { firstName, lastName, addressLine1, addressLine2, state, city, postCode, country, email, phone: phone || "", },
            returnAddress: { addressLine1, addressLine2, state, city, postCode, country, email, phone: phone || "", },
            // Since we don't store custom data in any local database, store relevent metadatas in gelato order
            metadata: [
                {
                    key: "coupon",
                    value: `${input?.couponCode}`
                },
                {
                    key: "userEmail",
                    value: `${input.email}`,
                },
                {
                    key: "firstName",
                    value: firstName,
                },
                {
                    key: "lastName",
                    value: lastName,
                },
                {
                    key: "iconPath",
                    value: iconPath,
                }
            ]
        };

        const gelatoOrder = await createGelatoOrder(gelatoOrderDataDraft)


        // create the payment metadata (need to be string)
        // The orderId will be used when the payment is confirmed to patch the gelato order. Which will activate the real order from gelato. 
        const stripePaymentIntentMeta: TStripeIntentMeta = {
            iconPath: iconPath,
            orderId: `${gelatoOrder.id}`,
            imagePublicUrl: imagePublicUrlJpeg,
            email: input.email,
            firstName: firstName,
            orderDate: formatDate(new Date(), PeriodType.DAY),
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            iconNumber: iconNumber,
            periodType: periodType,
            invoiceNumber: gelatoOrder.id,
            invoiceDate: formatDate(new Date(), PeriodType.DAY),
            currency: currency,
            lastName: lastName,
            shippingAddress: addressLine1,
            shippingAddressLine2: addressLine2 || "",
            shippingCity: city,
            shippingZipCode: postCode,
            shippingCountry: country,
            title: title,
            size: size,
            quantity: quantity,
            couponCode: input?.couponCode,
            amount: epsilon2(price.total * 100) / 100
        }

        // IF FREE
        if (price.total <= 0) {
            const response: TPaymentIntentResponse = {
                ...price,
                free: true,
                orderId: gelatoOrder.id,
            }
            await patchGelatoDraftOrder(gelatoOrder.id)
            sendMailOrderReceived(stripePaymentIntentMeta)
            return NextResponse.json(response, { status: 200 })
        }


        const paymentIntent = await stripeInstance.paymentIntents.create({
            currency: input.currency,
            amount: epsilon2(price.total * 100),
            customer: customer.id,
            metadata: stripePaymentIntentMeta,
            automatic_payment_methods: { enabled: true },
        });


        const response: TPaymentIntentResponse = {
            ...price,
            free: false,
            orderId: gelatoOrder.id,
            clientSecret: paymentIntent.client_secret || "",
        }
        // Send publishable key and PaymentIntent details to client
        return NextResponse.json(response, { status: 200 });

    } catch (error: any) {
        console.log("create-payment-intent", error)
        return new NextResponse(error, {
            status: 400,
        });
    }
};