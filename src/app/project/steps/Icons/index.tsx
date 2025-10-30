"use client"
import { icons } from "@/icons";
import { mainIcon } from "@/signals";
import { IIcon } from "@/types";
// import { Slider, Sketch, Material, Colorful, Compact, Circle, Wheel, Block, Github, Chrome } from '@uiw/react-color';
import { useState } from "react";
import { availabelColors, RenderPicto, StyledCircle } from "../../utils";

const Icons = (props: { preSelectedIcon?: IIcon, onIconPicked: (icon: IIcon) => void }) => {

    const [hexColor, setHexColor] = useState(props?.preSelectedIcon?.color || mainIcon.value.color);
    const [selectedIcon, setSelectedIcon] = useState<IIcon | null>(props?.preSelectedIcon || null);


    return (
        <div className="px-12 pb-48 flex flex-col h-full overflow-auto">
            <p className="text-xl font-bold text-center md:text-left text-black pt-8 py-4 md:py-12 ">Select color</p>
            <StyledCircle
                hexColor={hexColor}
                className="full-w mt-2 gap-3 md:justify-normal justify-between"
                colors={availabelColors}
                color={hexColor}
                pointProps={{ className: '!w-9 !h-9 !m-0 !rounded-full' }}
                rectProps={{ className: '!rounded-full w-1/2 h-1/2' }}
                onChange={(color) => {
                    selectedIcon && props.onIconPicked({ ...selectedIcon, color: color.hex })
                    setHexColor(color.hex);
                }}
            />

            <hr className="border-gray-200 my-12" />

            <p className="text-xl font-bold text-center md:text-left text-black py-4 pt-0 md:py-12 ">Select Pictosso icon</p>

            <div className="grid grid-cols-auto-fit gap-2 p-[1px] justify-between" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(4rem, 0fr))' }}>
                {icons.map((icon, index) => (
                    <RenderPicto
                        key={index}
                        showName={true}
                        onClick={() => {
                            setSelectedIcon(icon)
                            props.onIconPicked({ ...icon, color: hexColor })
                        }}
                        selected={icon.id == selectedIcon?.id}
                        icon={icon}
                        color={hexColor}
                    />
                ))}
            </div>

            {/* <Close /> */}

        </div>
    )
}

export default Icons;