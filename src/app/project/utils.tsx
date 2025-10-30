"use client"

import { SvgRenderer } from "@/components/SvgRenderer"
import { IIcon } from "@/types"
import Circle from "@uiw/react-color-circle"
import { useRef } from "react"
import styled from "styled-components"
import { useHover } from "usehooks-ts"


export const defaultColor = "#000000"
export const availabelColors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#a4a9c8", "#2196f3", "#29a9e1", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b", "#000000"];

export const RenderPicto = (props: { showName: boolean, selected: boolean, icon: IIcon, color: string | undefined, onClick: () => void }) => {

    const hoverRef = useRef(null)
    const isHover = useHover(hoverRef)
    const fillColor = !(isHover || props.selected) ? props.color : "#ffffff"
    const bgColor = (isHover || props.selected) ? props.color : "#ffffff"
    return (
        <div className="flex flex-col items-center gap-4">
            <div
            // data-tooltip-id="tooltip" data-tooltip-content={props.icon.name}
                ref={hoverRef}
                onClick={props.onClick}
                style={{ backgroundColor: bgColor, boxShadow: "0px 1px 1px 0 rgba(0,0,0,0.1), 0px 1px 2px 0 rgba(0,0,0,0.15)" }}
                className="flex cursor-pointer justify-center items-center p-4 rounded-2xl shadow aspect-square">

                <SvgRenderer icon={props.icon} fillColor={fillColor} width={30} height={30} />
            </div>
            {props.showName && <p className="w-[62px] opacity-40 text-xs font-medium text-center text-black mb-0">{props.icon.name}</p>}
        </div >
    )
}

export const StyledCircle = styled(Circle) <{ hexColor: string | undefined }>`
box-shadow: none;
[title="${(props) => props.hexColor}"] {
    border: 4px solid white !important;
    box-shadow: #cbcbcb 0px 0px 10px !important;
    >div {
        width: 0.6rem !important;
        height: 0.6rem !important;
    }
}
`

