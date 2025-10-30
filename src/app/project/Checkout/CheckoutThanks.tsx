import { activeStep, lifeEvents, orderId } from "@/signals";
import { Back, Checkbox, StepTitle } from ".";
import { Steps } from "@/types";
import { useState } from "react";
import { SvgRenderer } from "@/components/SvgRenderer";
import { LifeEvent } from "../steps/LifeEvents";
import PurpleButton from "@/components/PurpleButton";
import Link from "next/link";

const CheckoutThanks = () => {

    return (
        <div className="flex flex-col ">
            <div className="flex flex-col gap-12 w-full p-8 items-center">

                <img src="/logo_black.svg" className="h-10" alt="" />

                <p className="text-[56px] md:text-[88px] font-bold text-center uppercase text-black max-w-96" style={{ lineHeight: 1.1 }}>
                    Thank you for your order!
                </p>
                <p className="opacity-60 text-base text-center text-black">
                    <span className="opacity-60 text-base text-center text-black">
                        Your order has been successfully placed.
                    </span>
                    <br />
                    <span className="opacity-60 text-base text-center text-black">
                        We will process your order and send you a confirmation email shortly.
                    </span>
                </p>
                <div className="rounded-[20px] w-fit self-center px-8 py-2  border border-black/[0.07]" >
                    <p className="opacity-40 text-[13px] font-medium text-center text-black">
                        Order number
                    </p>
                    <p className="text-[32px] font-bold text-center text-black">
                        {/* {`${orderId.value}`.split("-").pop()} */}
                        {orderId.value.toUpperCase()}
                    </p>
                </div>



                {/* <div className="sticky bottom-0 px-12 py-4 flex  flex-col gap-6 backdrop-blur w-full"> */}

                    <Link href="/">
                        <PurpleButton className="flex items-center self-center w-full">
                            <p className="w-full">Go to homepage</p>
                        </PurpleButton>
                    </Link>
                {/* </div> */}

            </div>
        </div>
    )
}
export default CheckoutThanks;