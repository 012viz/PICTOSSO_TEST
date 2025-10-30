'use client'
import React, { Suspense, useState } from 'react';
import Drawer from './Drawer';
import { activeStep, currency, mobileMenuOpen, products } from '@/signals';
import { Popover, useMediaQuery } from '@mui/material';
import { Currencies, currenciesSymbols, Currency, Steps } from '@/types';
import { device } from '@/app/media-queries';

export const CurrencyPicker = (props: { handleClose: Function }) => {
    return (
        <div className="flex flex-col items-center">

            <svg
                width={12}
                height={12}
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-grow-0 flex-shrink-0"
                preserveAspectRatio="xMidYMid meet"
            >
                <path d="M0 6L6 0L12 6L6 12L0 6Z" fill="#FEFEFF" />
            </svg>
            <div className="bg-white flex rounded-xl shadow-lg m-4 -mt-[6px] overflow-hidden">

                <div className="flex flex-col">
                    <button onClick={() => { currency.value = Currencies.eur; setTimeout(() => props.handleClose(), 100) }} style={{ background: currency.value == Currencies.eur ? "#f1e3ff" : "#fff" }} className="flex gap-16 items-center justify-between px-6 py-4 hover:bg-gray-200">
                        <p className="text-[13px] font-semibold text-center text-black">EUR</p>
                        <img src="/pages/home/europe.svg" alt="EUR" className="h-6 rounded-[0.3rem]" />
                    </button>
                    <button onClick={() => { currency.value = Currencies.usd; setTimeout(() => props.handleClose(), 100) }} style={{ background: currency.value == Currencies.usd ? "#f1e3ff" : "#fff" }} className="flex gap-16 items-center justify-between px-6 py-4 hover:bg-gray-200">
                        <p className="text-[13px] font-semibold text-center text-black">USD</p>
                        <img src="/pages/home/usa.svg" alt="USD" className="h-6 rounded-[0.3rem]" />
                    </button>
                    <button onClick={() => { currency.value = Currencies.gbp; setTimeout(() => props.handleClose(), 100) }} style={{ background: currency.value == Currencies.gbp ? "#f1e3ff" : "#fff" }} className="flex gap-16 items-center justify-between px-6 py-4 hover:bg-gray-200">
                        <p className="text-[13px] font-semibold text-center text-black">GBP</p>
                        <img src="/pages/home/uk.svg" alt="USD" className="h-6 rounded-[0.3rem]" />
                    </button>
                </div>
            </div>
        </div>
    )
}


export const findLowestPrice = (currency: Currency): number | null => {
    console.log("findLowestPrice", currency, products.value)
    if (products.value.length === 0) return null;

    let lowestProduct = products.value[0];
    let lowestPrice = lowestProduct.price[currency];

    for (const product of products.value) {
        if (product.price[currency] < lowestPrice) {
            lowestProduct = product;
            lowestPrice = product.price[currency];
        }
    }

    return lowestPrice;
}
export const DownArrow = (props: { color?: string }) => <svg
    width={10}
    height={7}
    viewBox="0 0 10 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-grow-0 flex-shrink-0"
    preserveAspectRatio="xMidYMid meet"
>
    <path d="M1 1L5 5L9 1" stroke={props?.color || "white"} strokeWidth={2} />
</svg>

const StartingAt = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const isMobile = useMediaQuery(device.xs);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (![Steps.Checkout1DesignReview, Steps.Checkout2Product, Steps.Checkout3ShippingInformation, Steps.Checkout4OrderSummary, Steps.Checkout5PaymentInformation].includes(activeStep.value)) {
            activeStep.value = Steps.Checkout1DesignReview;
            mobileMenuOpen.value = true;
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className="flex space-x-4 cursor-pointer h-16">
            <Popover
                id={id}
                className='!z-[99999999999999999999999] fixed -mt-[12px]'
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                PaperProps={{
                    style: {
                        backgroundColor: "transparent",
                        borderRadius: '0.75rem',
                        transform: 'translateX(-0.5rem)',
                        boxShadow: "none",
                        // border: "none",
                    },
                }}
            >
                <CurrencyPicker handleClose={handleClose} />
            </Popover>


            {![Steps.Checkout1DesignReview, Steps.Checkout2Product, Steps.Checkout3ShippingInformation, Steps.Checkout4OrderSummary, Steps.Checkout5PaymentInformation].includes(activeStep.value) &&
                <button aria-describedby={id} onClick={handleClick} className="flex mr-8 h-full justify-end items-center relative gap-2">
                    <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left">
                        <span className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-white/60">
                            Order
                        </span>
                        {/* <span className="ml-1 flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-white">
                        <Suspense fallback={0}>
                        {currenciesSymbols[currency.value]}{findLowestPrice(currency.value)}
                        </Suspense>
                        </span> */}
                    </p>
                    {/* <DownArrow /> */}
                </button>
            }
        </div>
    )
}
const ProjectHeader = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const isMobile = useMediaQuery(device.xs);
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (

        isMobile && mobileMenuOpen.value ? <></> : <div className='min-h-16 h-16 w-full'>

            <nav className="flex fixed top-0 z-[99999999] w-full items-center justify-between p-4 h-16" style={{ background: 'linear-gradient(90deg, #241E49, #514591)' }}>
                <Drawer navHeight='4rem' />

                <div className="mr-auto ml-4">
                    <a href="/" id=""><img src="/logo.svg" className="h-6" /></a>
                </div>
                <StartingAt />
            </nav>
        </div>

    );
};

export default ProjectHeader;
