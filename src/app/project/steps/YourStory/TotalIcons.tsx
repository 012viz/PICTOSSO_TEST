"use client"

import { formatDate } from "@/utils";
import { activeStep, computedProject, endDate, selectedPeriodType, startDate } from "@/signals";
import PurpleButton from "@/components/PurpleButton";
import { PeriodType, Steps } from "@/types";
import { getIconCount } from "../../ProjectPreview";
import { MIN_PICTOS } from "../../RenderPictoFrame";




const TotalIcons = () => {

    const iconCount = getIconCount();
    const messageTooLong = false//iconCount > 2000;
    const messageTooShort = iconCount < MIN_PICTOS-2;


    return (
        <div className="w-full flex flex-col items-center justify-center gap-1">

            <div className="relative mt-4">
                <p className="left-[21px] top-0 text-5xl font-bold text-center uppercase text-black">
                    {iconCount} ICONS
                </p>
            </div>

            {messageTooLong && <div
                className="flex flex-col justify-start items-center relative space-y-[-8px]"
                style={{
                    filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.15)) drop-shadow(0px 1px 1px rgba(0,0,0,0.1))",
                }}
            >
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
                <div className="flex justify-center items-center relative overflow-hidden gap-2.5 p-3 rounded-2xl bg-white">
                    <p className="text-[13px] font-medium text-center">
                        <span className="text-[13px] font-medium text-center text-black/60">
                            Consider shortening the time period or choosing a less detailed level (like{" "}
                        </span>
                        <span className="text-[13px] font-medium text-center text-[#7f00ff]">
                            Monthly
                        </span>
                        <span className="text-[13px] font-medium text-center text-black/60">
                            {" "}
                            or{" "}
                        </span>
                        <span className="text-[13px] font-medium text-center text-[#7f00ff]">
                            Yearly
                        </span>
                        <span className="text-[13px] font-medium text-center text-black/60">
                            ) for a beautifully balanced artwork.
                        </span>
                    </p>
                </div>
            </div>}
            {messageTooShort && <div
                className="flex flex-col justify-start items-center relative space-y-[-8px]"
                style={{
                    filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.15)) drop-shadow(0px 1px 1px rgba(0,0,0,0.1))",
                }}
            >
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
                <div className="flex justify-center items-center relative overflow-hidden gap-2.5 p-3 rounded-2xl bg-white">
                    <p className="text-[13px] text-red-600 font-medium text-center">
                        <span className="text-[13px] font-medium text-center ">
                            You need at least {MIN_PICTOS-2} icons. Consider extending the time period or choosing a more detailed level (like{" "}
                        </span>
                        <span onClick={() => selectedPeriodType.value = PeriodType.DAY} className="cursor-pointer text-[13px] font-medium text-center text-[#7f00ff]">
                            Daily
                        </span>
                        <span className="text-[13px] font-medium text-center ">
                            ) for a more detailed artwork.
                        </span>
                    </p>
                </div>            </div>}
            {!messageTooLong && !messageTooShort &&
                <div className="flex flex-col justify-center items-center mx-auto max-w-[560px] p-4">
                    <p className="w-full text-[13px] text-center">
                        <span className="text-[13px] font-medium text-black/60">
                            Your Pictosso chapter features{" "}
                        </span>
                        <span className="font-semibold text-black">
                            {iconCount}
                        </span>
                        <span className="text-[13px] font-medium text-black/60">
                            {" "}
                            icons, which represent the number of {selectedPeriodType} between{" "}
                        </span>
                        <span className="font-semibold text-black">
                            {formatDate(new Date(startDate.value), selectedPeriodType.value)}
                        </span>
                        <span className="text-[13px] font-medium text-black/60">
                            {" "}
                            and{" "}
                        </span>
                        <span className="font-semibold text-black">
                            {formatDate(new Date(endDate.value), selectedPeriodType.value)}
                        </span>
                        <span className="text-[13px] font-medium text-black/60">
                            .
                        </span>
                    </p>
                </div>
            }
        </div>

    )
}
export default TotalIcons;