"use client"

import { Back, StepTitle } from ".";
import { activeStep, couponCode, currency, price, productQuantity, selectedProduct, selectedProductDetail, shippingAddress, shippingAddressLine1, shippingAddressLine2, shippingCity, shippingCountry, shippingEmail, shippingFirstname, shippingLastname, shippingMethodUid, shippingPhone, shippingStateProvince, shippingZipCode } from "@/signals";
import { currenciesSymbols, ShipmentMethod, Steps, TGetPrice, TGetShippingMethodInput, TProduct } from "@/types";
import { useEffect, useState } from "react";
import PurpleButton from "@/components/PurpleButton";
import { getShipmentMethodPrice, handleButtonClick } from "@/utils";
import Spinner from "@/components/Spinner";
import { fbq } from "@/app/lib/fbq";

const Item = () => {

    return <div className="flex flex-col justify-start items-start relative">
        <p className="text-base font-bold text-left text-black">
            {selectedProduct.value?.name} {selectedProduct.value?.frame_width}x{selectedProduct.value?.frame_height} cm
        </p>
        <p className="opacity-60 text-[13px] text-left text-black">
            Black frame, Matt paper
        </p>
    </div>
}


const Counter = () => {
    // TODO: make the counter affect quantity (signal?)
    const setCount = (n: number) => productQuantity.value = constrain(n);
    const constrain = (num: number) => Math.max(num, 1) || 1;
    return (
        <div className="flex h-9 flex-row gap-2">
            <img className="h-full cursor-pointer" src="/checkout/minus.svg" alt="" onClick={() => setCount(productQuantity.value - 1)} />

            <input type="number" min="0" value={productQuantity.value} onChange={(e) => setCount(parseInt(e.target.value))} className="pictosso-input appearance-none w-6 h-full rounded-[10px] p-0 m-0 flex items-center justify-center font-medium text-center min-w-16 text-black" />

            <img className="h-full cursor-pointer" src="/checkout/plus.svg" alt="" onClick={() => setCount(productQuantity.value + 1)} />
        </div>
    )
}

const getProductPrice = () => (selectedProduct.value?.price && selectedProduct.value?.price[currency.value] || 0) * productQuantity.value

const Price = () => {
    return (
        <p className="text-base font-bold text-right text-black">{currenciesSymbols[currency.value]}{getProductPrice()} {currency.value.toUpperCase()}</p>
    )
}

const Product = () => {
    return (
        <>
            <div className="items-center hidden md:flex">
                <Item />
                <div className="ml-auto flex gap-8 items-center">
                    <Counter />
                    <Price />
                </div>
            </div>
            <div className="items-center flex-col md:hidden justify-between">
                <div className="flex gap-8 items-center">
                    <Item />
                </div>
                <div className="flex justify-between items-center mt-4">
                    <Counter />

                    <Price />
                </div>
            </div>
        </>

    )
}

const Shipping = (props: { options: ShipmentMethod[] }) => {

    const { options } = props

    const handleOptionChange = (id: string) => {
        shippingMethodUid.value = id;
    };

    const FreeWorldwideShipping = () => <img src="/checkout/freeWorldwideShipping.svg" alt="" />

    return (
        <div className="w-full">
            <p className="text-base font-bold text-left text-black">Shipping</p>



            <div className="flex flex-wrap flex-col mt-2">
                {options.map(option => (
                    <label onClick={() => handleOptionChange(option.shipmentMethodUid)} key={option.shipmentMethodUid} className="cursor-pointer inline-flex gap-4 items-center my-2" style={option.shipmentMethodUid != shippingMethodUid.value ? { opacity: 0.4 } : {}}>
                        <div className="w-6 h-6 relative">
                            <div className="w-6 h-6 rounded-xl bg-black/[0.01] border border-black/[0.07] flex items-center justify-center">
                                {option.shipmentMethodUid == shippingMethodUid.value && <div className={`w-2.5 h-2.5 bg-black rounded-[5px] ${option.shipmentMethodUid == shippingMethodUid.value ? 'bg-black' : ''}`} />}
                            </div>
                        </div>

                        <p className="text-[13px] font-medium text-left text-black">{option.name}</p>
                        <p className="text-[13px] font-medium text-right text-black ml-auto">{getShipmentMethodPrice(option) == 0 ? <FreeWorldwideShipping /> : `${currenciesSymbols[currency.value]}${option.price}`}</p>
                    </label>
                ))}
            </div>
        </div>
    )
}

export const getShippingMethods = async (input: TGetShippingMethodInput) => {
    const response = await fetch(`/api/gelato/shipping`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
    });
    const data = await response.json() as ShipmentMethod[] | null;
    return data;
}

export const getPrice = async (input: TGetPrice) => {
    const response = await fetch(`/api/stripe/price`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
    });
    const data = await response.json() as any | null;
    return data;
}

const OrderSummary = () => {
    const [shippingMethods, setShippingMethods] = useState<ShipmentMethod[] | null>(null);
    const [_couponCode, _setCouponCode] = useState<string>("");
    const [priceLoading, setPriceLoading] = useState(false);


    const recalculatePrice = async () => {
        if (!shippingMethodUid.value) return;
        price.value = null;
        setPriceLoading(true);

        const productUid = selectedProductDetail?.value?.uid;
        if (!productUid) return alert("Please select a product");
        const data: TGetPrice = {
            shipmentMethodUid: shippingMethodUid.value,
            couponCode: couponCode.value,
            firstName: shippingFirstname.value,
            lastName: shippingLastname.value,
            addressLine1: shippingAddressLine1.value,
            addressLine2: shippingAddressLine2.value,
            state: shippingStateProvince.value,
            city: shippingCity.value,
            postCode: shippingZipCode.value,
            country: shippingCountry.value?.code || "",
            email: shippingEmail.value,
            phone: shippingPhone.value,
            currency: currency.value,
            products: [{
                productUid: productUid,
                // TODO: change public path
                publicPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzer1224eU1XGr7RmDwkLsAxbIhcciX-tVPaB7Jniqkg&s",
                quantity: productQuantity.value,
            }]
        };

        price.value = await getPrice(data);
        setPriceLoading(false);
        console.log("PRICE", price.value)
    }
    useEffect(() => {
        setShippingMethods(null);
        setPriceLoading(true);
        (async () => {

            const productUid = selectedProductDetail?.value?.uid;
            if (!productUid) return alert("Please select a product");
            const data: TGetShippingMethodInput = {
                firstName: shippingFirstname.value,
                lastName: shippingLastname.value,
                addressLine1: shippingAddressLine1.value,
                addressLine2: shippingAddressLine2.value,
                state: shippingStateProvince.value,
                city: shippingCity.value,
                postCode: shippingZipCode.value,
                country: shippingCountry.value?.code || "",
                email: shippingEmail.value,
                phone: shippingPhone.value,
                currency: currency.value,
                products: [{
                    productUid: productUid,
                    // TODO: change public path
                    publicPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzer1224eU1XGr7RmDwkLsAxbIhcciX-tVPaB7Jniqkg&s",
                    quantity: productQuantity.value,
                }]
            };

            const methods = await getShippingMethods(data);
            setShippingMethods(methods);
            if (methods && methods.length > 0 && methods.find(x => x.shipmentMethodUid == shippingMethodUid.value) == null)
                shippingMethodUid.value = methods[0].shipmentMethodUid;
            recalculatePrice();
        })();
    }, [productQuantity.value, currency.value])

    useEffect(() => {
        (async () => {
            recalculatePrice();
        })();
    }, [shippingMethodUid.value, couponCode.value])

    return (
        <div className="flex flex-col ">
            <div className="p-8">

                <Back onClick={() => { activeStep.value = Steps.Checkout3ShippingInformation }} />
                <p className="text-[32px] mt-3 font-bold text-left text-black">Checkout</p>
                <StepTitle />
            </div>



            <div className="flex flex-col gap-4 w-full p-8 pt-0">

                <p className="text-[32px] font-bold text-left text-black">A beautiful story</p>

                <Product />
                <div className="flex border-y border-black/[0.08] py-4">
                    {shippingMethods ?
                        <Shipping options={shippingMethods} />
                        :
                        <div className="w-full flex flex-row items-center justify-center gap-2">
                            <Spinner className="" size={'1.5rem'} />
                            <p className="text-sm text-left text-black">Loading shipping methods</p>
                        </div>
                    }
                </div>
            </div>

            {/* COUPON CODE */}
            <div className="flex flex-col gap-4 w-full p-8 pt-0">
                <p className="text-base font-bold text-left text-black">Discount code</p>
                <div className="flex relative pictosso-input w-full p-1">
                    <input type="text" value={_couponCode} onChange={(e) => { _setCouponCode(e.target.value); }} className="w-full border-none outline-none bg-transparent font-bold px-4 py-2" />
                    <button
                        onClick={async () => { couponCode.value = _couponCode; await recalculatePrice() }}
                        disabled={_couponCode.length <= 0}
                        className="px-4 py-2 disabled:opacity-50 border-none h-full rounded-[1rem] bg-white flex items-center justify-center"
                        style={{ boxShadow: "0px 1px 1px 0 rgba(0,0,0,0.1), 0px 1px 2px 0 rgba(0,0,0,0.15)" }}
                    >
                        <p className="text-sm font-semibold text-left text-black">Apply</p>
                    </button>
                </div>
            </div>

            {/* PAYMENT RECAP */}
            <div className="flex flex-col gap-4 w-full p-8 pt-0 relative">
                {(!price.value || priceLoading == true) && <div className="absolute h-[calc(100%+1rem)] bg-opacity-50 z-[2] backdrop-blur w-full left-0 top-0 flex flex-row items-center justify-center gap-2">
                    <Spinner className="" size={'1.5rem'} />
                    <p className="text-sm text-left text-black">Calculating price</p>
                </div>}
                <table className="min-w-full">
                    <tbody>
                        <tr>
                            <td className="py-2 font-semibold text-[#5f5a64]">Subtotal <span className="text-[#8e8896]">Excluding taxes</span></td>
                            <td className="py-2 text-right text-black font-medium">{currenciesSymbols[currency.value]}{price.value?.products || 0}</td>
                        </tr>
                        <tr>
                            <td className="py-2 font-semibold text-[#5f5a64]">Shipping Cost</td>
                            <td className="py-2 text-right text-black font-medium">{currenciesSymbols[currency.value]}{price.value?.shipping || 0}</td>
                        </tr>
                        {price.value?.discount ? <tr>
                            <td className="py-2 font-semibold text-[#5f5a64]">Discount</td>
                            <td className="py-2 text-right text-black font-bold">{currenciesSymbols[currency.value]}{price.value?.discount || 0}</td>
                        </tr> : ""}
                        <tr>
                            <td className="py-2 pb-4 font-semibold text-[#5f5a64]">Tax</td>
                            <td className="py-2 pb-4 text-right text-black font-medium">{currenciesSymbols[currency.value]}{price.value?.taxes || 0}</td>
                        </tr>
                        <tr className="border-t">
                            <td className="py-2 pt-4 font-semibold text-[#5f5a64]"><p className="text-base font-bold text-left text-black">Total to pay</p></td>
                            <td className="py-2 pt-4 text-right text-black font-medium">
                                <div className="flex flex-col">
                                    <p className="text-xl font-bold text-right text-black">{currenciesSymbols[currency.value]}{price.value?.total || 0}</p>
                                    <p className="opacity-40 text-[11px] font-medium text-right text-black">Including taxes</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="sticky bottom-0 px-12 py-4 flex z-[3]  flex-col gap-6 backdrop-blur w-full">
                <PurpleButton disabled={!shippingMethodUid.value} className="flex items-center self-center w-full"
                    onClick={() => {
                        handleButtonClick("project_checkout_4-continue-payment-info");
                        fbq('track', 'InitiateCheckout');
                        if (price.value?.total !== undefined && price.value.total <= 0) {
                            fbq('track', 'Purchase', {value: 0.00, currency: currency.value});
                        }
                        activeStep.value = Steps.Checkout5PaymentInformation
                    }}                >
                    <p className="w-full">{(price.value?.total || 1) <= 0 ? "Order now" : "Continue to Payment information"}</p>
                </PurpleButton>
            </div>

        </div >
    )
}
export default OrderSummary;