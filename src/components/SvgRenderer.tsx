import { IIcon } from '@/types';
import { Icon } from '@iconify/react';
import dynamic from 'next/dynamic';
import { CSSProperties, Suspense } from "react";

interface IloadSvg {
    icon: IIcon,
    x?: number,
    y?: number
    width: number,
    height: number,
    onClick?: Function,
    style?: any,
    fillColor?: string,
    id?: string,
}


export const loadSvgComponent = (props: IloadSvg) => {
    const { icon, x, y, width, height, onClick, style, fillColor, id } = props;
    const key = `${id}_${x}_${y}`
    if (icon.source == "local") {
        const _module = require(`./icons/${icon.path}`);
        const SvgComponent = _module.default || _module;

        return <SvgComponent
            id={id}
            key={key}
            // dataPath={icon.path}
            onClick={onClick}
            x={x}
            y={y}
            style={style}
            // width="100%" height="100%"
            width={width}
            height={height}
            fill={fillColor || 'currentColor'} />

    } else if (icon.source == "path") {
        const overrideFill = (svgString: string, fillColor: string) => {
            // console.log("fillColor", fillColor)
            // Remplace tous les attributs fill par le fillColor désiré
            return svgString.replace(/fill="[^"]*"/gi, `fill="${fillColor}"`);
        };

        // Fonction utilitaire pour extraire le contenu interne et le viewBox du SVG
        const extractInnerSVG = (svgString: string) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgString, "image/svg+xml");
            const svgEl = doc.querySelector("svg");
            if (svgEl) {
                // Utilise le viewBox s'il existe, sinon tente de le construire à partir des attributs width/height
                const vb = svgEl.getAttribute("viewBox") ||
                    `0 0 ${svgEl.getAttribute("width") || 15} ${svgEl.getAttribute("height") || 15}`;
                return { inner: svgEl.innerHTML, viewBox: vb };
            }
            return { inner: svgString, viewBox: "0 0 15 15" };
        };

        const processedSvg = fillColor ? overrideFill(icon.path, fillColor) : icon.path;

        const { inner, viewBox } = extractInnerSVG(processedSvg);
        // const { inner, viewBox } = extractInnerSVG(icon.path);

        return (
            <svg
                id={id}
                key={key}
                width={width}
                height={height}
                viewBox={viewBox}
                fill={fillColor}
                onClick={() => onClick && onClick()}
                style={style}
                preserveAspectRatio="xMidYMid meet"
            >
                <g dangerouslySetInnerHTML={{ __html: inner }} />
            </svg>
        );
    }
    else {
        return <Icon
            id={id}
            key={key}
            color={fillColor || 'currentColor'}
            x={x}
            y={y}
            style={style}
            width={width}
            height={height}
            icon={icon.path} />
    }
};


export const SvgRenderer = (props: { style?: CSSProperties, onClick?: Function, fillColor?: string, icon: IIcon, width: number, height: number }) => {
    const { width, height, icon, onClick, fillColor } = props;
    const SvgComponent = loadSvgComponent({ icon, width, height, fillColor, onClick });
    // const SvgComponent = loadSvgComponent({ icon, width: 40, height: 40, fillColor, onClick });


    return (
        <Suspense fallback={<div>Loading...</div>}>
            {SvgComponent}
        </Suspense>
    );
};


interface IIconPicker {
    defaultIconType?: "emoji" | "icon",
    renderIconSize?: string,
    icon: IIcon,
    onIconSelected: (icon: IIcon) => void
}
