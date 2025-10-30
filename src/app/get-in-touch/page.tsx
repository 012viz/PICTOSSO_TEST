"use client"
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { icons } from "@/icons";
import { IIcon } from "@/types";
import { useState } from "@preact-signals/safe-react/react";


const OurIcons = () => {


    return (
        <div className="w-full h-full bg-[url('/background.svg')] bg-cover">
            <PageHeader />

            <div className="px-4 md:px-8 lg:px-[10%] flex justify-center">
                <div className="flex gap-4 py-8 flex-col w-full max-w-[960px]">
                    <h1 className="text-4xl md:text-5xl lg:text-[74px] font-bold text-center text-white mt-8 md:mt-12 lg:mt-16">
                        Get in touch
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl font-semibold text-center text-[#b4add9]">
                        We love to hear from our community. Whether you have a question about your Pictosso, need
                        assistance, or want to share your story with us, reach out, and let's start the conversation.
                    </p>
                </div>
            </div>

            <div className="w-full h-full relative mt-12 md:mt-16 lg:mt-24 flex flex-col items-center">
                <div className="w-full pb-16 md:pb-24 lg:pb-32 border-t-0 md:border-t-2 md:border-[#3a316c]">
                    <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12">

                        <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full relative">
                            <div className="px-[10%] md:px-0 md:border-t-0 border-t-[#3a316c] border-t-2 w-full md:w-1/3 flex flex-col items-center justify-center relative">
                                <img className="absolute pointer-events-none h-48 md:h-60 lg:h-96 -top-[3.3rem] md:-top-[4rem] lg:-top-[6.6rem]" src="/pages/get-in-touch/support-queries.svg" alt="" />
                                <p className="text-2xl md:text-3xl lg:text-[35px] font-bold text-center text-white mt-24 md:mt-32 lg:mt-56">Support Queries</p>
                                <p className="text-base md:text-lg lg:text-[1.5rem] font-semibold text-center mt-4">
                                    <span className="text-base md:text-lg lg:text-[1.4rem] font-semibold text-center text-[#b4add9]">
                                        For any support-related questions or if you need help with your Pictosso, please email us at:{" "}
                                    </span>
                                    <span className="text-base md:text-lg lg:text-[1.4rem] font-semibold text-center text-[#ffc999]">
                                        support@pictosso.com
                                    </span>
                                </p>
                            </div>
                            <div className="px-[10%] md:px-0 md:border-t-0 border-t-[#3a316c] border-t-2 w-full md:w-1/3 flex flex-col items-center justify-center relative">
                                <img className="absolute pointer-events-none h-48 md:h-60 lg:h-96 -top-[3.3rem] md:-top-[4rem] lg:-top-[6.6rem]" src="/pages/get-in-touch/press-inquiries.svg" alt="" />
                                <p className="text-2xl md:text-3xl lg:text-[35px] font-bold text-center text-white mt-24 md:mt-32 lg:mt-56">Press Inquiries</p>
                                <p className="text-base md:text-lg lg:text-[1.5rem] font-semibold text-center mt-4">
                                    <span className="text-base md:text-lg lg:text-[1.4rem] font-semibold text-center text-[#b4add9]">For press information, interviews, or media resources, please contact our media team at: {" "}</span>
                                    <span className="text-base md:text-lg lg:text-[1.4rem] font-semibold text-center text-[#FF99F5]">
                                        press@pictosso.com
                                    </span>
                                </p>

                            </div>
                            <div className="px-[10%] md:px-0 md:border-t-0 border-t-[#3a316c] border-t-2 w-full md:w-1/3 flex flex-col items-center justify-center relative">
                                <img className="absolute pointer-events-none h-48 md:h-60 lg:h-96 -top-[3.3rem] md:-top-[4rem] lg:-top-[6.6rem]" src="/pages/get-in-touch/custom-requests.svg" alt="" />
                                <p className="text-2xl md:text-3xl lg:text-[35px] font-bold text-center text-white mt-24 md:mt-32 lg:mt-56">Custom Requests</p>
                                <p className="text-base md:text-lg lg:text-[1.5rem] font-semibold text-center mt-4">
                                    <span className="text-base md:text-lg lg:text-[1.4rem] font-semibold text-center text-[#b4add9]">
                                        Have a special request or interested in a bespoke
                                        Pictosso? Send your details to {" "}
                                    </span>
                                    <span className="text-base md:text-lg lg:text-[1.4rem] font-semibold text-center text-[#99D4FF]">
                                        custom@pictosso.com
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-full bg-[url('/pages/get-in-touch/bg.svg')] bg-cover relative mt-12 md:mt-16 lg:mt-24 flex flex-col items-center">
                <img src="/pages/how-to-read/light.svg" className="max-w-full lg:max-w-[960px] w-full absolute translate -translate-y-1/4 pointer-events-none" alt="" />
                <div className="w-full pb-16 md:pb-24 lg:pb-32 border-t-4 border-b-4 border-[#3b326d]">
                    <div className="px-[10%] md:px-0 w-full max-w-[960px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 mt-6 md:mt-8 lg:mt-12">

                        <div className="flex flex-wrap gap-4 items-center justify-center">
                            <div className="flex gap-4 py-8 flex-col w-full max-w-[960px] ">

                                <p className="tracking-[0.25rem]  md:tracking-[0.5rem] text-center text-lg md:text-xl font-black uppercase text-[#d2b2ff] mt-8 md:mt-12 lg:mt-16">
                                    Thank you for reaching out to us
                                </p>
                                <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative">
                                    <p className="flex-grow w-full mt-4 md:mt-6 lg:mt-8 text-xl md:text-3xl lg:text-[38px] font-bold text-center text-white">
                                        We're excited to help you create or understand your very own piece of art that tells your story.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>

    )
}
export default OurIcons;        