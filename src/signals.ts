"use client"

import { effect, signal } from "@preact/signals-react";
import { IIcon, ILifeEvent, IPeriodType, TProduct, IProject, ITitles, PeriodType, Steps, TProductDetail, Currency, TPriceResponse, Currencies } from "./types";
import { v4 as uuid } from 'uuid';
import { endIcon, icons, iconsByKey, startIcon } from "./icons";
import { Country } from "./app/project/Checkout/CountryPicker";
import countryList from "./app/project/Checkout/country-list";
import { getProducts } from "./utils";
import { IComputeProjectOut } from "./app/project/ProjectPreview";
import persistSignal from "./utils/persistSignal";
import { PlaceType } from "./app/project/Checkout/AddressPicker";

export const stateVersion = 'v1.4'

effect(async () => {
    // if (typeof window == 'undefined') return;
    console.log("FETCH PRODUCTS")
    const _products = await getProducts()
    products.value = _products;
    selectedProduct.value = _products[0];
    selectedProductDetail.value = _products[0].details[0];
});

export const selectedPeriodType = persistSignal<IPeriodType>('selectedPeriodType', stateVersion, PeriodType.MONTH);

export const activeStep = signal<Steps>(Steps.YourStory);

export const mobileMenuOpen = signal<boolean>(false);
export const bottomProjectPreviewOpen = signal<boolean>(false);
export const frameTextureUri = signal<string | null>(null);


export const lifeEvents = persistSignal<ILifeEvent[]>('lifeEvents', stateVersion, [
    {
        id: uuid(),
        icon: { ...iconsByKey['First Kiss'], color: "#693db8" },
        date: Date.parse('01 Jan 2010 00:00:00 GMT'),
        description: "",
    },
    {
        id: uuid(),
        icon: { ...iconsByKey['Birth'], color: "#e91e63" },
        date: Date.parse('01 May 2014 00:00:00 GMT'),
        description: "",
    },
    {
        id: uuid(),
        icon: { ...iconsByKey['New Home'], color: "#673ab7" },
        date: Date.parse('01 Jan 2020 00:00:00 GMT'),
        description: "",
    },
]);

export const highlightedLifeEvent = signal<ILifeEvent | null>(null);

export const titlePlaceHolder = "YOUR TITLE"

export const mainIcon = persistSignal<IIcon>('mainIcon', stateVersion, icons[0]);
export const titles = persistSignal<ITitles>('titles', stateVersion, {
    titleEnabled: true,
    subtitleEnabled: true,
    title: "OUR\nSTORY",
    subtitle: "A beautiful chapter - From 2010 To 2020",
    size: "xl",
    position: {
        x: "left",
        y: "top"
    }
});

export const project = signal<IProject>({
    pictos: [],
    width: 0,
    height: 0
});

export const computedProject = signal<IComputeProjectOut | null>(null)

export const products = signal<TProduct[]>([]);
export const currency = persistSignal<Currency>('currency', stateVersion, Currencies.eur);
export const productQuantity = signal<number>(1);
export const selectedProduct = persistSignal<TProduct | null>('selectedProduct', stateVersion, null);
export const selectedProductDetail = persistSignal<TProductDetail | null>('selectedProductDetail', stateVersion, null);

export const startDate = persistSignal<number>('startDate', stateVersion, Date.parse('01 Jan 2010 00:00:00 GMT'));
export const endDate = persistSignal<number>('endDate', stateVersion, Date.parse('01 Jan 2020 00:00:00 GMT'));


export const couponCode = signal<string>("");
export const orderId = signal<string>("");
// shipping
export const autoCompletePlace = signal<PlaceType | null>(null)
export const shippingMethodUid = signal<string>("");
export const shippingFirstname = signal<string>("");
export const shippingLastname = signal<string>("");
export const shippingAddress = signal<string>("");
export const shippingAddressLine1 = signal<string>("");
export const shippingAddressLine2 = signal<string>("");
export const shippingEmail = signal<string>("");
export const shippingPhone = signal<string>("");
export const shippingCountry = signal<Country | null>(countryList.find((country) => country.code === 'FR') || null);
export const shippingCity = signal<string>("");
export const shippingStateProvince = signal<string>("");
export const shippingZipCode = signal<string>("");

export const price = signal<TPriceResponse | null>(null);

