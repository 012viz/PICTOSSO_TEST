'use client'

import dynamic from 'next/dynamic';
import React, { useRef, useState } from "react";
import { DateField, DatePicker, DateView, LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { IPeriodType, PeriodType } from "@/types";
import { selectedPeriodType } from "@/signals";
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet'
// import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import 'react-spring-bottom-sheet/dist/style.css'
import styled from "styled-components";
import { useMediaQuery } from "usehooks-ts";
import { device } from "@/app/media-queries";


const getDatePickerViews = (periodType: IPeriodType) => {
    let views: readonly DateView[] = []
    if (periodType == PeriodType.DAY)
        views = ['year', 'month', 'day']
    else if (periodType == PeriodType.MONTH)
        views = ['year', 'month']
    else if (periodType == PeriodType.YEAR)
        views = ['year']

    return views;

}

const getDatePickerFormat = (periodType: IPeriodType): string => {
    if (periodType === PeriodType.DAY) {
        return 'YYYY/MM/DD';
    } else if (periodType === PeriodType.MONTH) {
        return 'MMMM YYYY'; // Format for "May 1998"
    } else if (periodType === PeriodType.YEAR) {
        return 'YYYY';
    }
    return 'YYYY/MM/DD'; // Default format
}




const Calendar = () => <img src="/yourStory/calendar.svg" style={{ opacity: 0.35 }} />;
const LeftArrowIcon = () => <img className='mr-4' src="/yourStory/leftArrow.svg" />;
const RightArrowIcon = () => <img src="/yourStory/rightArrow.svg" />;

const StyledMobileStaticDatePicker = styled(StaticDatePicker)`
  & .MuiDateCalendar-root {
    margin: 0;
    width: 100%;
  }
  & .MuiDayCalendar-root {
    width: 100%;
  }
  & .MuiDayCalendar-weekContainer {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  & .MuiDayCalendar-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  & .MuiPickersDay-root {
    flex: 1;
    display: flex;
    justify-content: center;
    height: 11vw;
    margin: 0vw 2vw;
  }

  .MuiDayCalendar-header > span {
    width: 100%;
  }
  .MuiMonthCalendar-root, .MuiYearCalendar-root {
    width: 100%;
  }
`;
const DatePickerComponent = (props: { date: Date, onDateChange: Function, text: string | boolean }) => {
    const sheetRef = useRef<BottomSheetRef>(null)
    const [open, setOpen] = useState(false)

    const isMobile = useMediaQuery(device.xs);


    return (
        <div className="relative w-full">
            {props.text && <p className="font-medium text-left mb-2">
                <span className="text-[13px] font-medium text-left text-black/60">{props.text} </span>
                {selectedPeriodType.value == PeriodType.DAY && <span className="text-[11px] font-medium text-left text-black/40">({getDatePickerFormat(selectedPeriodType.value)})</span>}
            </p>}

            {isMobile && <>
                <div className="w-full h-14 rounded-[20px] bg-black/[0.01] border border-black/[0.07] flex items-center justify-between px-2">
                    <button className='w-full' onClick={() => setOpen(true)}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateField
                                readOnly
                                className="pictosso-input h-auto w-full appearance-none bg-transparent disabled focus p-0 m-0"
                                value={dayjs(props.date)}
                                format={getDatePickerFormat(selectedPeriodType.value)}
                                InputProps={{
                                    fullWidth: true,
                                    disableUnderline: true,
                                    sx: {
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: 'none',
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            border: 'none',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            border: 'none',
                                        }
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </button>
                </div>

                <BottomSheet
                    ref={sheetRef}
                    onDismiss={() => setOpen(false)}
                    open={open}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StyledMobileStaticDatePicker
                            className="pictoCalendar w-full flex flex-col"
                            views={getDatePickerViews(selectedPeriodType.value)}
                            slots={{ rightArrowIcon: RightArrowIcon, leftArrowIcon: LeftArrowIcon }}
                            defaultValue={dayjs(props.date)}
                            // onChange={(e: any) => {
                            //     console.log("ON CHANGE")
                            //     const date = e.$d as Date;
                            //     props.onDateChange(date);
                            // }}
                            onAccept={(e: any) => {
                                const date = e.$d as Date;
                                props.onDateChange(date);
                                setOpen(false);
                            }} />
                    </LocalizationProvider>

                </BottomSheet>
            </>
            }

            {!isMobile &&
                <div className="w-full h-14 rounded-[20px] cursor-pointer bg-black/[0.01] border border-black/[0.07] flex items-center justify-between px-6">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            open={open}
                            onClose={() => setOpen(false)}
                            className="pictoCalendar w-full [&_.MuiInputBase-input]:cursor-pointer"
                            views={getDatePickerViews(selectedPeriodType.value)}
                            format={getDatePickerFormat(selectedPeriodType.value)}
                            // readOnly
                            slotProps={{
                                popper: {
                                    popperOptions: {
                                        modifiers: [
                                            {
                                                name: 'applyCustom',
                                                enabled: true,
                                                phase: 'beforeWrite',
                                                requires: ['computeStyles'],
                                                fn: ({ state }: { state: Partial<any> }) => {
                                                    state.styles.popper.height = '358px';
                                                    if (state.placement.includes('top-start')) {
                                                        state.styles.popper = {
                                                            ...state.styles.popper,
                                                            display: 'flex',
                                                            alignItems: 'flex-end',
                                                        };
                                                    }
                                                    if (state.placement.includes('bottom')) {
                                                        state.styles.popper = {
                                                            ...state.styles.popper,
                                                            display: 'block',
                                                        };
                                                    }
                                                },
                                            },
                                        ],
                                    }
                                },
                                textField: {
                                    variant: "standard",
                                    size: "medium",
                                    InputProps: {
                                        onClick: () => { setOpen(true) },
                                        disableUnderline: true,
                                        readOnly: true,
                                        onKeyDown: (e) => { e.preventDefault() },
                                        onSelect: (e) => { e.preventDefault() },
                                        style: { userSelect: 'none', cursor: 'pointer' }
                                    },
                                },
                            }}
                            slots={{ openPickerIcon: Calendar, rightArrowIcon: RightArrowIcon, leftArrowIcon: LeftArrowIcon }}
                            defaultValue={dayjs(props.date)}
                            onChange={(e: any) => {
                                const date = e.$d as Date;
                                props.onDateChange(date);
                            }}

                        />
                    </LocalizationProvider>
                </div>
            }
        </div>
    );
}

export default dynamic(() => Promise.resolve(DatePickerComponent), { ssr: false });
