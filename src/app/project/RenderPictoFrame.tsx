"use client"

import { Ref, RefObject, forwardRef, useRef, useState } from "react";
import { IComputeProject, computeProject, spaceBetweenLinesSmall, spaceBetweenLinesXl, spaceBetweenTextAndPictos, spaceBetweenTitleAndSubtitles } from "./ProjectPreview";
import styled from "styled-components";
import { IIcon, IPictoPos } from "@/types";
import { loadSvgComponent } from "@/components/SvgRenderer";
import { computedProject, highlightedLifeEvent, selectedProduct, selectedProductDetail } from "@/signals";
import { useEffect } from "@preact-signals/safe-react/react";
import { useMediaQuery } from "usehooks-ts";
import { device } from "../media-queries";
import { signature } from "@/icons";
import React from "react";


const DEBUG = false;
const DEBUG_DOWNLOAD = false;

export const getPictoFrameSvgBlob = () => {
    if (!document.querySelector("#pictoFrame")) return new Blob();
    const combinedSvgString = new XMLSerializer().serializeToString(
        document.querySelector("#pictoFrame") as SVGElement
    );
    const blob = new Blob([combinedSvgString], { type: 'image/svg+xml' });
    return blob
}
export const downloadPictoFrameSvg = (containerRef: RefObject<HTMLDivElement>) => {
    if (containerRef?.current) {
        const combinedSvgString = new XMLSerializer().serializeToString(
            containerRef.current.querySelector("#pictoFrame") as SVGElement
        );
        const blob = new Blob([combinedSvgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'combined.svg';
        a.click();
        URL.revokeObjectURL(url);
    }
}

const StyledPFContainer = styled.div`
    position: relative;

    #debug_grid {
        width: 30.2vh;
        top: 31.1vh;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        opacity: 0.4;
    }

    svg {
        position: absolute;
        z-index: 1;
    }
    #frame {
        // position: absolute;
        // width: 100%;
        height: 100%;
        min-height: 100%;
        max-height: 100%;
        object-fit: cover;
    }
`

const GridBackground = () => {
    const containerStyle: any = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridTemplateRows: 'repeat(16, 1fr)',
        zIndex: 1,
        // pointerEvents: "none"
    };

    const subContainerStyle: any = {
        ...containerStyle,
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(32, 1fr)',
    }

    const cellStyle: any = {
        boxSizing: 'border-box',
        aspectRatio: 1,
        outline: '0.01rem solid rgba(0, 0, 0, 1)',
    };

    return (
        <>
            <div style={{ ...subContainerStyle }}>
                {[...Array(32 * 24)].map((_, index) => (
                    <div key={index} style={{ ...cellStyle, outline: "0.01rem solid rgba(255, 0, 0)" }}></div>
                ))}
            </div>
            <div style={{ ...containerStyle }}>
                {[...Array(12 * 16)].map((_, index) => (
                    <div key={index} style={cellStyle}></div>
                ))}
            </div>
        </>
    );
};


export const textSizeRatio = {
    "small": 1.5 / 16,
    "xl": 5 / 16
}

export const MIN_PICTOS = 28;

const makePictoId = (icon: IIcon) => `${icon.id}_${icon?.color || "default"}`.replaceAll("#", "__")

export const RenderPictoFrame = (props: IComputeProject) => {
    console.log("XXSEselectedProduct", selectedProduct.value)
    const combinedSvgRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery(device.xs);
    const [computed, setComputed] = useState(() => computeProject(props));

    useEffect(() => {
        const newComputed = computeProject(props);
        setComputed(newComputed);
        if (newComputed) {
            computedProject.value = newComputed;
        }
    }, [props]);


    const customFontCss = `
    @font-face {
        font-family: 'Roboto';
        src: local('Roboto'), url('https://raw.githubusercontent.com/opencontainers/web/master/themes/material-design/static/font/roboto/Roboto-Thin.woff') format('woff');
    }
    `;
    // src: url('/fonts/Roboto-Thin-webfont.woff') format('woff');

    // computedProject.value = computeProject(props);
    if (!computed || typeof document === 'undefined') {
        return <h1>unable to compute project</h1>;
    }
    if (!computedProject.value || typeof document == 'undefined') return <h1>unable to compute project</h1>

    function calculateFontSize(desiredHeight: number, fontFamily = 'Arial', fontWeight = '100') {
        // Create a temporary SVG element
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        document.body.appendChild(svg);

        // Create a text element with the specified font family and weight
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('font-family', fontFamily);
        text.setAttribute('font-weight', fontWeight);

        // Set a large font size initially for better precision
        text.setAttribute('font-size', '100');

        // Set the text content to a dummy value
        text.textContent = 'Dummy';

        // Append the text element to the SVG
        svg.appendChild(text);

        // Get the bounding box of the text element
        const bbox = text.getBBox();

        // Calculate the font size to achieve the desired height
        const fontSize = (desiredHeight / bbox.height) * parseFloat(text?.getAttribute('font-size') || "0");

        // Remove the temporary SVG element
        document.body.removeChild(svg);

        // Return the calculated font size
        return fontSize;
    }

    // console.log("COMPUTED", computedProject)


    const marginWidth = 1 * computedProject.value.width / 16
    const marginHeight = 1 * computedProject.value.height / 16

    const notEnoughIcons = computedProject.value.pictos.length < MIN_PICTOS;

    return (
        <>
            {DEBUG_DOWNLOAD ? <button style={{ zIndex: '9', display: 'block', marginLeft: 'auto', background: 'white', padding: '1rem', position: 'absolute', right: '0' }} onClick={() => downloadPictoFrameSvg(combinedSvgRef)}>Download SVG</button> : <></>}
            <StyledPFContainer id="pictoFrameContainer"
            // style={{ width: `${computedProject.value.width + marginWidth * 2}px`, height: `${computedProject.value.height + marginWidth * 2}px` }}
            >
                {DEBUG ? <div id="debug_grid">
                    <GridBackground />
                </div> : <></>}
                <div ref={combinedSvgRef}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
                // style={{ width: `${computedProject.value.width + marginWidth * 2}px`, height: `${computedProject.value.height + marginWidth * 2}px` }}
                >

                    <svg
                        // style={{ background: "#ffcfcf" }}
                        id="pictoFrame"
                        viewBox={`0 0 ${computedProject.value.width + marginWidth * 2} ${computedProject.value.height + marginHeight * 2}`}
                        // width={computedProject.value.width + marginWidth * 2}
                        // height={computedProject.value.height + marginHeight * 2}
                        preserveAspectRatio="xMinYMin meet"
                    >
                        <style>{customFontCss}</style>

                        {(() => {
                            if (!(typeof computedProject.value === 'object')) return;
                            const { height, width, titleHeight } = computedProject.value;
                            const getRealWorldSpace = (unit: number) => unit / 16 * height
                            let _spaceBetweenTextAndPictos = getRealWorldSpace(spaceBetweenTextAndPictos);
                            let _spaceBetweenTitleAndSubtitles = getRealWorldSpace(spaceBetweenTitleAndSubtitles);
                            let _spaceBetweenText = 0;
                            if (props.titles.size == "small")
                                _spaceBetweenText = getRealWorldSpace(spaceBetweenLinesSmall);
                            else if (props.titles.size == "xl")
                                _spaceBetweenText = getRealWorldSpace(spaceBetweenLinesXl);
                            let fontSize = 0;
                            let maxY = 0;
                            // console.log("computedProjectxx", computedProject)
                            const titles = (computedProject.value.titleConfig?.titles || []).map((title, index) => {
                                const baseFontSize = calculateFontSize(title.height / 16 * height); // TODO find why i need this constant
                                fontSize = baseFontSize * 1.5;
                                let y = index * fontSize

                                maxY = Math.max(maxY, y + fontSize)
                                let textStyle: any = {}
                                if (props.titles.position.x == "center")
                                    textStyle = { textAnchor: "middle", dx: "50%", x: 0 }
                                if (props.titles.position.x == "left")
                                    textStyle = { x: marginWidth }
                                if (props.titles.position.x == "right")
                                    textStyle = { textAnchor: "end", x: width + marginWidth }
                                if (props.titles.position.y == "bottom") {
                                    textStyle.y = marginHeight + ((index + 1) * baseFontSize) + index * _spaceBetweenText + height - titleHeight
                                } else if (props.titles.position.y == "top") {
                                    textStyle.y = marginHeight + y + baseFontSize
                                }

                                // don't use x and y, use translate:
                                textStyle.transform = `translate(${textStyle.x || 0} ${textStyle.y || 0})`
                                textStyle.x = 0
                                textStyle.y = 0

                                return {
                                    svgText: <text
                                        key={title.text}
                                        fontFamily="Roboto, sans-serif" // Use the custom font
                                        fill="black"
                                        fontWeight={600}
                                        {...textStyle}
                                        fontSize={fontSize}
                                    >{title.text}</text>,
                                    y: y
                                }
                            })
                            const subTitles = (computedProject.value.titleConfig?.subTitles || []).map((subtitle, index) => {
                                const baseFontSize = calculateFontSize(subtitle.height / 16 * height); // TODO find why i need this constant
                                fontSize = baseFontSize * 1.5;
                                const y = (index) * fontSize * 1.5

                                let textStyle: any = {}
                                if (props.titles.position.x == "center")
                                    textStyle = { textAnchor: "middle", dx: "50%", x: 0 }
                                if (props.titles.position.x == "left")
                                    textStyle = { x: marginWidth }
                                if (props.titles.position.x == "right")
                                    textStyle = { textAnchor: "end", x: width + marginWidth }

                                if (props.titles.position.y == "bottom") {
                                    textStyle.y = marginHeight + ((index) * baseFontSize) + (index) * _spaceBetweenText + height - titleHeight + maxY + (props.titles.size == "small" ? _spaceBetweenText : 0)
                                    if (props.titles.size == "small") {
                                        textStyle.y += fontSize
                                    }
                                } else if (props.titles.position.y == "top") {
                                    textStyle.y = marginHeight + maxY + index * _spaceBetweenText + ((index + 1) * baseFontSize) + (props.titles.size == "small" ? _spaceBetweenText : 0)
                                }

                                // don't use x and y, use translate:
                                textStyle.transform = `translate(${textStyle.x || 0} ${textStyle.y || 0})`
                                textStyle.x = 0
                                textStyle.y = 0


                                // console.log("MAXYYYY", maxY)
                                return {
                                    svgText: <text
                                        key={subtitle.text}
                                        fontFamily="Roboto, sans-serif" // Use the custom font
                                        fill="black"
                                        fontWeight={600}
                                        {...textStyle}
                                        fontSize={fontSize}
                                    >{subtitle.text}</text>,
                                }
                            })
                            let pictosY = 0;
                            if (props.titles.titleEnabled && props.titles.title && props.titles.position.y == "top") {
                                // pictosY = maxY + fontSize + marginHeight + _spaceBetweenText;
                                if (computedProject.value.titleConfig) {
                                    pictosY = (computedProject.value.titleConfig.height) / 16 * computedProject.value.height
                                    // console.log("PICTOSY", pictosY)
                                }
                            }

                            // console.log("computedProject.value.pictos", computedProject.value.pictos)
                            const _uniquePictos: IPictoPos[] = computedProject.value.pictos.reduce((uniquePictos: IPictoPos[], currentPicto: IPictoPos) => {
                                // Check if the current icon.id already exists in uniquePictos
                                const existingPicto = uniquePictos.find((p) => makePictoId(p.icon) === makePictoId(currentPicto.icon));

                                // If not, add it to uniquePictos
                                if (!existingPicto) {
                                    uniquePictos.push(currentPicto);
                                }

                                return uniquePictos;
                            }, []);

                            return <>
                                {!notEnoughIcons && [...titles, ...subTitles].map(t => t.svgText)}

                                <defs>
                                    {_uniquePictos.map((item, index) => {
                                        const SvgComponent = loadSvgComponent({
                                            id: makePictoId(item.icon),
                                            fillColor: item.icon.color,
                                            icon: item.icon,
                                            width: item.width * item.icon.size,
                                            height: item.height * item.icon.size,
                                        });
                                        return SvgComponent;
                                    })}

                                </defs>
                                {!notEnoughIcons && <g
                                    transform={`translate(0, ${pictosY})`}
                                    alignmentBaseline="baseline">
                                    {computedProject.value.pictos.map((item, index) => {
                                        const isHighlighted = highlightedLifeEvent.value && item?.leId == highlightedLifeEvent.value?.id;
                                        const key = `${item.icon.id}_${item.x}_${item.y}`
                                        return isHighlighted ? <HighlightedPicto
                                            key={key}
                                            scale={1.5}
                                            speed={0.4}
                                            item={item}
                                            marginHeight={marginHeight}
                                            marginWidth={marginWidth}
                                        /> :
                                            <g
                                                key={key}
                                                id={item?.leId}
                                                fill={item.icon.color}
                                                width={item.width * item.icon.size}
                                                height={item.height * item.icon.size}
                                            >
                                                <use
                                                    fill={item.icon.color}
                                                    width={item.width * item.icon.size}
                                                    height={item.height * item.icon.size}
                                                    x={marginWidth + item.x - item.width * (item.icon.size - 1) / 2}
                                                    y={marginHeight + item.y - item.height * (item.icon.size - 1) / 2}
                                                    href={`#${makePictoId(item.icon)}`} />
                                            </g>


                                    })}

                                </g>}
                                {/* SIGNATURE */}
                                {(() => {
                                    const signatureWidth = width / 4;
                                    const signatureHeight = signatureWidth * 12 / 50;
                                    return loadSvgComponent({
                                        id: "signature",
                                        fillColor: "#000000",
                                        icon: signature,
                                        width: signatureWidth,
                                        height: signatureHeight,
                                        x: computedProject.value.width + marginWidth * 1 - signatureWidth,
                                        y: computedProject.value.height + 1.5 * computedProject.value.height / 16 - signatureHeight,
                                    })
                                })()
                                }



                            </>

                        })()}
                    </svg>

                    {selectedProduct.value &&
                        <img
                            src={`${selectedProductDetail.value?.color == "White"
                                ? `/frames/hero-white${isMobile ? "-mobile" : ""}.jpg`
                                : selectedProductDetail.value?.color == "Black"
                                    ? `/frames/hero-black${isMobile ? "-mobile" : ""}.jpg`
                                    : `/frames/hero-purple${isMobile ? "-mobile" : ""}.jpg`}`}
                            id="frame"

                            style={{
                                transform: `scaleY(${(selectedProduct.value.frame_height / selectedProduct.value.frame_width) * 0.83})`,
                            }}
                        />
                    }

                </div>
            </StyledPFContainer >
        </>

    );
}

const HighlightedPicto = (props: { item: IPictoPos, marginWidth: number, marginHeight: number, speed: number, scale: number }) => {
    const { item, scale, speed, marginWidth, marginHeight } = props;
    const [_scale, setScale] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setScale(pscale => pscale === 1 ? scale : 1);
        }, speed * 1000);

        return () => clearInterval(interval);
    }, [])

    return (

        <g
            style={{ transition: `${speed}s` }}
            id={item?.leId}
            fill={item.icon.color}
            width={item.width * item.icon.size}
            height={item.height * item.icon.size}
            transform={`scale(${_scale})`}
            transform-origin={`${marginWidth + item.x + item.width / 2}px ${marginHeight + item.y + item.width / 2}px`}

        >
            <use
                fill={item.icon.color}
                width={item.width * item.icon.size}
                height={item.height * item.icon.size}
                x={marginWidth + item.x - item.width * (item.icon.size - 1) / 2}
                y={marginHeight + item.y - item.height * (item.icon.size - 1) / 2}
                href={`#${makePictoId(item.icon)}`} />
        </g>
    )

}


export default RenderPictoFrame;