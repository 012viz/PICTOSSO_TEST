"use client"

import { useElementSize } from "@/hooks/useElementSize";
import { computedProject, endDate, highlightedLifeEvent, lifeEvents, mainIcon, mobileMenuOpen, selectedPeriodType, selectedProduct, startDate, titles } from "@/signals";
import { IIcon, ILifeEvent, IPeriodType, IPictoPos, ITitles, PeriodType } from "@/types";
import { useLayoutEffect } from "react";
import styled from "styled-components";
// import RenderPictoFrame from "./RenderPictoFrame";

import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { effect, signal } from "@preact/signals-react";
import dynamic from "next/dynamic";
import PurpleButton from "@/components/PurpleButton";
import { endIcon, signature, startIcon } from "@/icons";
const RenderPictoFrame = dynamic(() => import('./RenderPictoFrame'), { ssr: false })

const frameWidth = 40;
const framePadding = 40;

export const StyledPreview = styled.div`
    display: flex;
    // height: calc(100vh - 4rem);
    // justify-content: center;
    // align-items: center;
    transition: 0.4s;
    overflow: hidden;

    #previewContainer {
        // Make the frame with the neon sign centered, instead of just the frame
        // margin-top: 5%;
        // transition: 0.4s;
        width: 100%;
        height: 100%;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        // transform: scale(6);
    }

    .react-transform-wrapper,
    .react-transform-component {
        width: 100%;
        height: 100%;
    }

    .container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.4s;
    }

    #pictoFrameContainer {
        transition: 0.4s;
        // position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        transform: scale(1.5);

        @media (max-width: 768px) {
          transform: scale(1.2) translateY(-5%);
        }
    }

    #pictoFrame {
        width: 30vh;
        margin-top: 8vh;
    }

    .frame {
        box-sizing: content-box;
        padding: ${framePadding}px;
        /* background-color:#ddc; */
        border:solid ${frameWidth}px #eee;
        border-bottom-color:#fff;
        border-left-color:#eee;
        border-radius:2px;
        border-right-color:#eee;
        border-top-color:#ddd;
        box-shadow: inset 60px 41px 110px -27px rgb(0 0 0 / 21%);
        display:inline-block;
        position:relative;
        text-align:center;
        &:before {
            border-radius:2px;
            bottom:-${frameWidth}px;
            box-shadow: 10px 14px 65px -20px rgba(0,0,0,1.25);
            content:"";
            left:-${frameWidth}px;
            position:absolute;
            right:-${frameWidth}px;
            top:-${frameWidth}px;
        }
        &:after {
            border-radius:2px;
            bottom:-2.5vmin;
            box-shadow: 0 2px 5px 0 rgba(0,0,0,.25);
            content:"";
            left:-2.5vmin;
            position:absolute;
            right:-2.5vmin;
            top:-2.5vmin;
        }
}
`


const getDaysBetweenDates = (date1: Date, date2: Date): number => {
    // Convert both dates to UTC to ensure consistent calculations
    const utcDate1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utcDate2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    // Calculate the difference in milliseconds
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const timeDifference = utcDate2 - utcDate1;

    const daysDifference = Math.floor(timeDifference / millisecondsPerDay);

    return daysDifference;
}


const getMonthsBetweenDates = (date1: Date, date2: Date): number => {
    const monthsDifference = (date2.getFullYear() - date1.getFullYear()) * 12 + date2.getMonth() - date1.getMonth();

    // // Adjust the difference if the day of the month in date2 is before the day of the month in date1
    // if (date2.getDate() < date1.getDate()) {
    //     return monthsDifference - 1;
    // }
    return monthsDifference;
}

const getYearsBetweenDates = (date1: Date, date2: Date): number => {
    const yearsDifference = date2.getFullYear() - date1.getFullYear();
    // // Check if date2 has not reached its anniversary in the current year
    // if (
    //     date2.getMonth() < date1.getMonth() ||
    //     (date2.getMonth() === date1.getMonth() && date2.getDate() < date1.getDate())
    // ) {
    //     console.log("getYearsBetweenDates", date1, date2, yearsDifference-1)
    //     return yearsDifference - 1;
    // }
    // console.log("getYearsBetweenDates", date1, date2, yearsDifference)

    return yearsDifference;
}




const calculateRowsColumns = (iconCount: number, ratio_width: number = 50, ratio_height: number = 70) => {
    const aspectRatio = ratio_width / ratio_height;

    let cols = Math.ceil(Math.sqrt(iconCount * aspectRatio));
    let rows = Math.ceil(iconCount / cols);
    let total = Math.ceil(rows / 2) * (cols - 1) + Math.floor(rows / 2) * cols
    let remainder = iconCount - total;
    if (remainder < 0) {
        rows -= 1;
        remainder = remainder + cols;
    }
    return { cols, rows, remainder };

}

export interface IComputeProject {
    titles: ITitles,
    startDate: number,
    endDate: number,
    periodType: IPeriodType,
    frameWidth: number,
    frameHeight: number,
    mainIcon: IIcon,
    lifeEvents: ILifeEvent[],
}

export interface IComputeProjectOut {
    width: number,
    height: number,
    pictos: IPictoPos[],
    titleConfig?: ITitleConfig,
    titleHeight: number
}

export interface ITitleConfig {
    titles: { text: string, height: number }[],
    subTitles: { text: string, height: number }[],
    height: number
}


//========================================================


interface ConfigData {
    title: boolean | number;
    subtitle: number;
    size: string | boolean;
    titleLines: number[];
    subtitleLines: number[];
}

export const spaceBetweenTitleAndSubtitles = 0.5;
export const spaceBetweenLinesXl = 0.5;
export const spaceBetweenLinesSmall = 0.5;
export const spaceBetweenTextAndPictos = 1;

const configData: ConfigData[] = [
    { title: false, size: false, subtitle: 0, titleLines: [0, 0, 0], subtitleLines: [0, 0] },
    { title: 1, size: "xl", subtitle: 0, titleLines: [1.5, 0, 0], subtitleLines: [0, 0] },
    { title: 2, size: "xl", subtitle: 0, titleLines: [1.5, 1.5, 0], subtitleLines: [0, 0] },
    { title: 3, size: "xl", subtitle: 0, titleLines: [1.5, 1.5, 1.5], subtitleLines: [0, 0] },
    { title: 1, size: "xl", subtitle: 1, titleLines: [1.5, 0, 0], subtitleLines: [0.25, 0] },
    { title: 2, size: "xl", subtitle: 1, titleLines: [1.5, 1.5, 0], subtitleLines: [0.25, 0] },
    { title: 3, size: "xl", subtitle: 1, titleLines: [1.5, 1.5, 1.5], subtitleLines: [0.25, 0] },
    { title: 1, size: "xl", subtitle: 2, titleLines: [1.5, 0, 0], subtitleLines: [0.25, 0.25] },
    { title: 2, size: "xl", subtitle: 2, titleLines: [1.5, 1.5, 0], subtitleLines: [0.25, 0.25] },
    { title: 3, size: "xl", subtitle: 2, titleLines: [1.5, 1.5, 1.5], subtitleLines: [0.25, 0.25] },
    { title: 1, size: "small", subtitle: 0, titleLines: [0.5, 0, 0], subtitleLines: [0, 0] },
    { title: 2, size: "small", subtitle: 0, titleLines: [0.5, 0.5, 0], subtitleLines: [0, 0] },
    { title: 3, size: "small", subtitle: 0, titleLines: [0.5, 0.5, 0.5], subtitleLines: [0, 0] },
    { title: 1, size: "small", subtitle: 1, titleLines: [0.5, 0, 0], subtitleLines: [0.25, 0] },
    { title: 2, size: "small", subtitle: 1, titleLines: [0.5, 0.5, 0], subtitleLines: [0.25, 0] },
    { title: 3, size: "small", subtitle: 1, titleLines: [0.5, 0.5, 0.5], subtitleLines: [0.25, 0] },
    { title: 1, size: "small", subtitle: 2, titleLines: [0.5, 0, 0], subtitleLines: [0.25, 0.25] },
    { title: 2, size: "small", subtitle: 2, titleLines: [0.5, 0.5, 0], subtitleLines: [0.25, 0.25] },
    { title: 3, size: "small", subtitle: 2, titleLines: [0.5, 0.5, 0.5], subtitleLines: [0.25, 0.25] },
    { title: false, size: false, subtitle: 1, titleLines: [0, 0, 0], subtitleLines: [0.25, 0] },
    { title: false, size: false, subtitle: 2, titleLines: [0, 0, 0], subtitleLines: [0.25, 0.25] },
];

const getConfig = (titleLineCount: number, subTitleLineCount: number, size: "xl" | "small") => {
    return configData.find(cd => cd.title == titleLineCount && cd.subtitle == subTitleLineCount && cd.size == size);
}

function splitByLength(str: string, length: number) {
    const result = [];
    for (let i = 0; i < str.length; i += length) {
        result.push(str.slice(i, i + length));
    }
    return result;
}

// Determine the maximum characters per line based on size
export const getMaxCharsPerLine = (titles: ITitles, type: "title" | "subtitle") => {
    if (type == "title")
        return titles.size == "xl" ? 8 : 17
    if (type == "subtitle")
        return 54
    return 0;
}

export function getTitleConfig(titles: ITitles): ITitleConfig {
    const titleLines: { text: string; height: number }[] = [];
    const subtitlesLines: { text: string; height: number }[] = [];


    // Add title to lines
    if (titles.titleEnabled) {
        titleLines.push(...(
            (titles.title || "").split('\n')
                .map(line => splitByLength(line, getMaxCharsPerLine(titles, "title")))
                .flatMap(l => l)
                .map(line => ({ text: line.trim(), height: 0 }))
        ));
        // titleLines.push(...splitTextIntoLines(titles.title || "", getMaxCharsPerLine("title")).map(line => ({ text: line.text, height: 0 })));
    }

    // Add subtitle to lines
    if (titles.subtitleEnabled) {
        subtitlesLines.push(...splitTextIntoLines(titles.subtitle || "", getMaxCharsPerLine(titles, "subtitle")).map(line => ({ text: line.text, height: 0 })));
    }

    const config = getConfig(titleLines.length, subtitlesLines.length, titles.size);
    // console.log("computedProject CONFIG", config)
    if (!config) {
        return {
            titles: [],
            subTitles: [],
            height: 0
        }
    };


    let titleConfig = {
        titles: titleLines.map((sl, index) => ({ ...sl, height: config?.titleLines[index] })),
        subTitles: subtitlesLines.map((sl, index) => ({ ...sl, height: config?.subtitleLines[index] })),
        height: 0,
    }

    let titleHeight = 0;
    if (titleConfig.titles.length > 0) {
        titleHeight += (titleConfig.titles.length - 1) * spaceBetweenLinesXl + titleConfig.titles.reduce((prev, curr) => prev + curr.height, 0)
        // console.log("xtitleHeight titles", titleConfig.titles, titleHeight)
    }
    if (titleConfig.subTitles.length > 0) {
        titleHeight += (titleConfig.subTitles.length - 1) * spaceBetweenLinesSmall + titleConfig.subTitles.reduce((prev, curr) => prev + curr.height, 0) + spaceBetweenTitleAndSubtitles
        // console.log("xtitleHeight subtitles", titleConfig.subTitles, titleHeight)
    }
    if (titleConfig.titles.length > 0 || titleConfig.subTitles.length > 0) {
        titleHeight += spaceBetweenTextAndPictos
        // console.log("xtitleHeight spaceBetween", titleHeight)
    }

    // console.log("xtitleHeight full", titleHeight)
    titleConfig.height = titleHeight

    return titleConfig;

}

function splitTextIntoLines(text: string, maxCharsPerLine: number): { text: string; height: number }[] {
    const lines: { text: string; height: number }[] = [];
    // const words = text.split(/\s+/);
    const words = text.split("");

    let currentLine = "";
    let currentHeight = 0;

    for (const word of words) {
        if (currentLine.length + word.length > maxCharsPerLine) {
            // Start a new line
            lines.push({ text: currentLine.trim(), height: currentHeight });
            currentLine = word;
            currentHeight = 0;
        } else {
            currentLine += word;
        }
    }

    // Add the last line
    if (currentLine.trim())
        lines.push({ text: currentLine.trim(), height: currentHeight });

    return lines;
}




//========================================================










export const getIconCount = () => {
    const totalIcons = computedProject.value?.pictos?.length || 0;
    const totalUserIcons = totalIcons == 0 ? 0 : totalIcons - 2;
    return totalUserIcons;
}
export const computeProject: (projectInput: IComputeProject) => IComputeProjectOut | null = (projectInput) => {
    const { titles, startDate, endDate, periodType, frameWidth, frameHeight, mainIcon, lifeEvents } = projectInput;
    const _startDate = new Date(startDate);
    const _endDate = new Date(endDate);

    let iconCount = 0;
    if (periodType == PeriodType.DAY) {
        iconCount = getDaysBetweenDates(_startDate, _endDate);
    } else if (periodType == PeriodType.MONTH) {
        iconCount = getMonthsBetweenDates(_startDate, _endDate);
    } else if (periodType == PeriodType.YEAR) {
        iconCount = getYearsBetweenDates(_startDate, _endDate);
    }
    console.log("ICONCOUNT", iconCount)
    // Add 1 to include the start icon month
    iconCount += 2;
    // console.log("ICONCOUNT", iconCount);

    let isQuincunx = false;
    const titleConfig = getTitleConfig(titles);
    let iconsHeight = frameHeight - titleConfig.height;
    let { cols, rows, remainder } = calculateRowsColumns(iconCount, frameWidth, iconsHeight);
    const width = cols * (icon_width + margin) - margin;
    let height = (width * frameHeight) / frameWidth;

    let index = 0;
    let pictos: IPictoPos[] = [];
    let marginV = margin;
    if (remainder > 0 && titleConfig.height <= 0 && titles.position.y == "bottom") {
        marginV -= marginV * 0.2;
    }

    // Main icon placement logic
    for (let i = 0; i < rows; i++) {
        isQuincunx = i % 2 !== 0;
        for (let j = 0; j < (cols - (isQuincunx ? 0 : 1)); j++) {
            const x = j * (icon_width + margin) + (isQuincunx ? 0 : (icon_width + margin) / 2);
            const y = i * (icon_height + marginV);
            let icon: IIcon = mainIcon;
            let matchingLE = null;
            // // add first icon
            if (index == 0)
                matchingLE = { leId: startIcon.id, width: icon_width, height: icon_height, x, y, icon: startIcon };
            else if (periodType == PeriodType.MONTH)
                matchingLE = lifeEvents.find(le => getMonthsBetweenDates(new Date(startDate), new Date(le.date)) === index - 1);
            else if (periodType == PeriodType.DAY)
                matchingLE = lifeEvents.find(le => getDaysBetweenDates(new Date(startDate), new Date(le.date)) === index - 1);
            else if (periodType == PeriodType.YEAR)
                matchingLE = lifeEvents.find(le => getYearsBetweenDates(new Date(startDate), new Date(le.date)) === index - 1);

            if (matchingLE)
                icon = matchingLE.icon;

            // console.log("ICONCOUNT", `${index} / ${iconCount}`)


            pictos.push({ leId: matchingLE?.id, width: icon_width, height: icon_height, x, y, icon });
            index++;
        }
    }

    // Remaining icons if any
    // console.log(`INDEX: ${index} | REMAINDER : ${remainder} | NEW REMAINDER : ${iconCount - index} | TOTAL : ${iconCount}`)
    const endIconWidthScaleX = 3;
    // remainder = iconCount - index;
    const newRemainder = iconCount - index;

    // if no remainder add endicon centered on new line
    if (remainder <= 0) {
        let offset = ((cols - remainder - 1) / 2) * (icon_width + margin);
        const x = (remainder - 0.5) * (icon_width + margin) + offset;
        const y = rows * (icon_height + marginV);

        pictos.push({ width: icon_width * endIconWidthScaleX, height: icon_height, x, y, icon: endIcon });

    }
    // if remainder try to add add endicon next to remainder
    else {
        let offset = ((cols - remainder + 1 - (isQuincunx ? 0 : 1)) / 2) * (icon_width + margin);

        // if the remainder line has space for the endIcon on the same line, adjust the spacing
        const remainderLineHasSpaceForEndIcon = remainder + endIconWidthScaleX <= cols;
        console.log("remainderLineHasSpaceForEndIcon", remainderLineHasSpaceForEndIcon, remainder)
        if (remainderLineHasSpaceForEndIcon) {
            offset = offset - (icon_width + margin) * endIconWidthScaleX / 2;
        }
        let j = 0;
        // for (let j = 0; j <= remainder; j++) {
        let x = 0;
        while (index < iconCount) {
            x = j * (icon_width + margin) + offset;
            const y = rows * (icon_height + marginV);
            let icon: IIcon = mainIcon;
            let matchingLE = null;

            if (periodType == PeriodType.MONTH)
                matchingLE = lifeEvents.find(le => getMonthsBetweenDates(new Date(startDate), new Date(le.date)) === index - 1);
            else if (periodType == PeriodType.DAY)
                matchingLE = lifeEvents.find(le => getDaysBetweenDates(new Date(startDate), new Date(le.date)) === index - 1);
            else if (periodType == PeriodType.YEAR)
                matchingLE = lifeEvents.find(le => getYearsBetweenDates(new Date(startDate), new Date(le.date)) === index - 1);

            if (matchingLE)
                icon = matchingLE.icon;
            pictos.push({ leId: matchingLE?.id, width: icon_width, height: icon_height, x, y, icon });
            // console.log("ICONCOUNT", `${index} / ${iconCount}`)
            index++;
            j++;
        }

        if (remainderLineHasSpaceForEndIcon) {
            x = x + icon_width + margin
            const y = rows * (icon_height + marginV);

            pictos.push({ width: icon_width * endIconWidthScaleX, height: icon_height, x, y, icon: endIcon });
        } else {
            let offset = ((cols - 2) / 2) * (icon_width + margin);
            const x = offset;
            const y = (rows + 1) * (icon_height + marginV);

            // console.log()
            pictos.push({ width: icon_width * endIconWidthScaleX, height: icon_height, x, y, icon: endIcon });
        }

    }

    let pictoHeightPx = height * (frameHeight - titleConfig.height) / frameHeight


    const spaceForSignature = (width * 1) / frameWidth;
    // Adjust positions if there are remainders
    const maxPictoHeight = Math.max(...pictos.map(p => p.y + icon_height + marginV + spaceForSignature));
    pictos = pictos.map(picto => {
        return { ...picto, y: picto.y * (pictoHeightPx / maxPictoHeight) };
    });

    return { width, height, pictos, titleConfig, titleHeight: height * titleConfig.height / frameHeight };
};


const Zoom = (props: { zoomIn: Function, zoomOut: Function }) => {
    return (
        <div className="hidden md:flex cursor-pointer absolute top-4 left-4 z-10 bg-white gap-1 p-1 items-center rounded-2xl shadow">
            <div onClick={() => props.zoomIn()} className="h-8 w-8 flex items-center justify-center w-1/2">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="5" width="12" height="2" fill="black" />
                    <rect x="5" y="12" width="12" height="2" transform="rotate(-90 5 12)" fill="black" />
                </svg>
            </div>
            <div className="shrink-0 self-center opacity-[20%] w-px h-6 bg-black" />
            <div onClick={() => props.zoomOut()} className="h-8 w-8 flex items-center justify-center w-1/2">
                <div className="shrink-0 self-stretch my-auto w-3 h-0.5 bg-black" />
            </div>
        </div>
    )
}
const icon_width: number = 15;
const icon_height: number = 15;
const margin: number = 10;


export const zoomToElement = signal<Function | null>(null)
const ProjectPreview = () => {

    const [containerRef, { width: containerWidth, height: containerHeight }] = useElementSize<"div">();

    // TODO do somtehing with a ratio and not width and height
    const frameWidth = 12;
    const frameHeight = 16;

    const preview = (selectedProduct.value) ? <RenderPictoFrame
        // ref={pictoFrameRef}
        // key={scale}
        startDate={startDate.value}
        endDate={endDate.value}
        periodType={selectedPeriodType.value}
        frameWidth={frameWidth}
        frameHeight={frameHeight}
        mainIcon={mainIcon.value}
        lifeEvents={lifeEvents.value}
        titles={titles.value} /> : <></>



    return (
        <StyledPreview id="preview" className="relative w-full h-full" ref={containerRef}>

            {preview && <TransformWrapper disablePadding={true}>
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => {
                    zoomToElement.value = rest.zoomToElement;
                    return (
                        <>
                            <Zoom zoomIn={() => zoomIn()} zoomOut={() => zoomOut()} />
                            <TransformComponent >
                                <div id="previewContainer">
                                    {preview}
                                </div>
                            </TransformComponent>
                        </>
                    )
                }}

            </TransformWrapper>}

            <PurpleButton className="fixed bottom-8 items-center self-center w-[80%] left-[10%] ml-auto md:!hidden" onClick={() => mobileMenuOpen.value = true}>
                <p className="w-full">Edit my artwork</p>
            </PurpleButton>

        </StyledPreview >
    )
}

export default ProjectPreview;