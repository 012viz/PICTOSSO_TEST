import { GelatoOrder, GelatoOrderData, TStripeIntentMeta } from '@/types';
import { getGelatoOrderMetadataByKey } from '@/utils';
import Mailjet from 'node-mailjet';

const mailjet = new Mailjet({
    apiKey: process.env.MAILJET_API_KEY || ' ',
    apiSecret: process.env.MAILJET_API_SECRET || ' '
});

export type OrderParameters = {
    currency: string;
    email: string;
    firstName: string;
    orderDate: string;
    startDate: string;
    endDate: string;
    iconNumber: number;
    periodType: string;
    invoiceNumber: string;
    invoiceDate: string;
    lastName: string;
    shippingAddress: string;
    shippingAddressLine2: string;
    shippingCity: string;
    shippingZipCode: string;
    shippingCountry: string;
    title: string;
    size: string;
    quantity: number;
    amount: number;
};


const senderEmail = "orders@pictosso.com"
const senderName = "Orders from Pictosso"

export const sendMailTrackingCode = (order: GelatoOrder, trackingUrl: string, trackingCode: string) => {
    const email = getGelatoOrderMetadataByKey(order, "userEmail");
    const firstName = getGelatoOrderMetadataByKey(order, "firstName");
    const lastName = getGelatoOrderMetadataByKey(order, "lastName");
    const shippingAddress = `${order.shippingAddress.addressLine1}, ${order.shippingAddress.state}, ${order.shippingAddress.city}`;
    console.log("sendMailTrackingCode", email)
    mailjet.post("send", { 'version': 'v3.1' }).request({
        "Messages": [{
            "From": { "Email": senderEmail, "Name": senderName },
            "To": [{ "Email": email, "Name": `${firstName} ${lastName}` }],
            "Bcc": [
                {
                    "Email": "erwan.boehm@gmail.com",
                    "Name": "Erwan BOEHM"
                }
            ],
            "TemplateID": 6356036,
            "TemplateLanguage": true,
            "Subject": "Suivi de commande",
            "Variables": {
                "firstName": firstName,
                "orderId": order.id,
                "trackingUrl": trackingUrl,
                "trackingCode": trackingCode,
                "shippingAddress": shippingAddress,
            }
        }]
    }).then(r => console.log(r.body))
}


export const sendMailOrderReceived = (order: TStripeIntentMeta) => {
    console.log("sendMailOrderReceived", order)
    const { currency, firstName, orderDate, startDate, endDate, iconNumber, periodType, iconPath, invoiceNumber, invoiceDate, lastName, shippingAddress, shippingCity, shippingZipCode, shippingCountry, title, size, quantity, amount } = order;
    const mainIconUrl = encodeURI(`${process.env.NEXT_PUBLIC_WEBSITE_BASE_URL}/api/gelato/packaging/icon?iconPath=${iconPath}`);

    mailjet.post("send", { 'version': 'v3.1' }).request({
        "Messages": [{
            "From": { "Email": senderEmail, "Name": senderName },
            "To": [{ "Email": order.email, "Name": `${order.firstName}` }],
            // "Bcc": [
            //     {
            //         "Email": "erwan.boehm@gmail.com",
            //         "Name": "Erwan BOEHM"
            //     }
            // ],
            "TemplateID": 5233844,
            "TemplateLanguage": true,
            "Subject": "Your beautiful Pictosso",
            "Variables": {
                currency: currency.toUpperCase(),
                firstName,
                orderDate,
                startDate,
                endDate,
                iconNumber,
                mainIconUrl,
                periodType,
                invoiceNumber,
                invoiceDate,
                lastName,
                shippingAddress,
                shippingCity,
                shippingZipCode,
                shippingCountry,
                title,
                size,
                quantity,
                amount
            }
        }]
    }).then(r => console.log(r.body))
}