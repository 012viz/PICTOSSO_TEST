import { OrderParameters } from "./utils/mailjet";

export type IPeriodType = "days" | "months" | "years"
export enum PeriodType {
    DAY = "days",
    MONTH = "months",
    YEAR = "years"
}


export enum Steps {
    YourStory = "1. Your story",
    LifeEvents = "2. Life events",
    TitleLayout = "3. Title & Layout",

    LettersNumbers = "Letters & Numbers",
    Emoji = "Emoji",
    Icons = "Icons",
    CustomSvg = "Upload My SVG",

    Checkout1DesignReview = "1/5 Design review",
    Checkout2Product = "2/5 Product",
    Checkout3ShippingInformation = "3/5 Shipping information",
    Checkout4OrderSummary = "4/5 Order summary",
    Checkout5PaymentInformation = "5/5 Payment information",
    CheckoutThanks = "Checkout6Thanks",
}

export type ActiveStep = keyof typeof Steps;



export interface ITitles {
    titleEnabled: boolean,
    subtitleEnabled: boolean,
    title?: string,
    subtitle?: string,
    size: "small" | "xl",
    position: {
        x: "left" | "center" | "right",
        y: "top" | "bottom",
    }
}
export interface IIcon {
    id: string,
    size: number,
    color?: string,
    name: string,
    description?: string,
    usage?: string,
    path: string,
    width?: number,
    height?: number,
    source: "local" | "iconify" | "path"
}

export interface ILifeEvent {
    id: string,
    icon: IIcon,
    date: number,
    description: string,
}

export interface IPictoPos {
    leId?: string,
    width: number,
    height: number,
    x: number,
    y: number,
    icon: IIcon,
}


export interface IProject {
    pictos: IPictoPos[],
    width: number,
    height: number,
}


// -- SERVER
export interface ILocation {
    street_number?: string,
    street_name?: string,
    city?: string,
    postal_code?: string,
    administrative_area_level_1?: string,
    administrative_area_level_2?: string,
    country?: string
}


export type TProductDetail = { uid: string, color: string };

export enum Currencies {
    usd = "usd",
    eur = "eur",
    gbp = "gbp",
}

export const currenciesSymbols = {
    [Currencies.usd]: "$",
    [Currencies.eur]: "€",
    [Currencies.gbp]: "£",
}
export type Currency = keyof typeof Currencies

export type TProduct = {
    details: TProductDetail[],
    frame_width: number,
    frame_height: number,
    frame_width_inches: number,
    frame_height_inches: number,
    max_recommanded_icons?: number,
    min_recommanded_icons?: number,
    name: string,
    price: {
        eur: number,
        usd: number,
        gbp: number,
    },
}

// calculate price
export type TGetPrice = TGetShippingMethodInput & {
    shipmentMethodUid: string,
    couponCode?: string,
}


export type TPriceResponse = {
    products: number,
    shipping: number,
    discount: number,
    taxes: number,
    total: number,
}

// shipping
export type TGetShippingMethodInput = {
    // companyName?: string | null,
    firstName: string,
    lastName: string,
    addressLine1: string,
    addressLine2?: string | null,
    state?: string,
    city: string,
    postCode: string,
    country: string,
    email: string,
    phone?: string,
    currency: Currency;
    products: {
        productUid: string,
        publicPath: string,
        quantity: number,
    }[],
}

// gelato
export type TGelatoProduct = {
    id: string
    storeId: string
    clientId: string
    externalId: any
    title: string
    description: string
    previewUrl: any
    externalPreviewUrl: string
    externalThumbnailUrl: string
    isReadyToPublish: boolean
    publishedAt: any
    createdAt: string
    updatedAt: string
    category: string
    previewFileType: string
    productVariantPreviewScene: string
    variants: any[]
    productVariantOptions: any[]
    collectionsIds: any[]
    tags: any[]
    status: string
    productImages: any[]
    metadata: TGelatoProductMetadata[]
    handle: any
    publishingErrorCode: any
    publishingDetailsFlags: any[]
    hasDraft: boolean
    isFreeShipping: boolean
    publishingErrorDetails: any
    productVideos: any[]
    templateName: string
    parentTemplateId: string
    priceUpdatedAt: any
    productVariantAttributes: any[]
    personalizationSettings: any
}

export type TCreatePaymentPictoMeta = {
    currency: Currency;
    startDate: number;
    endDate: number;
    iconNumber: number;
    iconPath: string;
    periodType: IPeriodType;
    title: string;
    size: string;
    quantity: number;
}
export type TStripeIntentMeta = OrderParameters & {
    orderId: string // meta are strings, so need to convert back
    imagePublicUrl: string
    iconPath: string,
    couponCode?:string,
}

export type TPaymentIntentResponse = TPriceResponse & {
    clientSecret?: string,
    orderId: string,
    free: boolean,
}


export interface TGelatoProductMetadata {
    id: string
    productId: string
    variantId: any
    imageId: any
    key: string
    value: string
    isExternal: boolean
}



// gelato order:
interface GelatoOrderFile {
    type: string;
    url: string;
}

interface GelatoOrderItem {
    itemReferenceId: string;
    productUid: string;
    files: GelatoOrderFile[];
    quantity: number;
}

interface GelatoAddress {
    companyName?: string | null;
    firstName?: string;
    lastName?: string;
    addressLine1: string;
    addressLine2?: string | null;
    state?: string;
    city: string;
    postCode: string;
    country: string;
    email: string;
    phone: string;
}

interface GelatoOrderMetadata {
    key: string;
    value: string;
}

export interface GelatoOrderData {
    orderType: string;
    orderReferenceId: string;
    customerReferenceId: string;
    currency: string;
    items: GelatoOrderItem[];
    shipmentMethodUid: string;
    shippingAddress: GelatoAddress;
    returnAddress: GelatoAddress;
    metadata?: GelatoOrderMetadata[];
}

export type GelatoOrder = GelatoOrderData & { id: string }

// SHIPPING
export type ShippmentQuoteResponse = {
    orderReferenceId: string;
    quotes: ShippmentQuote[];
}

interface ShippmentQuote {
    id: string;
    itemReferenceIds: string[];
    products: ShippmentProduct[];
    fulfillmentCountry: string;
    shipmentMethods: ShipmentMethod[];
    expirationDateTime: string;
    productionTimeZone: string;
    productionCountry: string;
}

interface ShippmentProduct {
    itemReferenceId: string;
    productUid: string;
    quantity: number;
    pageCount: number | null;
    price: number;
    currency: string;
    options: any[]; // Replace 'any' with a more specific type if possible
    customTrim: any | null; // Replace 'any' with a more specific type if possible
}

export type ShipmentMethod = {
    deliveryPromiseId: string;
    name: string;
    shipmentMethodUid: string;
    price: number;
    initialPrice: number;
    currency: string;
    minDeliveryDays: number;
    maxDeliveryDays: number;
    minDeliveryDate: string;
    maxDeliveryDate: string;
    type: string;
    isPrivate: boolean;
    isBusiness: boolean;
    totalWeight: number;
    packageCount: number;
    incoTerms: string;
}

// gelato webhooks
type FulfilmentStatus = "created" | "passed" | "failed" | "canceled" | "printed" | "shipped" | "draft" | "pending_approval" | "not_connected" | "on_hold" | "in_transit" | "delivered" | "returned"
export interface OrderStatusUpdatedEvent {
    id: string;
    event: "order_status_updated";
    orderId: string;
    storeId: null | string;
    orderReferenceId: string;
    fulfillmentStatus: FulfilmentStatus;
    status: FulfilmentStatus;
    items: Array<{
        itemReferenceId: string;
        fulfillmentStatus: FulfilmentStatus;
        fulfillments: Array<{
            trackingCode: string;
            trackingUrl: string;
            shipmentMethodName: string;
            shipmentMethodUid: string;
            fulfillmentCountry: string;
            fulfillmentStateProvince: string;
            fulfillmentFacilityId: string;
        }>;
    }>;
}

export interface OrderItemStatusUpdatedEvent {
    id: string;
    event: "order_item_status_updated";
    itemReferenceId: string;
    orderReferenceId: string;
    orderId: string;
    storeId: null | string;
    fulfillmentCountry: string;
    fulfillmentStateProvince: string;
    fulfillmentFacilityId: string;
    status: FulfilmentStatus;
    comment: string;
    created: string;
}

export interface OrderItemTrackingCodeUpdated {
    id: string;
    event: "order_item_tracking_code_updated";
    orderId: string;
    storeId: string;
    itemReferenceId: string;
    orderReferenceId: string;
    trackingCode: string;
    trackingUrl: string;
    shipmentMethodName: string;
    shipmentMethodUid: string;
    productionCountry: string;
    productionStateProvince: string;
    productionFacilityId: string;
    created: string;
}

export interface OrderDeliveryEstimateUpdated {
    id: string;
    event: "order_delivery_estimate_updated";
    orderId: string;
    storeId: null | string;
    orderReferenceId: string;
    minDeliveryDate: string;
    maxDeliveryDate: string;
    created: string;
}

export type WebHookEvent = OrderStatusUpdatedEvent | OrderItemStatusUpdatedEvent | OrderItemTrackingCodeUpdated | OrderDeliveryEstimateUpdated;


//   get orders/publicImages

export type PublicImageFromOrder = {
    generatedImage: {
        publicPath: string;
    };
    generatedImagePreviews: string[];
    prompt: string;
}

export type PublicImagesFromOrder = PublicImageFromOrder[]