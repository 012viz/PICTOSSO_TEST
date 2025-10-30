"use client"

import { activeStep, currency, products, selectedProduct, selectedProductDetail } from "@/signals";
import { Back, StepTitle } from ".";
import { Currencies, currenciesSymbols, Steps, TProduct } from "@/types";
import { useState } from "react";
import PurpleButton from "@/components/PurpleButton";
import { Popover } from '@mui/material';
import { CurrencyPicker, DownArrow } from "@/components/ProjectHeader";
import { getIconCount } from "../ProjectPreview";
import { handleButtonClick } from "@/utils";

const frameColors = {
    "White": { bg: "#ffffff", text: "#000000" },
    "Black": { bg: "#000000", text: "#ffffff" },
}

export const ProductSizePicker = () => {
    return <div className="flex flex-col items-center justify-center w-full relative">
        <div className="cursor-pointer flex justify-between w-full p-2 md:gap-4 gap-0 rounded-[20px] bg-black/[0.01] border border-black/[0.07] overflow-auto">
            {
                products.value.map(product => {
                    const active = selectedProduct.value?.name == product?.name;
                    return <div
                        className={`w-full flex-1 p-4 gap-0 md:flex-row flex-col-reverse md:gap-8 flex items-start md:items-center justify-center ${active ? 'rounded-2xl bg-white' : 'opacity-50'}`}
                        onClick={() => {
                            selectedProduct.value = product
                            const prevColor = selectedProductDetail.value?.color;
                            selectedProductDetail.value = product.details.find(d => d.color == prevColor) || product.details[0]

                        }}
                        key={product.name}
                        style={{ boxShadow: active ? "0px 1px 1px 0 rgba(0,0,0,0.1), 0px 1px 2px 0 rgba(0,0,0,0.15)" : 'none' }}>
                        <div className="flex flex-col">
                            <p className="text-sm text-left font-semibold text-black">{product.name}</p>
                            <p className="text-sm text-left whitespace-nowrap text-black">{product.frame_width}x{product.frame_height}cm</p>
                            <p className="text-sm text-left text-black opacity-60">{product.frame_width_inches}x{product.frame_height_inches}”</p>
                        </div>
                        <p className="text-sm font-medium text-right text-black">{currenciesSymbols[currency.value]}{product.price[currency.value]}</p>
                    </div>
                })
            }
        </div>
    </div>

}

export const ProductDetailPicker = () => {
    return selectedProduct.value && <div className="flex flex-col items-center justify-center relative">
        <div className="cursor-pointer min-w-[20rem] flex justify-between p-2 gap-4 rounded-[20px] bg-black/[0.01] border border-black/[0.07]">
            {
                selectedProduct.value.details.map(detail => {
                    const active = selectedProductDetail.value?.uid == detail?.uid;
                    return <div
                        className={`flex-1 justify-between p-3 flex items-center ${active ? 'rounded-2xl bg-white' : 'opacity-50'}`}
                        onClick={() => selectedProductDetail.value = detail}
                        key={detail.uid}
                        style={{
                            background: active ? frameColors[detail.color as keyof typeof frameColors].bg : 'none',
                            color: active ? frameColors[detail.color as keyof typeof frameColors].text : 'black',
                            boxShadow: active ? "0px 1px 1px 0 rgba(0,0,0,0.1), 0px 1px 2px 0 rgba(0,0,0,0.15)" : 'none'
                        }}>
                        <p className="text-sm font-semibold text-left"> {detail.color}</p>
                    </div>
                })
            }
        </div>
    </div>

}


const Product = () => {

    console.log("PRODUCT", currency.value)

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const iconCount = getIconCount()

    let sizeRecoText = ``;
    if (iconCount <= 75) {
        sizeRecoText = `Your Pictosso features ${iconCount} icons. For a beautifully balanced artwork please choose any of the available sizes.`
    }
    else if (iconCount <= 2500) {
        sizeRecoText = `Your Pictosso features ${iconCount} icons. For a beautifully balanced artwork please choose any of the available sizes.`
    } else if (iconCount > 2500 && iconCount <= 4500) {
        sizeRecoText = `Your Pictosso features ${iconCount} icons. For a beautifully balanced artwork we recommend opting for at least a Medium size.`
    } else if (iconCount > 4500) {
        sizeRecoText = `Your Pictosso features ${iconCount} icons. For a beautifully balanced artwork we recommend opting for a Large size.`
    }


    return (
        <div className="flex flex-col min-h-full">
            <div className="flex flex-row items-center">
                <div className="p-8">
                    <Back onClick={() => { activeStep.value = Steps.Checkout1DesignReview }} />
                    <p className="text-[32px] mt-3 font-bold text-left text-black">Checkout</p>
                    <StepTitle />
                </div>
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
                <button aria-describedby={id} onClick={handleClick} className="ml-auto flex mr-8 h-full justify-end items-center relative gap-2">
                    <div className="cursor-pointer min-w-[4rem] flex justify-between p-4 items-center  gap-4 rounded-[20px] bg-black/[0.01] border border-black/[0.07]">
                        <div className="flex gap-4">
                            {currency.value == Currencies.eur && <img src="/pages/home/europe.svg" alt="EUR" className="h-6 rounded-[0.3rem]" />}
                            {currency.value == Currencies.usd && <img src="/pages/home/usa.svg" alt="USD" className="h-6 rounded-[0.3rem]" />}
                            {currency.value == Currencies.gbp && <img src="/pages/home/uk.svg" alt="USD" className="h-6 rounded-[0.3rem]" />}
                            <p className="font-bold">{currency.value.toUpperCase()}</p>
                        </div>
                        <DownArrow color="#eaeaea" />
                    </div>
                </button>
            </div>
            <div className="flex flex-col gap-8 w-full p-8 pt-0">

                {selectedProduct.value && <div className="flex flex-col gap-4 self-start items-start justify-center mt-auto">
                    <p className="text-base font-bold self-start text-left text-black">Frame color</p>
                    <p className="text-[#626264] text-[13px] m-0">Your Pictosso arrives in a beautifully crafted, ready-to-hang wooden frame made from durable pine. Printed on luxurious, silky semi-glossy paper and protected by shatterproof plexiglass, your artwork is ready to shine on your wall the moment it arrives.</p>
                    <ProductDetailPicker />
                </div>}

                <div className="flex flex-col gap-4 self-start items-start justify-center w-full">
                    <p className="text-base font-bold self-start text-left text-black mb-2">Poster size</p>
                    <ProductSizePicker />
                </div>

                {sizeRecoText && <div className="flex flex-col justify-start items-start relative gap-2">
                    <p className="bg-gradient-purple text-transparent bg-clip-text text-[13px] text-left font-[500]">
                        {sizeRecoText}
                        {/* {selectedProduct.value && getIconRecommandationText(iconCount, selectedProduct.value)} */}
                    </p>
                </div>}
                {/* <div className="flex flex-col justify-start items-start relative gap-2">
                    <p className="text-base font-bold text-left text-black">Materials</p>
                    <p className=" text-[13px] text-left">
                        <span className=" text-[13px] text-left text-black/60">
                            {selectedProductDetail.value?.color} oak frame made from solid untreated oak wood. Our oak frame is equipped with a
                            lightweight and shatterproof acrylic glass.
                        </span>
                        <br />
                        <br />
                        <span className=" text-[13px] text-left text-black/60">
                            All of our posters are printed on 200g/m2 uncoated premium paper. It has a matte surface with
                            no glare, giving it a premium feel. Our paper is also age resistant.
                        </span>
                        <br />
                        <span className=" text-[13px] text-left text-black">
                            Learn more about our frames and paper
                        </span>
                    </p>
                </div> */}


            </div>

            <div className="sticky bottom-0 px-12 py-4 flex  flex-col gap-6 backdrop-blur w-full mt-auto">

                <div className="relative">
                    <div className="flex flex-row">
                        <p className="text-base font-bold text-left text-black">Subtotal</p>

                        <div className="flex flex-col ml-auto">
                            <p className="text-xl font-bold text-right text-black">{currenciesSymbols[currency.value]}{selectedProduct?.value?.price && selectedProduct?.value?.price[currency.value]}</p>
                            <p className="opacity-40 text-[11px] font-medium text-right text-black">Excluding taxes</p>
                        </div>

                    </div>
                </div>
                <PurpleButton disabled={!selectedProduct.value || !selectedProductDetail.value} className="flex items-center self-center w-full" onClick={() => { handleButtonClick("project_checkout_2-continue-to-shipping-info"); activeStep.value = Steps.Checkout3ShippingInformation }}>
                    <p className="w-full">Continue to Shipping <span className="hidden md:inline-block">information</span></p>
                </PurpleButton>
            </div>

        </div >
    )
}

export default Product;