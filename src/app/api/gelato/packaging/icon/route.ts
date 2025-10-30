import { iconsByKey } from '@/icons';
import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import sharp from 'sharp';
import { generateSvgString } from '@/utils';


const fs = require('fs');
const path = require('path');


const getIconSvg = async (icon: string) => {
    const svgFilePath = resolve(process.cwd(), `src/components/icons/${icon}`);
    let iconSvgContent;
    try {
        iconSvgContent = await readFile(svgFilePath, 'utf8');
    } catch (error) {
        const response = await fetch(`https://api.iconify.design/${icon}.svg`);
        iconSvgContent = await response.text();

        if (iconSvgContent) {

            iconSvgContent = `
            <g transform="translate(-15, -18) scale(9)">
            ${iconSvgContent}}
            </g>
            `
        } else {
            iconSvgContent = icon.replace(/^\s*(?:<\?xml[^>]*>|<!--[^>]*-->)*\s*/, '')
            iconSvgContent = generateSvgString({width: 75, height: 75, icon: {path: iconSvgContent}})

        }
    }

    iconSvgContent = fillSvgColor(iconSvgContent, "#673ab7");

    return `<svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_dd_929_5326)">
        <rect x="2" y="1" width="72" height="72" rx="16" fill="white" />
        <rect x="2" y="1" width="72" height="72" rx="16" fill="url(#paint0_linear_929_5326)"
            fill-opacity="0.05" />
    </g>
    <g transform="translate(15, 15) scale(0.6)">
        ${iconSvgContent}
    </g>

    <defs>
        <filter id="filter0_dd_929_5326" x="0" y="0" width="76" height="76"
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_929_5326" />
            <feColorMatrix in="SourceAlpha" type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="0.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
            <feBlend mode="normal" in2="effect1_dropShadow_929_5326"
                result="effect2_dropShadow_929_5326" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_929_5326"
                result="shape" />
        </filter>
        <linearGradient id="paint0_linear_929_5326" x1="38" y1="1" x2="38" y2="73"
            gradientUnits="userSpaceOnUse">
            <stop stop-color="#2B00FF" stop-opacity="0" />
            <stop offset="1" stop-color="#2B00FF" />
        </linearGradient>
    </defs>
</svg>
    `;

}

function fillSvgColor(svgContent: string, color: string) {
    // This regex looks for the first <g>, <path>, or <svg> tag
    const regex = /(<(?:g|path|svg)(?:\s+[^>]*)?)(>)/;
    return svgContent.replace(regex, (match, p1, p2) => {
        // If fill is already defined, replace it; otherwise, add it
        if (p1.includes('fill=')) {
            return p1.replace(/fill="[^"]*"/, `fill="${color}"`) + p2;
        } else {
            return `${p1} fill="${color}"${p2}`;
        }
    });
}


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const iconPath = decodeURIComponent(searchParams.get('iconPath') || '');
    console.log("iconSvgContent", iconPath)
    if (iconPath == null)
        return;


    const svgImage = await getIconSvg(iconPath)

    const pngBuffer = await sharp(Buffer.from(svgImage))
        .png()
        .resize(128)
        .toBuffer();

    return new NextResponse(pngBuffer, {
        status: 200,
        headers: {
            'Content-Type': 'image/png',
        },
    });


    return new NextResponse(svgImage, {
        status: 200,
        headers: {
            'Content-Type': 'image/svg+xml',
        },
    });
}
