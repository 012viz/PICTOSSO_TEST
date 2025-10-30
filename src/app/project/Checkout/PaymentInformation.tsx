"use client"

import PurpleButton from "@/components/PurpleButton";
import Spinner from "@/components/Spinner";
import { activeStep, couponCode, currency, endDate, mainIcon, orderId, price, productQuantity, selectedPeriodType, selectedProduct, selectedProductDetail, shippingAddressLine1, shippingAddressLine2, shippingCity, shippingCountry, shippingEmail, shippingFirstname, shippingLastname, shippingMethodUid, shippingPhone, shippingStateProvince, shippingZipCode, startDate, titles } from "@/signals";
import { currenciesSymbols, Steps, TCreatePaymentPictoMeta, TGetPrice, TPaymentIntentResponse } from "@/types";
import { useEffect } from "@preact-signals/safe-react/react";
import { signal } from "@preact/signals-react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import { Back, StepTitle } from ".";
import { getIconCount } from "../ProjectPreview";
import { getPictoFrameSvgBlob } from "../RenderPictoFrame";
import { handleButtonClick } from "@/utils";
import { fbq } from "@/app/lib/fbq";



export const clientSecret = signal<string | null>(null)
export const stripePromise = signal<PromiseLike<Stripe | null> | Stripe | null>(null)

export const initiatePayment = async () => {
    const productUid = selectedProductDetail?.value?.uid;
    if (!productUid) return alert("Please select a product");

    fetch(`/api/stripe/config`).then(async (r) => {
        const { publishableKey } = await r.json();
        stripePromise.value = loadStripe(publishableKey);
    });

    const formData = new FormData();

    const svgFile = getPictoFrameSvgBlob();
    formData.append('svgFile', svgFile);
    const data: TGetPrice = {
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
        shipmentMethodUid: shippingMethodUid.value,
        currency: currency.value,
        couponCode: couponCode.value,
        products: [{
            productUid: productUid,
            publicPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzer1224eU1XGr7RmDwkLsAxbIhcciX-tVPaB7Jniqkg&s",
            quantity: productQuantity.value,
        }]
    };

    const metadata: TCreatePaymentPictoMeta = {
        currency: currency.value,
        startDate: startDate.value,
        endDate: endDate.value,
        iconNumber: getIconCount(),
        iconPath: encodeURIComponent(mainIcon.value.path),
        periodType: selectedPeriodType.value,
        title: titles.value?.titleEnabled ? (titles.value.title || "") : "",
        size: selectedProduct.value?.name || "",
        quantity: productQuantity.value
    }
    formData.append('body', JSON.stringify(data));
    formData.append('metadata', JSON.stringify(metadata));




    fetch(`/api/stripe/create-payment-intent`, {
        method: "POST",
        body: formData,
    }).then(async (result) => {
        var data = await result.json() as TPaymentIntentResponse;
        fbq('track', 'AddPaymentInfo');
        const { clientSecret: _clientSecret, orderId: _orderId, ..._price } = data;
        orderId.value = _orderId;
        price.value = _price;
        if (_clientSecret)
            clientSecret.value = _clientSecret;

        if (data.free == true) {
            console.log("FREEEEE")
            activeStep.value = Steps.CheckoutThanks;
            return;
        }
    });
}


const PaymentInformation = () => {
    useEffect(() => {
        console.log("initiatePayment");
        initiatePayment();
    }, [])

    return (

        <div className="flex flex-col h-full ">
            <div className="p-8">

                <Back onClick={() => { activeStep.value = Steps.Checkout4OrderSummary }} />
                <p className="text-[32px] mt-3 font-bold text-left text-black">Checkout</p>
                <StepTitle />
            </div>



            <div className="flex flex-col gap-8 w-full h-full p-8 pt-0">

                {clientSecret.value && stripePromise.value ? (
                    <Elements stripe={stripePromise.value} options={{
                        clientSecret: clientSecret.value, appearance: {
                            variables: {
                                colorBackground: '#f4f2f8',
                            },
                            rules: {
                                '.Input': {
                                    paddingInlineEnd: '151.2px',
                                    height: '3rem',
                                    borderRadius: '20px',
                                    borderWidth: '1px',
                                    borderColor: '#e3e2e7',
                                    // background: 'rgb(0 0 0 / 0.01) !important',
                                    paddingLeft: '1.25rem',
                                    paddingRight: '1.25rem',
                                    fontSize: '0.875rem',
                                    lineHeight: '1.25rem',
                                    fontWeight: '500',
                                    color: '#000000',
                                    outline: '2px solid transparent',
                                    outlineOffset: '2px'
                                }
                            }
                        }
                    }}>
                        <PaymentForm />
                    </Elements>
                ) :
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-full flex flex-row items-center justify-center gap-2">
                            <Spinner className="" size={'1.5rem'} />
                            <p className="text-sm text-left text-black">Loading payment page</p>
                        </div>

                    </div>
                }

            </div>

        </div >

    )
};

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setMessage("");
        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/validation?orderId=${orderId.value}`,
            },
            redirect: 'if_required'
        });

        if (error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message || "An error occurred during payment.");
            } else {
                setMessage("An unexpected error occurred.");
            }
            setIsProcessing(false);
        } else if (paymentIntent) {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    fbq('track', 'Purchase', {value: price.value?.total, currency: currency.value});
                    activeStep.value = Steps.CheckoutThanks;
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
            setIsProcessing(false);
        } else {
            // This point should only be reached if a 3D Secure challenge is required
            setMessage("Redirecting for additional authentication...");
            // The page will be redirected by Stripe.js
        }
    };

    return (
        <div className="flex w-full h-full">
            <form id="payment-form" className="w-full h-full flex flex-col" onSubmit={handleSubmit}>
                <div>
                    <PaymentElement className="w-full h-full" id="payment-element" />
                    {message && <div id="payment-message" className="mt-4 text-red-500">{message}</div>}
                </div>

                <div className="flex h-full">
                    <PurpleButton
                        type="submit"
                        className="mt-auto w-full flex items-center self-center"
                        disabled={isProcessing || !stripe || !elements}
                        onClick={() => handleButtonClick("project_checkout_5-confirm-and-pay")}
                        id="submit"
                    >
                        <p>
                            {isProcessing ? "Processing..." : `Confirm & pay ${price.value?.total}${currenciesSymbols[currency.value]}`}
                        </p>
                    </PurpleButton>
                </div>
            </form>
        </div>
    );
};
export default PaymentInformation;
