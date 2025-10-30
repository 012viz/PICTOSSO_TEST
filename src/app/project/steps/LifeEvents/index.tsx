"use client"

import { v4 as uuid } from 'uuid';
import DateField from "../YourStory/DateField";
import { useSignals } from "@preact/signals-react/runtime";
import { ILifeEvent, IPeriodType, PeriodType, Steps } from "@/types";
import { activeStep, computedProject, endDate, highlightedLifeEvent, lifeEvents, mainIcon, selectedPeriodType, startDate } from "@/signals";
import PurpleButton from "@/components/PurpleButton";
import { SvgRenderer } from "@/components/SvgRenderer";
import { FC, useLayoutEffect, useState } from "react";
import { CustomButton, CustomButtonGroup } from "@/components/Buttons";
import { useControls, useTransformContext, useTransformInit } from "react-zoom-pan-pinch";
import { zoomToElement } from "../../ProjectPreview";
import IconPicker, { iconPickerStep } from '../../IconPicker';
import { useEffect } from '@preact-signals/safe-react/react';
import { handleButtonClick } from '@/utils';

export const LifeEvent: React.FC<{ event: ILifeEvent, showActions: boolean }> = ({ event, showActions }) => {

    const [pickerOpen, setPickerOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useLayoutEffect(() => {
        setTimeout(() => {
            const matches = lifeEvents.value.filter(e => e.date === event.date && e.id !== event.id);
            const eventDate = new Date(event.date);
            const storyStartDate = new Date(startDate.value);
            const storyEndDate = new Date(endDate.value);
            const isOutOfRange = eventDate < storyStartDate || eventDate > storyEndDate;
            if (matches.length > 0) {
                return setErrorMessage("Another event with the same date exists.");
            }
            if (isOutOfRange) {
                return setErrorMessage("Event date is out of the story date range.");
            }
            return setErrorMessage("");
        }, 400);
    }, [event.date, event.id, pickerOpen, lifeEvents.value])


    return (
        <div className="flex items-center justify-center gap-3 mt-5 whitespace-nowrap">
            <IconPicker
                preSelectedIcon={event.icon}
                open={pickerOpen}
                onClose={() => {
                    setPickerOpen(false);
                    // activeStep.value = Steps.YourStory;
                }}
                onIconPicked={(icon) => {
                    lifeEvents.value = lifeEvents.value.map(le => le.id == event.id ? { ...event, icon: icon } : le)
                    // setPickerOpen(false);
                    // activeStep.value = Steps.YourStory;
                }}
            />

            <div onClick={() => {
                console.log("event.icon.path", event.icon.path, event.icon.path.includes("letters/"))
                if (event.icon.path.includes("letters/"))
                    iconPickerStep.value = Steps.LettersNumbers
                else if (event.icon.path.includes("pictosso/"))
                    iconPickerStep.value = Steps.Icons
                else
                    iconPickerStep.value = Steps.Emoji
                setPickerOpen(true);

            }} className="flex justify-center items-center min-w-14 w-14 h-14 text-3xl font-extrabold cursor-pointer text-black bg-white whitespace-nowrap rounded-3xl rounded-[20px] shadow">
                <SvgRenderer icon={event.icon} fillColor={event.icon.color} width={30} height={30} />
            </div>
            <div className="w-full relative">
                <DateField date={new Date(event.date)} text={false} onDateChange={(newDate: Date) => {
                    let date = newDate;
                    if (selectedPeriodType.value === PeriodType.MONTH) {
                        date = new Date(date.getFullYear(), date.getMonth(), 1, 12);
                    } else if (selectedPeriodType.value === PeriodType.YEAR) {
                        date = new Date(date.getFullYear(), 0, 1, 12);
                    } else {
                        date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
                    }

                    lifeEvents.value = lifeEvents.value.map(le => le.id == event.id ? { ...le, date: date.getTime() } : le);
                }} />
                {errorMessage && <p className="absolute text-xs ml-6 text-red-500 -bottom-4">{errorMessage}</p>}
            </div>

            <CustomButtonGroup className={`items-center divide-y-2 h-14 w-16 min-w-16 md:w-32 md:min-w-32 rounded-[20px] border justify-center border-black/[0.08] align-center ${showActions ? "flex" : "hidden"}`}>

                {/* LOCATE */}
                <CustomButton
                    className="h-14 !hidden md:!flex"
                    onClick={() => {
                        console.log("EVENT ID", event)
                        const element = document.getElementById(event.id);
                        highlightedLifeEvent.value = event
                        if (element && zoomToElement.value) {
                            zoomToElement.value(element);
                        }
                    }}
                    onMouseEnter={() => { highlightedLifeEvent.value = event }}
                    onMouseLeave={() => {
                        highlightedLifeEvent.value = null;
                        const element = document.getElementById("previewContainer");
                        if (element && zoomToElement.value) {
                            zoomToElement.value(element);
                        }
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.4">
                            <path d="M1.5 1.5L15.5 5.5L8.5 8.5L5.5 15.5L1.5 1.5Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                    </svg>
                </CustomButton>
                <div className="hidden md:block h-6 min-w-[1px] w-[1px] bg-black opacity-20"></div> {/* Vertical Divider */}

                {/* DELETE */}
                <CustomButton className="h-14" onClick={() => removeLifeEvent(event)}>
                    <svg opacity="0.4" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 5.5L3.365 14.149C3.40194 14.5191 3.57507 14.8623 3.85076 15.1119C4.12646 15.3615 4.48507 15.4999 4.857 15.5H11.143C11.5149 15.4999 11.8735 15.3615 12.1492 15.1119C12.4249 14.8623 12.5981 14.5191 12.635 14.149L13.5 5.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M0.5 3.5H15.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5.5 3.5V0.5H10.5V3.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                </CustomButton>
            </CustomButtonGroup>

        </div>

    );
};

const helpText = "Click to fill the description"

const removeLifeEvent = (event: ILifeEvent) => {
    lifeEvents.value = lifeEvents.value.filter(le => le.id != event.id)
}

const addLifeEvent = () => {
    const lastEvent = [...lifeEvents.value].sort((a, b) => a.date - b.date).pop()
    let lastDate = startDate.value;

    if (lastEvent) {
        const oneMonth = 31 * 24 * 60 * 60 * 1000; // 30 days
        lastDate = lastEvent.date + oneMonth;
    }

    const newLifeEvent: ILifeEvent = {
        id: uuid().toString(),
        icon: lastEvent?.icon || mainIcon.value,
        date: lastDate,
        description: helpText,
    }

    lifeEvents.value = [...lifeEvents.value, newLifeEvent];
}



const LifeEvents = () => {
    // useSignals();



    return (
        <div className="flex flex-col gap-0 px-8 md:px-12 h-[calc(100%)]">
            <p className="text-center text-xl font-bold text-black mb-8 mt-2">Add your Life events</p>

            <div className="flex items-center justify-center gap-3 mt-3 whitespace-nowrap ">
                <div className="flex justify-center items-center min-w-14 w-14"><p className="opacity-60 text-[13px] font-medium text-left text-black">Icon</p></div>
                <div className="w-full"><p className="pl-4 opacity-60 text-[13px] font-medium text-left text-black">Event date</p></div>
                <div className="w-32 min-w-32 flex justify-between">
                    <p className="opacity-60 text-[13px] font-medium text-left invisible md:visible text-black pl-2">Locate</p>
                    <p className="opacity-60 text-[13px] font-medium text-right text-black pr-4">Delete</p>
                </div>
            </div>

            {
                lifeEvents.value.map(le => <LifeEvent key={`${le.id}`} event={le} showActions={true} />)
            }

            <div onClick={addLifeEvent} className="w-full flex mt-8 items-center h-14 cursor-pointer">
                <svg className="w-14 h-14" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect opacity="0.2" x="1" y="1" width="56" height="56" rx="16" stroke="black" strokeDasharray="3 4" />
                    <rect x="23" y="28" width="12" height="2" fill="black" />
                    <rect x="28" y="35" width="12" height="2" transform="rotate(-90 28 35)" fill="black" />
                </svg>
                <p className="text-base font-bold text-left text-black ml-6">Add life event</p>
            </div>


            <div className="py-8 flex items-center justify-center mt-auto">
                <PurpleButton className="flex " onClick={() => { handleButtonClick("project_continue-title-and-layout"); activeStep.value = Steps.TitleLayout }}>
                    <p>Continue to Title & Layout</p>
                </PurpleButton>
            </div>

        </div>

    )
}

export default LifeEvents;