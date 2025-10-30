"use client"

import { activeStep, bottomProjectPreviewOpen, frameTextureUri, selectedProduct, selectedProductDetail } from "@/signals"
import { checkoutSteps } from "../StepPicker";
import { Steps } from "@/types";
import DesignReview from "./DesignReview";

export const Back = (props: { onClick: () => void }) => {
    return <div onClick={props.onClick} className="flex justify-start items-center relative gap-2 cursor-pointer">
        <svg
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0 h-3"
            preserveAspectRatio="xMidYMid meet"
        >
            <path d="M5 1L1 5L5 9" stroke="#8000FF" />
        </svg>
        <p className="flex-grow-0 flex-shrink-0 text-[13px] font-[Inter] font-medium text-left text-[#8000ff]">Back</p>
    </div>
}

export const StepTitle = () => {
    return (
        <p className="text-[32px] font-bold text-left bg-gradient-purple text-transparent bg-clip-text">{activeStep.value}</p>
    )
}

import React, { useState } from 'react';
import Product from "./Product";
import ShippingInformation from "./ShippingInformation";
import OrderSummary from "./OrderSummary";
import PaymentInformation from "./PaymentInformation";
import CheckoutThanks from "./CheckoutThanks";
import { getPictoFrameSvgBlob } from "../RenderPictoFrame";
import { drawImageOnCanvas } from "@/components/ARModelViewer";

export const Checkbox: React.FC<{ checked: boolean, onChange: () => void }> = ({ checked, onChange }) => {
    return (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer flex-grow-0 flex-shrink-0 w-6 h-6 relative"
            preserveAspectRatio="none"
            onClick={onChange}
        >
            <circle cx={12} cy={12} r="11.4" stroke={checked ? "#8000FF" : "gray"} strokeWidth="1.2" />
            <path d="M7.19995 11.4L10.8 15L16.8 9" stroke={checked ? "#D500FF" : "gray"} strokeWidth="2.4" />
        </svg>
    );
}

const Checkout = () => {
    return (
        <div id="checkout" className="h-full flex-col bg-center bg-cover overflow-hidden relative" style={{ backgroundImage: "url('/yourStoryBg.svg')" }}>
            <svg
                onClick={async () => {
                    if (!selectedProduct.value || !selectedProductDetail.value) return;
                    const textureUri = await drawImageOnCanvas(getPictoFrameSvgBlob(), selectedProduct.value, selectedProductDetail.value)
                    frameTextureUri.value = textureUri;
                    bottomProjectPreviewOpen.value = true
                }}
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="md:hidden w-6 h-6 ml-auto absolute top-[calc(2rem-5px)] right-[1rem]"
                preserveAspectRatio="none"
            >
                <path
                    d="M3.5 11.9999C3.5 11.9999 6.9 5.7666 12 5.7666C17.1 5.7666 20.5 11.9999 20.5 11.9999C20.5 11.9999 17.1 18.2333 12 18.2333C6.9 18.2333 3.5 11.9999 3.5 11.9999Z"
                    stroke="black"
                    strokeWidth={2}
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <ellipse
                    cx="12.0001"
                    cy="11.9999"
                    rx="2.5"
                    ry="2.5"
                    stroke="black"
                    strokeWidth="1.76471"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path d="M1 6V3C1 1.89543 1.89543 1 3 1H6" stroke="black" strokeWidth={2} />
                <path d="M1 18V21C1 22.1046 1.89543 23 3 23H6" stroke="black" strokeWidth={2} />
                <path d="M23 6V3C23 1.89543 22.1046 1 21 1H18" stroke="black" strokeWidth={2} />
                <path d="M23 18V21C23 22.1046 22.1046 23 21 23H18" stroke="black" strokeWidth={2} />
            </svg>


            <div className="overflow-y-auto h-full w-full">

                {checkoutSteps.includes(activeStep.value) && (
                    <>
                        {activeStep.value == Steps.Checkout1DesignReview && <DesignReview />}
                        {activeStep.value == Steps.Checkout2Product && <Product />}
                        {activeStep.value == Steps.Checkout3ShippingInformation && <ShippingInformation />}
                        {activeStep.value == Steps.Checkout4OrderSummary && <OrderSummary />}
                        {activeStep.value == Steps.Checkout5PaymentInformation && <PaymentInformation />}
                        {activeStep.value == Steps.CheckoutThanks && <CheckoutThanks />}
                    </>
                )}

            </div>
        </div>
    )
}

export default Checkout;