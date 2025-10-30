"use client"
import { activeStep, autoCompletePlace, shippingAddress, shippingAddressLine2, shippingCity, shippingCountry, shippingEmail, shippingFirstname, shippingLastname, shippingPhone, shippingStateProvince, shippingZipCode } from "@/signals";
import { Back, StepTitle } from ".";
import { Steps } from "@/types";
import PurpleButton from "@/components/PurpleButton";
import CountryPicker from "./CountryPicker";
import AddressPicker from "./AddressPicker";
import { handleButtonClick } from "@/utils";


const ShippingInformation = () => {

    const isEmailValid = shippingEmail.value && !/\S+@\S+\.\S+/.test(shippingEmail.value)
    return (
        <div className="flex flex-col ">
            <div className="p-8">

                <Back onClick={() => { activeStep.value = Steps.Checkout2Product }} />
                <p className="text-[32px] mt-3 font-bold text-left text-black">Checkout</p>
                <StepTitle />
            </div>



            {/* contact */}
            <p className="p-8 text-base font-bold text-left text-black">Contact</p>
            {/* mail / phone */}
            <div className="flex flex-col gap-8 w-full p-8 pt-0">
                <div className="flex flex-col md:flex-row justify-start items-start gap-8 md:gap-3">
                    <div className="flex flex-col justify-start items-start  relative gap-1 w-full">
                        <div className="flex justify-start items-center relative gap-1">
                            <p className="text-[13px] font-medium text-left text-black/60">
                                Email
                            </p>
                        </div>
                        <input
                            type="email"
                            value={shippingEmail.value}
                            onChange={(e) => shippingEmail.value = e.target.value}
                            className="pictosso-input w-full"
                        />
                        {isEmailValid && (
                            <p className="bg-gradient-purple text-transparent bg-clip-text text-xs mt-1">Please enter a valid email address</p>
                        )}
                    </div>

                    <div className="flex flex-col justify-start items-start  relative gap-1 w-full">
                        <div className="flex justify-start items-center relative gap-1">
                            <p className="text-[13px] font-medium text-left text-black/60">
                                Phone number
                            </p>
                            <p className="text-[11px] font-medium text-left text-black/40">
                                Optional
                            </p>

                        </div>
                        <input type="text" value={shippingPhone.value} onChange={(e) => shippingPhone.value = e.target.value} className="pictosso-input w-full" />
                    </div>
                </div>
            </div>


            {/* delivery */}
            <p className="p-8 text-base font-bold text-left text-black">Delivery</p>

            {/* Country / Region */}
            <div className="flex flex-col gap-8 w-full p-8 pt-0">
                <div className="flex justify-start items-start flex-col gap-3">
                    <div className="flex justify-start items-center relative gap-1">
                        <p className="text-[13px] font-medium text-left text-black/60">
                            Country/Region
                        </p>
                    </div>
                    <div className="flex flex-col justify-start items-start  relative gap-1 w-full">
                        <CountryPicker />
                    </div>
                </div>
            </div>


            {/* firstname / lastname */}
            <div className="flex flex-col gap-8 w-full p-8 pt-0">
                <div className="flex flex-col md:flex-row justify-start items-start gap-8 md:gap-3">
                    <div className="flex flex-col justify-start items-start  relative gap-1 w-full">
                        <div className="flex justify-start items-center relative gap-1">
                            <p className="text-[13px] font-medium text-left text-black/60">
                                First name
                            </p>
                        </div>
                        <input value={shippingFirstname.value} onChange={(e) => shippingFirstname.value = e.target.value} type="text" className="pictosso-input w-full" />
                    </div>

                    <div className="flex flex-col justify-start items-start  relative gap-1 w-full">
                        <div className="flex justify-start items-center relative gap-1">
                            <p className="text-[13px] font-medium text-left text-black/60">
                                Last name
                            </p>
                        </div>
                        <input value={shippingLastname.value} onChange={(e) => shippingLastname.value = e.target.value} type="text" className="pictosso-input w-full" />
                    </div>
                </div>
            </div>


            {/* address */}
            <div className="flex flex-col gap-8 w-full p-8 pt-0">
                <div className="flex justify-start items-start flex-col gap-3">
                    <div className="flex justify-start items-center relative gap-1">
                        <p className="text-[13px] font-medium text-left text-black/60">
                            Address
                        </p>
                    </div>
                    <div className="flex flex-col justify-start items-start  relative gap-1 w-full">
                        <AddressPicker />
                    </div>
                    <div className="flex flex-col justify-start items-start  relative gap-1 w-full">
                        <div className="flex justify-start items-center relative gap-1">
                            <p className="text-[13px] font-medium text-left text-black/60">
                                Address Line 2
                            </p>
                        </div>
                        <input value={shippingAddressLine2.value} onChange={(e) => shippingAddressLine2.value = e.target.value} type="text" className="pictosso-input w-full" />
                    </div>

                </div>
            </div>



            {/* city / state / zip */}
            <div className="flex flex-col gap-8 w-full p-8 pt-0">
                <div className="flex flex-col md:flex-row justify-start items-start gap-8 md:gap-3">
                    <div className="flex flex-col justify-start items-start  relative gap-1 w-full">
                        <div className="flex justify-start items-center relative gap-1">
                            <p className="text-[13px] font-medium text-left text-black/60">
                                City
                            </p>
                        </div>
                        <input value={shippingCity.value} onChange={(e) => shippingCity.value = e.target.value} type="text" className="pictosso-input w-full" />
                    </div>

                    <div className="flex flex-col justify-start items-start  relative gap-1 w-full">
                        <div className="flex justify-start items-center relative gap-1">
                            <p className="text-[13px] font-medium text-left text-black/60">
                                State/Province
                            </p>
                            <p className="text-[11px] font-medium text-left text-black/40">
                                Optional
                            </p>
                        </div>
                        <input value={shippingStateProvince.value} onChange={(e) => shippingStateProvince.value = e.target.value} type="text" className="pictosso-input w-full" />
                    </div>

                    <div className="flex flex-col justify-start items-start  relative gap-1 w-full">
                        <div className="flex justify-start items-center relative gap-1">
                            <p className="text-[13px] font-medium text-left text-black/60">
                                ZIP Code
                            </p>
                        </div>
                        <input value={shippingZipCode.value} onChange={(e) => shippingZipCode.value = e.target.value} type="text" className="pictosso-input w-full" />
                    </div>
                </div>
            </div>


            <div className="sticky bottom-0 px-12 py-4 flex  flex-col gap-6 backdrop-blur w-full">
                <PurpleButton disabled={![!isEmailValid, autoCompletePlace.value, shippingFirstname.value, shippingLastname.value, shippingAddress.value, shippingEmail.value, shippingCountry.value?.code, shippingCity.value, shippingZipCode.value].every(field => field)} className="flex items-center self-center w-full" onClick={() => {handleButtonClick("project_checkout_3-continue-to-order-summary"); activeStep.value = Steps.Checkout4OrderSummary}}>
                    <p className="w-full">Continue to Order summary</p>
                </PurpleButton>
            </div>

        </div >
    )
}
export default ShippingInformation;