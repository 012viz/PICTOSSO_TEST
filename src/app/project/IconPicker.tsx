"use client"

import { signal } from "@preact/signals-react";
import StepPicke, { iconSteps } from "./StepPicker"
import { CloseIconPicker } from "./ProjectEditor";
import Icons from "./steps/Icons";
import LettersNumbers from "./steps/LettersNumbers";
import { activeStep, bottomProjectPreviewOpen, frameTextureUri, selectedProduct, selectedProductDetail } from "@/signals";
import StepPicker from "./StepPicker";
import { IIcon, Steps } from "@/types";
import IconPickerPortal from "./IconPickerPortal";
import Emoji from "./steps/Emoji";
import { getPictoFrameSvgBlob } from "./RenderPictoFrame";
import { drawImageOnCanvas } from "@/components/ARModelViewer";
import CustomSVG from "./steps/CustomSVG";


export const iconPickerStep = signal<Steps>(Steps.Icons);

const IconPicker = (props: { preSelectedIcon?: IIcon, open: boolean, onClose: () => void, onIconPicked: (icon: IIcon) => void }) => {
    return props.open ? (
        <IconPickerPortal>

            <div className={`flex flex-col h-full w-full bg-white absolute top-0`}>
                {/* Mobile close menu */}
                <div className="bg-white w-full h-12 min-h-12 relative z-[12] flex md:hidden">
                    <div className="flex items-center h-full px-4 gap-4 w-full">

                        <div className="flex items-center h-full gap-4 ">

                            <svg
                                onClick={() => props.onClose()}
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 relative"
                                preserveAspectRatio="none"
                            >
                                <path d="M8 6L2 12L8 18" stroke="black" strokeWidth={2} />
                                <path d="M2 12H17" stroke="black" strokeWidth={2} />
                            </svg>
                        </div>

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
                            className="w-6 h-6 relative ml-auto"
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


                    </div>
                </div>
                {/* <StepPicker steps={iconSteps} activeStep={activeStep.value} onStepClicked={(step) => { iconPickerStep.value = step }} /> */}
                <StepPicker z={13} steps={iconSteps} activeStep={iconPickerStep.value} onStepClicked={(step) => { iconPickerStep.value = step }} />
                <div className="flex flex-col h-full overflow-y-auto relative z-[12] bg-white">
                    {iconPickerStep.value == Steps.Icons && <Icons preSelectedIcon={props.preSelectedIcon} onIconPicked={props.onIconPicked} />}
                    {iconPickerStep.value == Steps.LettersNumbers && <LettersNumbers preSelectedIcon={props.preSelectedIcon} onIconPicked={props.onIconPicked} />}
                    {iconPickerStep.value == Steps.Emoji && <Emoji preSelectedIcon={props.preSelectedIcon} onIconPicked={props.onIconPicked} />}
                    {iconPickerStep.value == Steps.CustomSvg && <CustomSVG preSelectedIcon={props.preSelectedIcon} onIconPicked={props.onIconPicked} />}
                    <CloseIconPicker className="" onClick={() => { props.onClose() }} />
                </div>
            </div>
        </IconPickerPortal>
    ) : ""
}
export default IconPicker;