"use client"

import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Button, ButtonGroup } from "@mui/material";
import { Textfit } from 'react-textfit';
import * as React from "react";
import styled from "styled-components";
import { useSignals } from "@preact/signals-react/runtime";
import PurpleButton from "@/components/PurpleButton";
import { activeStep, titles } from "@/signals";
import { Steps } from "@/types";
import { CustomButton, CustomButtonGroup } from "@/components/Buttons";
import { useEffect, useRef, useState } from 'react';
import TitleEditor from './TitleEditor';
import { handleButtonClick } from '@/utils';
import { fbq } from '@/app/lib/fbq';


const StyledTextareaAutosize = styled(TextareaAutosize)`
   resize: none;

`
const Hide = () => <svg width="100%" height="100%" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 0.5C7.8873 0.5 0.5 7.8873 0.5 17V29C0.5 38.1127 7.8873 45.5 17 45.5H29C38.1127 45.5 45.5 38.1127 45.5 29V17C45.5 7.8873 38.1127 0.5 29 0.5H17Z" stroke="black" strokeOpacity="0.08" />
    <g opacity="0.4" clip-path="url(#clip0_176_15469)">
        <path d="M15.5 23C15.5 23 18.5 17.5 23 17.5C27.5 17.5 30.5 23 30.5 23C30.5 23 27.5 28.5 23 28.5C18.5 28.5 15.5 23 15.5 23Z" stroke="black" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 23C20 21.343 21.343 20 23 20" stroke="black" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 23C26 24.657 24.657 26 23 26" stroke="black" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 30L30 16" stroke="black" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
        <clipPath id="clip0_176_15469">
            <rect width="16" height="16" fill="white" transform="translate(15 15)" />
        </clipPath>
    </defs>
</svg>

const Show = () => <svg width="100%" height="100%" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_i_290_7744)">
        <path d="M1 17C1 8.16344 8.16344 1 17 1H29C37.8366 1 45 8.16344 45 17V29C45 37.8366 37.8366 45 29 45H17C8.16344 45 1 37.8366 1 29V17Z" fill="#000000" fillOpacity="0.01" />
    </g>
    <path d="M17 0.5C7.8873 0.5 0.5 7.8873 0.5 17V29C0.5 38.1127 7.8873 45.5 17 45.5H29C38.1127 45.5 45.5 38.1127 45.5 29V17C45.5 7.8873 38.1127 0.5 29 0.5H17Z" stroke="#000000" strokeOpacity="0.07" />
    <g opacity="0.6">
        <path d="M15.5 23C15.5 23 18.5 17.5 23 17.5C27.5 17.5 30.5 23 30.5 23C30.5 23 27.5 28.5 23 28.5C18.5 28.5 15.5 23 15.5 23Z" stroke="#000000" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 25.5C24.3807 25.5 25.5 24.3807 25.5 23C25.5 21.6193 24.3807 20.5 23 20.5C21.6193 20.5 20.5 21.6193 20.5 23C20.5 24.3807 21.6193 25.5 23 25.5Z" stroke="#000000" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
        <filter id="filter0_i_290_7744" x="0" y="0" width="46" height="46" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset />
            <feGaussianBlur stdDeviation="6" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0" />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_290_7744" />
        </filter>
    </defs>
</svg>



{/* TITLE SWITCH */ }

interface TitleSwitchProps {
    showTitle: boolean;
    onToggle: () => void;
    tooltip: string;
}

const TitleSwitch: React.FC<TitleSwitchProps> = ({ showTitle, onToggle, tooltip }) => {

    return (
        <div className="flex justify-center items-center px-5 relative">
            <div className={`h-px absolute left-8 bg-black opacity-15 w-[calc(50%-5rem)] px-4 box-border`} />
            <div data-tooltip-id="tooltip" data-tooltip-content={tooltip} className="cursor-pointer w-12 h-12 z-10" onClick={onToggle}>
                {showTitle ? <Show /> : <Hide />}
            </div>
            <div className={`h-px absolute right-8 bg-black opacity-15 w-[calc(50%-5rem)] px-4 box-border`} />
        </div>
    );

};

const opacity = (selected: boolean) => selected ? "1" : "0.2"



const TitleLayout: React.FC = () => {
    // useSignals();

    return (
        <div className="flex flex-col pb-2 full-w h-full">
            {/* <div className="flex flex-col pb-2 full-w min-h-[calc(100%)]"> */}
            <p className="text-center text-xl font-bold text-black mb-4 mt-2">Set your optional title</p>

            <div className="flex flex-col">

                <TitleSwitch tooltip={titles.value.titleEnabled ? 'disable title' : 'enable title'} showTitle={titles.value.titleEnabled} onToggle={() => titles.value = { ...titles.value, titleEnabled: !titles.value.titleEnabled }} />

                {/* TITLE EDITOR */}
                <TitleEditor
                    onTextChange={(text) => {
                        titles.value = { ...titles.value, title: text.toUpperCase() };
                    }}
                    type="title"
                    totalCharLimit={titles.value.size == "small" ? 51 : 24}
                    placeholder='TITLE'
                    enabled={titles.value.titleEnabled} />

                <div className="flex gap-3 justify-center self-center px-5 mt-6 text-center text-black whitespace-nowrap mb-8">
                    <CustomButtonGroup className="flex rounded-2xl border border-black/[0.08]">

                        <CustomButton data-tooltip-id="tooltip" data-tooltip-content="text large" className="!min-w-[0] w-1/2 md:!min-w-[64px]" onClick={() => titles.value = { ...titles.value, size: 'xl' }}>
                            <svg
                                opacity={opacity(titles.value.size == 'xl')}
                                width="42" height="40" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.1445 28H7.58203L13.3398 12H16.1289L21.8867 28H19.3242L14.8008 14.9062H14.6758L10.1445 28ZM10.5742 21.7344H18.8867V23.7656H10.5742V21.7344ZM27.502 28.2656C26.7415 28.2656 26.054 28.125 25.4395 27.8437C24.8249 27.5573 24.3379 27.1432 23.9785 26.6016C23.6243 26.0599 23.4473 25.3958 23.4473 24.6094C23.4473 23.9323 23.5775 23.375 23.8379 22.9375C24.0983 22.5 24.4499 22.1536 24.8926 21.8984C25.3353 21.6432 25.8301 21.4505 26.377 21.3203C26.9238 21.1901 27.4811 21.0911 28.0488 21.0234C28.7676 20.9401 29.3509 20.8724 29.7988 20.8203C30.2467 20.763 30.5723 20.6719 30.7754 20.5469C30.9785 20.4219 31.0801 20.2187 31.0801 19.9375V19.8828C31.0801 19.2005 30.8874 18.6719 30.502 18.2969C30.1217 17.9219 29.554 17.7344 28.7988 17.7344C28.0124 17.7344 27.3926 17.9089 26.9395 18.2578C26.4915 18.6016 26.1816 18.9844 26.0098 19.4062L23.8145 18.9062C24.0749 18.1771 24.4551 17.5885 24.9551 17.1406C25.4603 16.6875 26.041 16.3594 26.6973 16.1562C27.3535 15.9479 28.0436 15.8438 28.7676 15.8438C29.2467 15.8438 29.7546 15.901 30.291 16.0156C30.8327 16.125 31.3379 16.3281 31.8066 16.625C32.2806 16.9219 32.6686 17.3464 32.9707 17.8984C33.2728 18.4453 33.4238 19.1563 33.4238 20.0313V28H31.1426V26.3594H31.0488C30.8978 26.6615 30.6712 26.9583 30.3691 27.25C30.0671 27.5417 29.679 27.7839 29.2051 27.9766C28.7311 28.1693 28.1634 28.2656 27.502 28.2656ZM28.0098 26.3906C28.6556 26.3906 29.2077 26.263 29.666 26.0078C30.1296 25.7526 30.4811 25.4193 30.7207 25.0078C30.9655 24.5911 31.0879 24.1458 31.0879 23.6719V22.125C31.0046 22.2083 30.8431 22.2865 30.6035 22.3594C30.3691 22.4271 30.1009 22.487 29.7988 22.5391C29.4967 22.5859 29.2025 22.6302 28.916 22.6719C28.6296 22.7083 28.39 22.7396 28.1973 22.7656C27.7441 22.8229 27.3301 22.9193 26.9551 23.0547C26.5853 23.1901 26.2884 23.3854 26.0645 23.6406C25.8457 23.8906 25.7363 24.224 25.7363 24.6406C25.7363 25.2187 25.9499 25.6562 26.377 25.9531C26.804 26.2448 27.3483 26.3906 28.0098 26.3906Z" fill="black" />
                            </svg>
                        </CustomButton>
                        <CustomButton data-tooltip-id="tooltip" data-tooltip-content="text small" className="!min-w-[0] w-1/2 md:!min-w-[64px]" onClick={() => titles.value = { ...titles.value, size: 'small' }}>
                            <svg
                                opacity={opacity(titles.value.size == 'small')}
                                width="19" height="13" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.9723 12H0.495028L4.76776 0.363636H6.2223L10.495 12H9.01776L5.54048 2.20455H5.44957L1.9723 12ZM2.51776 7.45455H8.4723V8.70455H2.51776V7.45455ZM14.6939 12.2045C14.1409 12.2045 13.639 12.1004 13.1882 11.892C12.7375 11.6799 12.3795 11.375 12.1143 10.9773C11.8492 10.5758 11.7166 10.0909 11.7166 9.52273C11.7166 9.02273 11.8151 8.61742 12.0121 8.30682C12.209 7.99242 12.4723 7.74621 12.8018 7.56818C13.1314 7.39015 13.495 7.25758 13.8928 7.17045C14.2943 7.07955 14.6977 7.00758 15.103 6.95455C15.6333 6.88636 16.0632 6.83523 16.3928 6.80114C16.7261 6.76326 16.9685 6.70076 17.12 6.61364C17.2753 6.52652 17.353 6.375 17.353 6.15909V6.11364C17.353 5.55303 17.1996 5.11742 16.8928 4.80682C16.5897 4.49621 16.1295 4.34091 15.5121 4.34091C14.8719 4.34091 14.37 4.48106 14.0064 4.76136C13.6428 5.04167 13.3871 5.34091 13.2393 5.65909L11.9666 5.20455C12.1939 4.67424 12.4969 4.26136 12.8757 3.96591C13.2583 3.66667 13.675 3.45833 14.1257 3.34091C14.5803 3.2197 15.0272 3.15909 15.4666 3.15909C15.7469 3.15909 16.0689 3.19318 16.4325 3.26136C16.8 3.32576 17.1541 3.46023 17.495 3.66477C17.8397 3.86932 18.1257 4.17803 18.353 4.59091C18.5803 5.00379 18.6939 5.55682 18.6939 6.25V12H17.353V10.8182H17.2848C17.1939 11.0076 17.0424 11.2102 16.8303 11.4261C16.6181 11.642 16.3359 11.8258 15.9837 11.9773C15.6314 12.1288 15.2015 12.2045 14.6939 12.2045ZM14.8984 11C15.4287 11 15.8757 10.8958 16.2393 10.6875C16.6068 10.4792 16.8833 10.2102 17.0689 9.88068C17.2583 9.55114 17.353 9.20455 17.353 8.84091V7.61364C17.2962 7.68182 17.1712 7.74432 16.978 7.80114C16.7886 7.85417 16.5689 7.90151 16.3189 7.94318C16.0727 7.98106 15.8321 8.01515 15.5973 8.04545C15.3662 8.07197 15.1787 8.0947 15.0348 8.11364C14.6863 8.15909 14.3606 8.23295 14.0575 8.33523C13.7583 8.43371 13.5159 8.58333 13.3303 8.78409C13.1484 8.98106 13.0575 9.25 13.0575 9.59091C13.0575 10.0568 13.2299 10.4091 13.5746 10.6477C13.9231 10.8826 14.3643 11 14.8984 11Z" fill="black" />
                            </svg>
                        </CustomButton>
                    </CustomButtonGroup>

                    {/* HORIZONTAL ALIGNMENT */}
                    <CustomButtonGroup className="flex rounded-2xl border border-black/[0.08]">
                        {/* TEXT LEFT */}
                        <CustomButton data-tooltip-id="tooltip" data-tooltip-content="text left" className="!min-w-[0] md:min-w-[!64px]" onClick={() => titles.value = { ...titles.value, position: { ...titles.value.position, x: 'left' } }}>
                            <svg
                                opacity={opacity(titles.value.position.x == 'left')}
                                width="24" height="13" viewBox="0 0 24 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <rect width="24" height="1" fill="black" />
                                    <rect y="6" width="13" height="1" fill="black" />
                                    <rect y="12" width="17" height="1" fill="black" />
                                </g>
                            </svg>
                        </CustomButton>
                        {/* TEXT CENTER */}
                        <CustomButton data-tooltip-id="tooltip" data-tooltip-content="text center" className="!min-w-[0] md:min-w-[!64px]" onClick={() => titles.value = { ...titles.value, position: { ...titles.value.position, x: 'center' } }}>
                            <svg
                                opacity={opacity(titles.value.position.x == 'center')}
                                width="24" height="13" viewBox="0 0 24 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="1" fill="black" />
                                <rect x="5.5" y="6" width="13" height="1" fill="black" />
                                <rect x="3.5" y="12" width="17" height="1" fill="black" />
                            </svg>
                        </CustomButton>
                        {/* TEXT RIGHT */}
                        <CustomButton data-tooltip-id="tooltip" data-tooltip-content="text right" className="!min-w-[0] md:min-w-[!64px]" onClick={() => titles.value = { ...titles.value, position: { ...titles.value.position, x: 'right' } }}>
                            <svg
                                opacity={opacity(titles.value.position.x == 'right')}
                                width="24" height="13" viewBox="0 0 24 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <rect width="24" height="1" fill="black" />
                                    <rect x="11" y="6" width="13" height="1" fill="black" />
                                    <rect x="7" y="12" width="17" height="1" fill="black" />
                                </g>
                            </svg>

                        </CustomButton>
                    </CustomButtonGroup>

                    {/* VERTICAL ALIGNMENT */}
                    <CustomButtonGroup className="flex rounded-2xl border border-black/[0.08]">
                        {/* ALIGN BOTTOM */}
                        <CustomButton data-tooltip-id="tooltip" data-tooltip-content="align text bottom" className="!min-w-[0] md:min-w-[!64px]" onClick={() => titles.value = { ...titles.value, position: { ...titles.value.position, y: 'bottom' } }}>
                            <svg
                                opacity={opacity(titles.value.position.y == 'bottom')}
                                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5 3V17" stroke="black" stroke-miterlimit="10" />
                                <path d="M7.5 12L12.5 17L17.5 12" stroke="black" stroke-miterlimit="10" strokeLinecap="square" />
                                <path d="M4.5 21H20.5" stroke="black" stroke-miterlimit="10" strokeLinecap="square" />
                            </svg>
                        </CustomButton>
                        {/* ALIGN TOP */}
                        <CustomButton data-tooltip-id="tooltip" data-tooltip-content="align text top" className="!min-w-[0] md:min-w-[!64px]" onClick={() => titles.value = { ...titles.value, position: { ...titles.value.position, y: 'top' } }}>
                            <svg
                                opacity={opacity(titles.value.position.y == 'top')}
                                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5 21.5V7.5" stroke="black" stroke-miterlimit="10" />
                                <path d="M7.5 12.5L12.5 7.5L17.5 12.5" stroke="black" stroke-miterlimit="10" strokeLinecap="square" />
                                <path d="M4.5 3.5H20.5" stroke="black" stroke-miterlimit="10" strokeLinecap="square" />
                            </svg>

                        </CustomButton>
                    </CustomButtonGroup>
                </div>
            </div>

            {/* SUBTITLE SWITCH */}
            <TitleSwitch tooltip={titles.value.subtitleEnabled ? 'disable subtitle' : 'enable subtitle'} showTitle={titles.value.subtitleEnabled && titles.value.titleEnabled} onToggle={() => titles.value = { ...titles.value, subtitleEnabled: !titles.value.subtitleEnabled }} />

            {/* SUBTITLE EDITOR */}
            {/* <StyledTextareaAutosize
                placeholder="YOUR SUBTITLE"
                style={{
                    fontFamily: 'Roboto',
                }}
                className={`${(!titles.value.subtitleEnabled || !titles.value.titleEnabled) && 'opacity-20'} w-full px-5 bg-transparent self-center mt-8 text-3xl font-extrabold text-black text-center outline-none border-none`}
                value={titles.value.subtitle} onChange={(e) => titles.value = { ...titles.value, subtitle: e.target.value }}>
            </StyledTextareaAutosize> */}
            <TitleEditor onTextChange={(text) => {
                titles.value = { ...titles.value, subtitle: text.toUpperCase() };
            }}
                type="subtitle"
                scaleOffset={-0.05}
                baseStyle={{ fontSize: '2rem', lineHeight: '4rem' }}
                maxLineNumber={2}
                totalCharLimit={108}
                placeholder='SUBTITLE'
                enabled={titles.value.subtitleEnabled} />


            <div className="py-8 flex items-center justify-center mt-auto">
                <PurpleButton className="flex" onClick={() => {
                    handleButtonClick("project_continue-to-order");
                    activeStep.value = Steps.Checkout1DesignReview
                }}>
                    <p>Continue to Order</p>
                </PurpleButton>
            </div>

        </div>
    )

};

export default TitleLayout;