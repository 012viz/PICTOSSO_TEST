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
    console.log("[getYearsBetweenDates]", date1.getFullYear(), "to", date2.getFullYear(), "=", yearsDifference);
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
    let remainder = iconCount % cols;
    
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

// Function to calculate average color from icons
const calculateAverageColor = (icons: IIcon[]): string => {
    if (icons.length === 0) return "#000000";
    
    let totalR = 0, totalG = 0, totalB = 0;
    let validColors = 0;
    
    icons.forEach(icon => {
        // Try to get color from icon.color property
        if (icon.color && icon.color !== "unset" && icon.color !== "currentColor") {
            const hex = icon.color.replace('#', '');
            if (hex.length === 6) {
                const r = parseInt(hex.substring(0, 2), 16);
                const g = parseInt(hex.substring(2, 4), 16);
                const b = parseInt(hex.substring(4, 6), 16);
                
                if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
                    totalR += r;
                    totalG += g;
                    totalB += b;
                    validColors++;
                }
            }
        }
        // For iconify emojis, extract color from the path/name
        else if (icon.source === "iconify" && icon.path) {
            const path = icon.path.toLowerCase();
            let r = 80, g = 80, b = 80; // Default dark gray
            
            // Parse the emoji ID for color hints (e.g., "noto:red-heart")
            if (path.includes('red') || path.includes('heart') || path.includes('love')) {
                r = 239; g = 68; b = 68; // Red
            } else if (path.includes('blue') || path.includes('water') || path.includes('ocean')) {
                r = 59; g = 130; b = 246; // Blue
            } else if (path.includes('green') || path.includes('plant') || path.includes('leaf') || path.includes('tree')) {
                r = 34; g = 197; b = 94; // Green
            } else if (path.includes('yellow') || path.includes('sun') || path.includes('star')) {
                r = 250; g = 204; b = 21; // Yellow
            } else if (path.includes('purple') || path.includes('violet') || path.includes('grape')) {
                r = 168; g = 85; b = 247; // Purple
            } else if (path.includes('orange') || path.includes('fire') || path.includes('flame')) {
                r = 249; g = 115; b = 22; // Orange
            } else if (path.includes('pink') || path.includes('blossom') || path.includes('cherry')) {
                r = 244; g = 114; b = 182; // Pink
            } else if (path.includes('brown') || path.includes('wood')) {
                r = 120; g = 80; b = 50; // Brown
            } else if (path.includes('white') || path.includes('cloud')) {
                r = 240; g = 240; b = 240; // Light gray
            } else if (path.includes('black') || path.includes('night')) {
                r = 40; g = 40; b = 40; // Dark gray
            }
            
            totalR += r;
            totalG += g;
            totalB += b;
            validColors++;
        }
    });
    
    // If no colors found, return elegant dark gray
    if (validColors === 0) return "#505050";
    
    const avgR = Math.round(totalR / validColors);
    const avgG = Math.round(totalG / validColors);
    const avgB = Math.round(totalB / validColors);
    
    return `#${avgR.toString(16).padStart(2, '0')}${avgG.toString(16).padStart(2, '0')}${avgB.toString(16).padStart(2, '0')}`;
};

export const computeProject: (projectInput: IComputeProject) => IComputeProjectOut | null = (projectInput) => {
    let { titles, startDate, endDate, periodType, frameWidth, frameHeight, mainIcon, lifeEvents } = projectInput;
    const _startDate = new Date(startDate);
    const _endDate = new Date(endDate);
    
    // Normalize old localStorage values (migration from YEAR/MONTH/DAY to years/months/days)
    if (periodType === "YEAR" as any) periodType = PeriodType.YEAR;
    if (periodType === "MONTH" as any) periodType = PeriodType.MONTH;
    if (periodType === "DAY" as any) periodType = PeriodType.DAY;

    let iconCount = 0;
    console.log("[computeProject] periodType check:", periodType, "===", PeriodType.YEAR, "?", periodType === PeriodType.YEAR);
    console.log("[computeProject] periodType check:", periodType, "===", PeriodType.MONTH, "?", periodType === PeriodType.MONTH);
    console.log("[computeProject] periodType check:", periodType, "===", PeriodType.DAY, "?", periodType === PeriodType.DAY);
    
    if (periodType == PeriodType.DAY) {
        console.log("[computeProject] Calling getDaysBetweenDates");
        iconCount = getDaysBetweenDates(_startDate, _endDate);
    } else if (periodType == PeriodType.MONTH) {
        console.log("[computeProject] Calling getMonthsBetweenDates");
        iconCount = getMonthsBetweenDates(_startDate, _endDate);
    } else if (periodType == PeriodType.YEAR) {
        console.log("[computeProject] Calling getYearsBetweenDates");
        iconCount = getYearsBetweenDates(_startDate, _endDate);
    } else {
        console.log("[computeProject] ⚠️ NO MATCH for periodType:", periodType);
    }
    console.log("[computeProject] Initial iconCount:", iconCount, "periodType:", periodType, "dates:", _startDate, _endDate)
    // Add 1 to include the start icon month
    iconCount += 2;
    console.log("[computeProject] After +2, iconCount:", iconCount);

    // Ensure we have at least the minimum number of icons (need at least 2)
    if (iconCount < 2) {
        console.warn("[computeProject] ❌ Not enough icons, returning null");
        return null;
    }

    const titleConfig = getTitleConfig(titles);
    let iconsHeight = frameHeight - titleConfig.height;
    
    // Calculate for middle icons only (iconCount - 2 because we exclude start and end icons)
    const middleIconCount = Math.max(0, iconCount - 2);
    let { cols, rows, remainder } = calculateRowsColumns(middleIconCount, frameWidth, iconsHeight);
    const width = cols * (icon_width + margin) - margin;
    let height = (width * frameHeight) / frameWidth;

    let pictos: IPictoPos[] = [];
    let marginV = margin;
    
    // Collect middle icons first to calculate average color
    let middleIcons: IIcon[] = [];
    let index = 1; // Start at 1 because index 0 is the startIcon
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // Stop if we've placed all middle icons
            if (index >= iconCount - 1) break; // -1 because we need to reserve space for endIcon
            
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

            middleIcons.push(icon);
            index++;
        }
        if (index >= iconCount - 1) break;
    }
    
    // Calculate average color from middle icons
    const avgColor = calculateAverageColor(middleIcons);
    
    // Create colored start and end icons
    const coloredStartIcon: IIcon = {
        ...startIcon,
        color: avgColor,
        path: `<circle cx="7.5" cy="7.5" r="7.5" fill="${avgColor}"/>`
    };
    
    const coloredEndIcon: IIcon = {
        ...endIcon,
        color: avgColor,
        path: `<circle cx="7.5" cy="7.5" r="7.5" fill="${avgColor}"/>`
    };
    
    // FIRST LINE: Place start icon (aligned left, 70% size, centered)
    const startIconSize = icon_width * 0.7;
    const startOffset = (icon_width - startIconSize) / 2; // Center within the grid cell
    const startX = startOffset;
    const startY = startOffset;
    pictos.push({ 
        leId: startIcon.id, 
        width: startIconSize, 
        height: startIconSize, 
        x: startX, 
        y: startY, 
        icon: coloredStartIcon 
    });

    // MIDDLE LINES: Place main icons in grid
    index = 0; // Reset index for actual placement
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (index >= middleIcons.length) break;
            
            const x = j * (icon_width + margin);
            const y = (i + 1) * (icon_height + marginV); // +1 to skip first line
            
            const matchingLE = lifeEvents.find(le => {
                if (periodType == PeriodType.MONTH)
                    return getMonthsBetweenDates(new Date(startDate), new Date(le.date)) === index;
                else if (periodType == PeriodType.DAY)
                    return getDaysBetweenDates(new Date(startDate), new Date(le.date)) === index;
                else if (periodType == PeriodType.YEAR)
                    return getYearsBetweenDates(new Date(startDate), new Date(le.date)) === index;
                return false;
            });

            pictos.push({ leId: matchingLE?.id, width: icon_width, height: icon_height, x, y, icon: middleIcons[index] });
            index++;
        }
        if (index >= middleIcons.length) break;
    }

    // LAST LINE: Place 3 end icons (colored dots) aligned left, 70% size, centered
    const endIconSize = icon_width * 0.7;
    const endOffset = (icon_width - endIconSize) / 2; // Center within the grid cell
    const lastMiddleIcon = pictos[pictos.length - 1];
    const endY = lastMiddleIcon.y + icon_height + marginV + endOffset;
    
    // Add 3 colored dots aligned with the grid
    for (let i = 0; i < 3; i++) {
        const endX = i * (icon_width + margin) + endOffset;
        pictos.push({ 
            width: endIconSize, 
            height: endIconSize, 
            x: endX, 
            y: endY, 
            icon: coloredEndIcon 
        });
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