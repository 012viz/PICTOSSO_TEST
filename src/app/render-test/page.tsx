'use client'

import React, { useCallback, useState } from 'react';
import RenderPictoFrame from '../project/RenderPictoFrame';
import { StyledPreview } from '../project/ProjectPreview';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { v4 as uuid } from 'uuid';
import { IIcon, ILifeEvent, ITitles, PeriodType } from '@/types';


const defaultColor = "#000000"
const mainIcon: IIcon = { id: uuid(), width: 15, height: 15, source: "local", path: 'bobmarley/MAIN.svg', name: 'BASKETBALL', size: 1, color: defaultColor, description: "" }
const icons = [
    { id: uuid(), width: 15, height: 15, source: "local", path: 'pictosso/Birth.svg', name: 'BIRTH', size: 1, color: defaultColor, description: "" },
    { id: uuid(), width: 15, height: 15, source: "local", path: 'pictosso/Meeting someone.svg', name: 'MEET', size: 1, color: defaultColor, description: "" },
    { id: uuid(), width: 15, height: 15, source: "local", path: 'pictosso/Wedding.svg', name: 'WEDDING', size: 1, color: defaultColor, description: "" },
    { id: uuid(), width: 15, height: 15, source: "local", path: 'pictosso/Music event.svg', name: 'ALBUM', size: 1, color: defaultColor, description: "" },
    { id: uuid(), width: 15, height: 15, source: "local", path: 'spurs/RETIRED.svg', name: 'RETIRED', size: 1, color: defaultColor, description: "" },
    { id: uuid(), width: 15, height: 15, source: "local", path: 'pictosso/Spiritual event.svg', name: 'SPIRITUAL', size: 1, color: defaultColor, description: "" },
    { id: uuid(), width: 15, height: 15, source: "local", path: 'pictosso/Significant event.svg', name: 'SIGNIFICANT', size: 1, color: defaultColor, description: "" },
    { id: uuid(), width: 15, height: 15, source: "local", path: 'pictosso/Love.svg', name: 'HEART', size: 1, color: defaultColor, description: "" },
]
const iconsByKey: { [key: string]: IIcon } = icons.reduce((acc, curr) => ({ ...acc, [curr.name]: curr }), {});

const titles: ITitles = {
    titleEnabled: false,
    subtitleEnabled: false,
    title: "",
    subtitle: "",
    size: "xl",
    position: {
        x: "left",
        y: "top"
    }
}

const selectedPeriodType = PeriodType.MONTH;

const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/');
    return new Date(`${year}-${month}-${day}`).getTime()
}

const RenderTest: React.FC = () => {

    const [lifeEvents, setLifeEvents] = useState<ILifeEvent[]>([])
    const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                const rows = content.split('\n');
                console.log("ROWS", rows)
                const newLifeEvents: ILifeEvent[] = rows.slice(1).filter(x=>x).map(row => {
                    const [dateStr, iconName] = row.split(',');
                    const trimmedIconName = iconName.trim();
                    if (!iconsByKey[trimmedIconName]) {
                        console.log(`Icon not found: ${trimmedIconName}`);
                    }
                    return {
                        id: uuid(),
                        icon: { ...iconsByKey[trimmedIconName], color: defaultColor },
                        date: parseDate(dateStr),
                        description: "",
                    };
                });
                setLifeEvents(newLifeEvents);
            };
            reader.readAsText(file);
        }
    }, []);

    const startDate = lifeEvents.reduce((oldest, event) => event.date < oldest ? event.date : oldest, new Date().getTime());
    const endDate = lifeEvents.reduce((newest, event) => event.date > newest ? event.date : newest, 0);
    // const endDate = parseDate("06/11/2001");
    console.log("XXXXXXd startDate", new Date(startDate))
    console.log("XXXXXXd endDate", new Date(endDate))
    console.log("XXXXXXd lifeEvents", lifeEvents)
    const preview = lifeEvents.length > 0 && <RenderPictoFrame
        startDate={startDate}
        endDate={endDate}
        periodType={selectedPeriodType}
        frameWidth={12}
        frameHeight={16}
        mainIcon={mainIcon}
        lifeEvents={lifeEvents}
        titles={titles} />;

    return (
        <div className="flex flex-col overflow-hidden">
            <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="mb-4"
            />
            <div className="flex w-[100vw] h-[100vh] items-center justify-center">

                <div className="flex-1 flex flex-row h-[100vh] justify-center ">
                    <div className="w-full">
                        <StyledPreview id="preview" className="relative w-full h-full" >

                            <TransformWrapper disablePadding={true}>
                                {({ zoomIn, zoomOut, resetTransform, ...rest }) => {
                                    // zoomToElement.value = rest.zoomToElement;
                                    return (
                                        <>
                                            {/* <Zoom zoomIn={() => zoomIn()} zoomOut={() => zoomOut()} /> */}
                                            <TransformComponent >
                                                <div id="previewContainer">
                                                    {preview}
                                                </div>
                                            </TransformComponent>
                                        </>
                                    )
                                }}

                            </TransformWrapper>

                        </StyledPreview>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default RenderTest;
