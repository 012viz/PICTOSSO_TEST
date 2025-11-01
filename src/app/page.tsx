"use client"

import React, { useLayoutEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { device } from "./media-queries";
import Footer from "@/components/Footer";
import Drawer from "@/components/Drawer";
import Link from "next/link";
import Neon from "./home/Neon";
import { handleButtonClick } from "@/utils";
import dynamic from "next/dynamic";

const AIPictossoChat = dynamic(() => import("./ai-pictosso/AIPictossoChat"), { ssr: false });


const Line = (props: { first?: boolean, emoji: string, date: string, title: string, }) => {
    return (
        <div className="flex relative items-center mt-4 ml-2">
            <img className="h-8 md:h-[1.6vw]" src="/pages/home/orange-neon.svg" alt="" />
            <svg
                height={2}
                viewBox="0 0 115 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[6vw] min-w-[6vw] md:w-[3.2vw] md:min-w-[3.2vw] opacity-50 -ml-2"
                preserveAspectRatio="none"
            >
                <g opacity="0.25">
                    <path d="M115 1H0" stroke="white" strokeWidth={2} style={{ mixBlendMode: "soft-light" }} />
                </g>
            </svg>
            <img className="ml-2 h-[6vw] md:h-[3.2vw] translate-x-[10%] aspect-square" src={props.emoji} alt="" />
            <p className="ml-4 md:ml-8 min-w-[27vw] md:min-w-[10.8vw] text-[3.8vw] md:text-[1.6vw] font-bold text-left text-[#d2b2ff]">
                {props.date}
            </p>
            <p className="text-[3.8vw] md:text-[1.6vw] font-bold text-left text-[#64607c]">—</p>
            <p className="ml-4 md:ml-8 text-[3.8vw] md:text-[1.6vw] font-bold text-left text-white">
                {props.title}
            </p>

        </div>
    )
}

const FirstLine = (props: { emoji: string, title: string, subTitle: React.ReactNode, }) => {
    return (
        <div className="flex flex-col md:flex-row items-center md:items-start relative md:mt-8 ml-0 md:ml-2 mb-4">
            <span className="hidden md:absolute border-l-2 top-[4.5rem] left-[0.4vw] h-[4.5rem] border-[#37354a]"></span>

            <img className="md:ml-2 h-16 md:h-[3.2vw] md:-translate-x-[50%] aspect-square" src={props.emoji} alt="" />
            <div className="flex">
                <div className="flex flex-col">
                    <p className="md:ml-8 text-center md:text-left text-[38px] md:text-[2.3vw] leading-tight md:leading-normal font-bold text-white">
                        {props.title}
                    </p>
                    <p className="my-8 md:my-0 md:ml-8 text-[16px] md:text-[0.8vw] font-semibold text-center md:text-left text-[#b4add9]">
                        {props.subTitle}
                    </p>
                </div>
            </div>

        </div>
    )
}

// TODO: make font size in vw.

const HomePage = (): JSX.Element => {
    const [showAIChat, setShowAIChat] = useState(false);

    return (
        <div className="flex flex-col">
            {/* AI Chatbot Modal */}
            {showAIChat && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative">
                        <button
                            onClick={() => setShowAIChat(false)}
                            className="absolute top-4 right-4 z-10 bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="overflow-y-auto max-h-[90vh]">
                            <AIPictossoChat onGenerated={() => setShowAIChat(false)} />
                        </div>
                    </div>
                </div>
            )}

            {/* <div className="fixed z-[2] top-0 left-0 w-full h-full overflow-hidden">
                <Neon width={window.innerWidth} height={window.innerHeight} />
            </div> */}

            {/* <div id="test" className="absolute z-[1] top-0 left-0 w-full h-full"></div> */}
            <div className="fixed md:hidden p-8 pr-0 pb-0 z-30">
                <Drawer navHeight="0vh" buttonStyle={{ scale: 2 }} />
            </div>
            <div className="p-[5vw] md:p-0 md:py-[5vw] md:pl-[5vw] flex flex-col-reverse md:flex-row min-h-[100vh] bg-pictosso-radial bg-cover bg-no-repeat w-full h-[100%] overflow-hidden">

                <div className="w-full md:w-3/5 flex align-start z-[2] h-100 flex-col">


                    <div className="hidden md:flex flex-row gap-16 h-fit mb-[4vh]">
                        <div className="flex align-start">
                            <Drawer navHeight="0vh" buttonStyle={{ scale: 2 }} />
                        </div>
                        <img className="h-16 md:h-[3.2vw]" src="/pictosso_art_company.svg" alt="" />
                    </div>

                    <div className="flex flex-col justify-between h-full">
                        <FirstLine emoji="/pages/our-icons/heart.svg" title="A BEAUTIFUL CHAPTER" subTitle={<span>Transform your life's journey on a timeless canvas masterpiece, <br className="hidden md:block" /> where icons and precise timelines meld into a narrative only you can fully decipher.</span>} />
                        <div className="flex flex-col">
                            <Line emoji="/pages/home/emoji-1.svg" date={`May 2012`} title="Our first meeting" />
                            <Line emoji="/pages/home/emoji-2.svg" date={`January 2014`} title="We fall in love" />
                            <Line emoji="/pages/home/emoji-3.svg" date={`March 2016`} title="Our memorable trip" />
                            <Line emoji="/pages/home/emoji-4.svg" date={`July 2018`} title="You said yes" />
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 mt-32 mb-8 md:-ml-4 md:self-start self-center">
                            <Link onClick={() => handleButtonClick("home_get-now")} href="/project" className="flex p-0 w-[16rem] md:w-[15vw] relative aspect-[3.5] cursor-pointer">
                                <img src="/get_now.svg" className="w-full scale-[1.5] absolute top-0 left-0 -translate-y-[23%]" alt="" />
                            </Link>
                            <button 
                                onClick={() => setShowAIChat(true)}
                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
                            >
                                <span className="text-2xl">🤖</span>
                                <span>Générer avec l'IA</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full pr-0 md:pr-[5vw] md:w-2/5 flex items-center mt-8  justify-center">
                    <img src="/pages/home/background_home_croped.png" className="w-[125%] z-[2]" alt="" />
                </div>
            </div>
            <Footer hideActionCall={true} />
        </div>
    )
}

export default HomePage;
