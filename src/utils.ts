import Stripe from "stripe";
import { stripeInstance } from "./app/api/stripe/stripeSingleton";
import { GelatoOrder, GelatoOrderData, IPeriodType, PeriodType, ShipmentMethod, TGetPrice, TPriceResponse, TProduct } from "./types";
import { getGelatoShippingMethods } from "./utils/gelatoHelpers";
import { NextResponse } from "next/server";
import availableProducts from "./app/api/gelato/products/availableProducts";

export const formatDate = (date: Date, periodType: IPeriodType): string => {
    console.log("FORMATDATE", date, typeof date)
    if (!date || date.toString() === "Invalid Date") {
        return "invalid date";
    }

    let options: Intl.DateTimeFormatOptions = {};

    switch (periodType) {
        case PeriodType.YEAR:
            options = { year: "numeric" };
            break;
        case PeriodType.MONTH:
            options = { year: "numeric", month: "long" };
            break;
        case PeriodType.DAY:
            options = { year: "numeric", month: "long", day: "numeric" };
            break;
    }

    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(date);

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const parts = formattedDate.split(" ");
    const monthIndex = months.indexOf(parts[1]);

    if (monthIndex !== -1) {
        parts[1] = months[monthIndex];
    }

    if (parts[0] === "1") {
        parts[0] = "1st";
    }

    return parts.join(" ");
};
export const getProducts = async () => {
    console.log("Getting products...");
    // Use relative URL for API route in the same Next.js app
    const baseUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : process.env.NEXT_PUBLIC_WEBSITE_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/gelato/products`)
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    const products: TProduct[] = await res.json();
    return products;
}

export const getShipmentMethodPrice = (shipmentMethod: ShipmentMethod) => {
    // TODO: note: disable free worldwide shipping
    // if (shipmentMethod.type == "normal") return 0;
    return shipmentMethod.price;
}


export const capitalized = (word: string) => word.charAt(0).toUpperCase() + word.slice(1)


export const getStripeCoupons = async () => {
    try {
        const coupons = await stripeInstance.coupons.list({
            limit: 100 // Adjust the limit as needed
        });

        return coupons.data as Stripe.Coupon[];
    } catch (error) {
        console.error('Error fetching coupons:', error);
        throw error;
    }
}


export const epsilonN = (N: number) => (num: number) => Math.round(num * N + Number.EPSILON) / N;
export const epsilon2 = epsilonN(1e2);

export const findProduct = (productUid: string, products: TProduct[]) => {
    const product = products.find(p => p.details.find(d => d.uid == productUid));
    return product
}

export const handleButtonClick = (buttonName: string): void => {
    try {
        (window as any).gtag('event', 'button_click', {
            event_category: 'interaction',
            event_label: buttonName,
            value: 1,
        });
    } catch (error) {
        console.error('Error tracking button click:', error);
    }
};

export const calculateTaxe = async (input: TGetPrice, totalHTWithDiscount: number, shippingCost: number) => {
    console.log("calculateTaxe", shippingCost, totalHTWithDiscount)
    const taxCalculation = await stripeInstance.tax.calculations.create({
        currency: input.currency,
        customer_details: {
            address: {
                line1: input.addressLine1,
                city: input.city,
                state: input.state,
                postal_code: input.postCode,
                country: input.country,
            },
            address_source: 'shipping',
        },
        line_items: [
            {
                amount: epsilon2(totalHTWithDiscount * 100),
                reference: `order ${input.email}`,
            },
        ],
        shipping_cost: {
            amount: epsilon2(shippingCost * 100),
        },
        expand: ['line_items'],
    });

    return taxCalculation;

}


export const getPrice = async (input: TGetPrice) => {
    const shippingMethods = await getGelatoShippingMethods(input);

    const { couponCode, shipmentMethodUid } = input;

    if (!shippingMethods || shippingMethods.quotes.length <= 0) throw new Error("error could not find shipping methods");
    const shippingMethod = shippingMethods.quotes[0].shipmentMethods.find(sm => sm.shipmentMethodUid == shipmentMethodUid)
    if (!shippingMethod) throw new Error("error shipping methods does not match");


    const shippingCost = getShipmentMethodPrice(shippingMethod);
    const products = input.products.reduce((total, product) => (findProduct(product.productUid, availableProducts) as TProduct).price[input.currency] * product.quantity + total, 0);

    let discount = 0;
    const totalHT = epsilon2(shippingCost + products)

    if (couponCode) {
        const coupons = await getStripeCoupons();
        const coupon = coupons.find(c => c.name === couponCode && c.valid);
        if (coupon) {
            // coupon is 
            if (coupon.amount_off) {
                discount = epsilon2(coupon.amount_off / 100);
            } else if (coupon.percent_off) {
                discount = epsilon2(coupon.percent_off / 100 * totalHT);
            }
        }
    }

    const totalHTWithDiscount = epsilon2(totalHT - discount);

    const _taxes = await calculateTaxe(input, totalHTWithDiscount, shippingCost);
    const taxes = _taxes.tax_amount_exclusive / 100;
    // console.log("=============================TAXES", input, totalHTWithDiscount, shippingCost, _taxes)

    const total = epsilon2(totalHTWithDiscount + taxes);


    return {
        products,
        shipping: shippingCost,
        discount,
        taxes,
        total,
    } as TPriceResponse;
}

export const getGelatoOrderMetadataByKey = (order: GelatoOrder, key: string): string | undefined => {
    const item = order.metadata?.find(item => item.key === key);
    return item ? item.value : undefined;
};



// Make sure to install xmldom: npm install xmldom
const { DOMParser, XMLSerializer } = require('xmldom');

export const overrideFill = (svgString: string, fillColor: string) => {
    // Replace all fill attributes with the desired color
    return svgString.replace(/fill="[^"]*"/gi, `fill="${fillColor}"`);
};

export const extractInnerSVG = (svgString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const svgEl = doc.getElementsByTagName('svg')[0];
    let inner = '';
    let viewBox = '0 0 15 15';
    if (svgEl) {
        viewBox = svgEl.getAttribute('viewBox') ||
            `0 0 ${svgEl.getAttribute('width') || 15} ${svgEl.getAttribute('height') || 15}`;
        const serializer = new XMLSerializer();
        // Serialize all child nodes of the SVG element to get its inner content
        for (let i = 0; i < svgEl.childNodes.length; i++) {
            inner += serializer.serializeToString(svgEl.childNodes[i]);
        }
    } else {
        inner = svgString;
    }
    return { inner, viewBox };
};

export function generateSvgString({ id = '', width = 15, height = 15, fillColor = '', style = '', icon }: { id?: string, width?: number, height?: number, fillColor?: string, style?: string, icon: { path: string } }) {
    // Process the original SVG string by overriding the fill (if provided)
    const processedSvg = fillColor ? overrideFill(icon.path, fillColor) : icon.path;
    const { inner, viewBox } = extractInnerSVG(processedSvg);

    // Build the final SVG string. Note: onClick is omitted as it's not applicable in a static SVG string.
    const svgString = `<svg id="${id}" width="${width}" height="${height}" viewBox="${viewBox}" fill="${fillColor}" style="${style}" preserveAspectRatio="xMidYMid meet">` +
        `<g>${inner}</g>` +
        `</svg>`;
    return svgString;
}
