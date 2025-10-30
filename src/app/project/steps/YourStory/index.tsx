"use client"

import * as React from "react";
import DateField from "./DateField";
import DetailLevel from "./DetailLevel";
import TotalIcons from "./TotalIcons";
import { SvgRenderer } from "@/components/SvgRenderer";
import { activeStep, endDate, mainIcon, selectedPeriodType, startDate } from "@/signals";
import IconPicker from "../../IconPicker";
import { PeriodType, Steps } from "@/types";
import ARModelViewer from "@/components/ARModelViewer";
import PurpleButton from "@/components/PurpleButton";
import { handleButtonClick } from "@/utils";

const MainIcon = (props: { onClick: () => void }) => {
    return (
        <div onClick={props.onClick} className="flex items-center justify-center w-full cursor-pointer">
            <div className="w-[100px] h-[100px] flex items-center justify-center">
                <div className="w-[100px] h-[100px] rounded-2xl border border-black/[0.08] flex items-center justify-center">

                    <div className="w-14 h-14 flex items-center justify-center">
                        <div
                            className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center"
                            style={{ boxShadow: "0px 1px 1px 0 rgba(0,0,0,0.1), 0px 1px 2px 0 rgba(0,0,0,0.15)" }}
                        >
                            <SvgRenderer icon={mainIcon.value} fillColor={mainIcon.value.color} width={30} height={30} />
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}


const YourStory = () => {

    const [pickerOpen, setPickerOpen] = React.useState(false);

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col gap-2 px-8 md:px-12">
                <p className="text-center text-xl font-bold text-black">
                    Select your main icon
                </p>
                <IconPicker
                    open={pickerOpen}
                    onClose={() => {
                        setPickerOpen(false);
                        // activeStep.value = Steps.YourStory;
                    }}
                    onIconPicked={(icon) => {
                        console.log("MAIN ICONNN", icon)
                        mainIcon.value = icon;
                        // setPickerOpen(false);
                        // activeStep.value = Steps.YourStory;
                    }}
                />
                <MainIcon onClick={() => { setPickerOpen(true) }} />
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <DateField onDateChange={(newDate: Date) => {
                        let date = newDate;
                        if (selectedPeriodType.value === PeriodType.MONTH) {
                            date = new Date(date.getFullYear(), date.getMonth(), 1, 12);
                        } else if (selectedPeriodType.value === PeriodType.YEAR) {
                            date = new Date(date.getFullYear(), 0, 1, 12);
                        } else {
                            date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
                        }


                        startDate.value = newDate.getTime()

                    }} date={new Date(startDate.value)} text="Start Date" />
                    <DateField onDateChange={(newDate: Date) => {
                        let date = newDate;
                        if (selectedPeriodType.value === PeriodType.MONTH) {
                            date = new Date(date.getFullYear(), date.getMonth(), 1, 12);
                        } else if (selectedPeriodType.value === PeriodType.YEAR) {
                            date = new Date(date.getFullYear(), 0, 1, 12);
                        } else {
                            date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
                        }


                        endDate.value = newDate.getTime()

                    }} date={new Date(endDate.value)} text="End Date" />
                </div>
                <DetailLevel />
                <TotalIcons />
            </div>
            <div className="py-8 flex items-center justify-center mt-auto">
                <PurpleButton className="flex " onClick={() => {handleButtonClick("project_continue-to-life-events"); activeStep.value = Steps.LifeEvents;}}>
                    <p>Continue to Life events</p>
                </PurpleButton>
            </div>

        </div>

    )
}

export default YourStory;