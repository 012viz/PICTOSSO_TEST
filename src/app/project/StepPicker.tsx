"use client"

import { activeStep } from "@/signals";
import { Steps } from "@/types";
import { signal } from "@preact/signals-react";
import { useMediaQuery } from "usehooks-ts";
import { device } from "../media-queries";

export const mainSteps = [Steps.YourStory, Steps.LifeEvents, Steps.TitleLayout]
export const checkoutSteps = [Steps.Checkout1DesignReview, Steps.Checkout2Product, Steps.Checkout3ShippingInformation, Steps.Checkout4OrderSummary, Steps.Checkout5PaymentInformation, Steps.CheckoutThanks]
export const iconSteps = [Steps.Icons, Steps.LettersNumbers, Steps.Emoji, Steps.CustomSvg];


const StepPicker = (props: { z?: number, steps: Steps[], activeStep: Steps, onStepClicked: (step: Steps) => void }) => {
    const isMobile = useMediaQuery(device.xs);

    const StepMap = {
        [Steps.YourStory]: "1. Your story",
        [Steps.LifeEvents]: "2. Life events",
        [Steps.TitleLayout]: "3. Title & Layout",
        [Steps.Checkout1DesignReview]: "1/5 Design review",
        [Steps.Checkout2Product]: "2/5 Product",
        [Steps.Checkout3ShippingInformation]: "3/5 Shipping information",
        [Steps.Checkout4OrderSummary]: "4/5 Order summary",
        [Steps.Checkout5PaymentInformation]: "5/5 Payment information",
        [Steps.CheckoutThanks]: "Checkout6Thanks",

        [Steps.Icons]: <div className="flex gap-2 items-center"><img src="/pages/project/heart.svg" className="h-[1.2rem]" alt="" /><p className="text-[0.9rem] font-semibold text-center text-white">Icons</p>    </div>,
        [Steps.LettersNumbers]: <div className="flex gap-2 items-center"><img src="/pages/project/T.svg" className="h-[1.2rem]" alt="" /><p className="text-[0.9rem] font-semibold text-center text-white">{isMobile ? "Letters" : "Letters & Numbers"}</p>    </div>,
        [Steps.Emoji]: <div className="flex gap-2 items-center"><p className="text-[1.2rem]">🙂</p><p className="text-[0.9rem] font-semibold text-center text-white">Emoji</p>    </div>,
        [Steps.CustomSvg]: <div className="flex gap-2 items-center"><img src="/pages/project/uploadsvg.svg" className="h-[1.2rem]" alt="" /><p className="text-[0.8rem] font-semibold text-center text-white">{isMobile ? "SVG" : "Upload My SVG"}</p>    </div>,
    }

    return (
        <>
            <div style={{ zIndex: props.z || 'unset', background: 'linear-gradient(90deg, #4B1AFF, #CC00FF 50%, #8000FF)' }} className="w-full flex items-center sticky top-0 justify-center h-16 bg-[#343355]">
                {props.steps.map((step, index) => {
                    const active = step == props.activeStep;
                    return (
                        <div
                            style={{ background: active ? `rgb(0 0 0 / 30%)` : 'none' }}
                            key={step}
                            onClick={() => props.onStepClicked(step)}
                            className={`cursor-pointer flex items-center relative justify-center h-16 text-white w-full text-center px-2`}>
                            {StepMap[step]}
                            {
                                active && <svg className="absolute bottom-[0] translate-y-full" width="26" height="9" viewBox="0 0 26 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.49991 0C-3.49994 0 29.5005 0 24.5005 0C19.5005 0 12.8574 9 12.8574 9C12.8574 9 6.49976 0 1.49991 0Z" fill={["#520cb2", "#890db7", "#6b0db7"][index]} />
                                </svg>
                            }

                        </div>
                    )
                    {/* {!active && <svg width="2" height="50%" viewBox="0 0 2 100%" fill="none" xmlns="http://www.w3.org/2000/svg"><rect opacity="0.08" x="1" width="1" height="100%" fill="white"></rect><rect opacity="0.3" width="1" height="100%" fill="black"></rect></svg>} */ }
                })}
            </div>
        </>
    )
}
export default StepPicker;