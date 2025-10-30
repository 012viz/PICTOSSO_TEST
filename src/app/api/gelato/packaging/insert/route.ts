import { generateSvgString } from '@/utils';
import { readFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import { resolve } from 'path';
import sharp from 'sharp';


const fs = require('fs');
const path = require('path');




const buildSvgImage = async (icon: string, startDate: string, endDate: string, numberIcons: string, periodType: string) => {
    const svgFilePath = resolve(process.cwd(), `src/components/icons/${icon}`);
    let iconSvgContent;
    try {
        iconSvgContent = await readFile(svgFilePath, 'utf8');
    } catch (error) {
        const response = await fetch(`https://api.iconify.design/${icon}.svg`);
        iconSvgContent = await response.text();
        if (iconSvgContent) {

            iconSvgContent = `
            <g transform="translate(-10, 50) scale(25)">
            ${iconSvgContent}}
            </g>
            `
        } else {
            iconSvgContent = icon.replace(/^\s*(?:<\?xml[^>]*>|<!--[^>]*-->)*\s*/, '')
            iconSvgContent = generateSvgString({width: 12, height: 12, icon: {path: iconSvgContent}})
            
            iconSvgContent = `
            <g transform="translate(-10, 60) scale(25)">
            ${iconSvgContent}}
            </g>
            `

        }
    }
    iconSvgContent = fillSvgColor(iconSvgContent, "#322A5E");
    return `
<svg width="288" height="432" viewBox="0 0 288 432" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_5_4)">
<rect width="288" height="432" fill="#0C0B18"/>
<rect width="288" height="432" fill="url(#paint0_radial_5_4)"/>
<g style="mix-blend-mode:overlay" filter="url(#filter0_f_5_4)">
<ellipse cx="143.611" cy="221.887" rx="33.6187" ry="26.8949" fill="white" style="mix-blend-mode:overlay"/>
</g>
<rect x="124.28" y="209.28" width="38.6615" height="38.6615" rx="5.32296" fill="url(#paint1_linear_5_4)"/>
<rect x="124.28" y="209.28" width="38.6615" height="38.6615" rx="5.32296" stroke="white" stroke-width="0.560311" style="mix-blend-mode:soft-light"/>
    <g transform="translate(129, 207) scale(0.1)">
        ${iconSvgContent}
    </g>

<path d="M146.481 365.182L145.746 366.769H143.839L141.351 372.206H139.239L142.482 365.182H146.481Z" fill="white"/>
<path d="M147.338 365.182L146.599 366.769H148.36L149.091 365.182H147.338Z" fill="white"/>
<path d="M154.081 363.048C153.96 362.554 153.71 361.846 152.571 361.419C151.804 361.131 150.924 361.003 148.719 361.003H136.641L135.829 362.707H149.47C150.373 362.707 151.143 362.716 151.547 362.881C152.31 363.192 152.274 363.792 152.209 364.053C152.087 364.537 151.474 365.182 150.712 365.182H149.993L149.241 366.769H150.556C151.463 366.769 152.014 366.589 152.542 366.275C153.618 365.635 154.374 364.265 154.078 363.048H154.081Z" fill="white"/>
<path d="M133.812 361L133.001 362.694L134.85 362.708L135.636 361.012L133.812 361Z" fill="white"/>
<path d="M146.481 365.182L145.746 366.769H146.599L147.338 365.182H146.481Z" fill="white"/>
<path d="M149.091 365.182L148.36 366.769L149.241 366.769L149.993 365.182L149.091 365.182Z" fill="white"/>
<text fill="#C8C3E6" xml:space="preserve" style="white-space: pre" font-family="Gilroy" font-size="7.28405" letter-spacing="-0.03em"><tspan x="55.8943" y="385.71">Discover the secrets behind your Pictosso and start your </tspan><tspan x="87.0101" y="394.71">next chapter by visiting our website.</tspan></text>
<text fill="#73E8FF" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="7.84436" font-weight="bold" letter-spacing="-0.03em"><tspan x="108.429" y="405.919">www.pictosso.com</tspan></text>
<text fill="#D2B2FF" xml:space="preserve" style="white-space: pre" font-family="Gilroy" font-size="6.72373" letter-spacing="0.35em"><tspan x="100.713" y="93.2135">WELCOME TO THE</tspan></text>
<text fill="#FFB8EA" xml:space="preserve" style="white-space: pre" font-family="Gilroy" font-size="14.5681" font-weight="bold" letter-spacing="-0.03em"><tspan x="89.4787" y="109.314">World of Pictosso</tspan></text>
        <text fill="#C8C3E6" xml:space="preserve" style="white-space: pre" font-family="Gilroy"
            text-anchor="middle"
            font-size="7.28405" letter-spacing="-0.03em"><tspan x="143.5" y="125.422">Thank you for choosing Pictosso to capture your most cherished </tspan><tspan x="143.5" y="134.422">moments. This timeless creation is a secret, coded testament to your life's </tspan><tspan x="143.5" y="143.422">journey, meant to be passed down from generation to generation.lt </tspan><tspan x="143.5" y="152.422">represents a special chapter of your life from ${startDate} to ${endDate}, </tspan><tspan x="143.5" y="161.422">containing ${numberIcons} icons that mark the ${periodType} between these dates.</tspan><tspan x="143.5" y="170.422">Each icon is a symbol of the moments and milestones that </tspan><tspan x="143.5" y="179.422">have defined this period</tspan></text>

<g filter="url(#filter1_d_5_4)">
<mask id="path-10-inside-1_5_4" fill="white">
<path d="M-1 -1.09246e-05H289.241V64.9027H-1V-1.09246e-05Z"/>
</mask>
<path d="M-1 -1.09246e-05H289.241V64.9027H-1V-1.09246e-05Z" fill="white" fill-opacity="0.07" style="mix-blend-mode:overlay" shape-rendering="crispEdges"/>
<path d="M289.241 64.6226H-1V65.1829H289.241V64.6226Z" fill="white" fill-opacity="0.25" style="mix-blend-mode:overlay" mask="url(#path-10-inside-1_5_4)"/>
</g>
<rect x="106.486" y="64.3424" width="75.0817" height="0.280156" fill="#D2B2FF"/>
<path d="M113.115 25.9685L111.416 29.6212H107.001L101.243 42.1335H96.3551L103.86 25.9685H113.115Z" fill="white"/>
<path d="M115.1 25.9685L113.389 29.6212H117.466L119.158 25.9685H115.1Z" fill="white"/>
<path d="M130.705 21.0571C130.426 19.9191 129.848 18.2906 127.21 17.3067C125.435 16.644 123.4 16.3512 118.295 16.3512H90.3413L88.4632 20.2711H120.034C122.124 20.2711 123.906 20.2916 124.841 20.6718C126.608 21.3885 126.523 22.7679 126.373 23.3689C126.091 24.4838 124.673 25.9685 122.909 25.9685H121.245L119.504 29.6212H122.547C124.647 29.6212 125.921 29.2051 127.143 28.4833C129.633 27.0114 131.385 23.857 130.7 21.0571H130.705Z" fill="white"/>
<path d="M203.187 30.9261L201.702 34.1422H205.35L206.807 30.9261H203.187Z" fill="white"/>
<path d="M83.7952 16.3435L81.9171 20.2428L86.1977 20.2736L88.0163 16.3717L83.7952 16.3435Z" fill="white"/>
<path d="M201.061 30.9107H185.518C183.712 30.9107 182.374 31.5812 180.617 32.7191C178.517 34.0805 176.6 35.2596 176.6 35.2596C176.6 35.2596 176.287 34.4684 174.789 32.9863C173.95 32.154 171.263 30.1401 171.263 30.1401L164.159 35.8144C164.159 35.8144 164.089 34.7202 162.831 33.2791C161.86 32.1668 159.886 30.7284 159.116 30.2197C158.848 30.343 152.229 33.3356 152.229 33.3356C152.229 33.3356 150.713 30.9133 147.796 30.9133C144.88 30.9133 143.309 32.2927 142.302 33.7517C141.284 35.2211 141.423 36.8419 141.423 36.8419C141.423 36.8419 139.933 37.8797 138.644 37.8797C137.949 37.8797 137.453 37.2966 137.417 36.8008C137.362 36.0687 137.845 35.1414 137.959 34.8974C138.987 32.6677 140.558 29.6084 140.558 29.6084H148.961L146.355 26.0892H141.844L140.325 21.5503L138.189 26.0892H131.416L129.773 29.6084H136.569L133.88 34.62C133.88 34.62 129.483 38.4936 126.06 38.4936C124.123 38.4936 123.712 37.0089 123.704 36.5748C123.699 36.1869 123.795 35.7913 123.973 35.4625C124.384 34.7124 125.322 34.1602 126.179 34.1602C127.897 34.1602 128.362 35.4599 128.362 35.4599C128.362 35.4599 130.173 34.0292 130.904 33.2791C129.736 31.7558 127.628 30.5151 124.727 31.1265C120.266 32.0667 119.682 35.9942 119.682 35.9942C119.682 35.9942 116.321 38.4371 114.831 38.4371C113.875 38.4371 113.88 37.3403 114.043 36.8316C114.575 35.1543 116.51 31.6736 116.51 31.6736L112.41 31.648C112.41 31.648 110.085 36.1818 109.739 38.1468C109.23 41.0341 111.411 42.1335 113.214 42.1335C116.432 42.1335 120.124 39.2206 120.124 39.2206C120.124 39.2206 121.147 42.2671 125.57 42.2671C129.599 42.2671 133.162 39.0459 133.162 39.0459C133.162 39.0459 133.518 42.095 136.505 42.095C139.24 42.095 142.196 39.9527 142.196 39.9527C142.196 39.9527 143.766 42.2517 146.641 42.2517C149.119 42.2517 150.529 41.2678 151.516 40.2326C153.182 38.4859 153.198 36.3307 153.198 36.3307L158.481 33.8057C158.481 33.8057 159.661 34.5147 160.206 35.3932C160.826 36.3924 160.594 38.432 158.45 38.432C157.251 38.432 156.538 37.3659 156.538 37.3659L153.694 39.7523C153.694 39.7523 155.215 42.1592 158.06 42.1592C161.201 42.1592 162.351 40.993 163.8 40.0015C166.045 38.4654 170.979 34.1653 170.979 34.1653C170.979 34.1653 172.257 35.1363 172.702 35.6475C173.076 36.079 173.231 36.5696 173.216 37.0089C173.203 37.3403 172.772 38.5912 171.139 38.5912C170.049 38.5912 169.204 37.6408 169.204 37.6408C169.204 37.6408 167.073 39.3567 166.153 40.1813C167.323 41.5632 169.214 42.1669 170.986 42.1669C175.949 42.1669 177.168 38.5912 177.168 38.5912L179.323 37.2067C179.715 39.9218 181.537 42.1181 184.944 42.1181C188.142 42.1181 190.857 39.5828 190.857 36.4977C190.857 35.7143 190.715 34.8229 190.413 34.1448C192.275 34.1165 199.506 34.1448 199.506 34.1448L201.064 30.9133L201.061 30.9107ZM149.413 36.8111C149.08 37.9567 147.881 38.6169 146.74 38.2881C145.598 37.9593 144.944 36.7623 145.278 35.6166C145.611 34.471 146.809 33.8108 147.951 34.1396C149.093 34.4684 149.747 35.6654 149.413 36.8111ZM187.173 36.9472C186.838 38.0929 185.641 38.7556 184.5 38.4243C183.358 38.0955 182.702 36.8984 183.038 35.7528C183.373 34.6071 184.569 33.9444 185.711 34.2758C186.853 34.6046 187.509 35.8016 187.173 36.9472Z" fill="white"/>
<path d="M122.149 49.4723L121.847 50.2532H120.638L122.578 45.6835H123.666L125.601 50.2532H124.392L124.082 49.4723H122.147H122.149ZM123.115 47.0012L122.524 48.5116H123.707L123.115 47.0012Z" fill="white"/>
<path d="M129.039 47.3223C129.295 47.5895 129.421 47.9491 129.421 48.4038V50.2532H128.334V48.5759C128.334 48.1289 128.111 47.8951 127.737 47.8951C127.528 47.8951 127.334 48.003 127.145 48.2162V50.2532H126.05V47.0141H127.145V47.2273C127.422 47.0192 127.716 46.9139 128.039 46.9139C128.45 46.9139 128.786 47.0475 129.041 47.3223H129.039Z" fill="white"/>
<path d="M135.298 50.2558H134.21V50.076C133.95 50.243 133.652 50.3226 133.317 50.3226C132.872 50.3226 132.49 50.1633 132.175 49.8345C131.86 49.5083 131.697 49.1076 131.697 48.6324C131.697 48.1572 131.857 47.7564 132.175 47.4302C132.49 47.104 132.872 46.9422 133.317 46.9422C133.652 46.9422 133.947 47.0218 134.21 47.1887V47.0141H135.298V50.2532V50.2558ZM134.21 49.1333V48.1238C134.03 47.9234 133.8 47.8232 133.539 47.8232C133.102 47.8232 132.766 48.1777 132.766 48.6324C132.766 49.087 133.102 49.4338 133.539 49.4338C133.807 49.4338 134.03 49.3336 134.21 49.1333Z" fill="white"/>
<path d="M138.254 47.9902C137.763 48.0107 137.393 48.1443 137.132 48.3986V50.2558H136.037V47.0166H137.132V47.3634C137.448 47.0963 137.817 46.9627 138.254 46.9627V47.9902Z" fill="white"/>
<path d="M141.405 50.1942C141.062 50.3021 140.733 50.3534 140.418 50.3534C140.023 50.3534 139.7 50.2199 139.465 49.9604C139.222 49.6933 139.109 49.3388 139.109 48.9047V47.944H138.471V47.0166H139.109V45.9147H140.196V47.0166H141.304V47.944H140.196V48.8713C140.196 49.1975 140.364 49.3593 140.708 49.3593C140.816 49.3593 141.01 49.3336 141.286 49.2797L141.408 50.1942H141.405Z" fill="white"/>
<path d="M145.952 48.9252H146.98C146.939 49.3388 146.765 49.6804 146.45 49.9399C146.14 50.1993 145.758 50.3277 145.309 50.3277C144.797 50.3277 144.376 50.1736 144.032 49.8525C143.697 49.5391 143.529 49.1256 143.529 48.6298C143.529 48.134 143.697 47.7359 144.032 47.4199C144.376 47.0988 144.797 46.9396 145.309 46.9396C145.758 46.9396 146.14 47.0732 146.45 47.3326C146.765 47.592 146.941 47.926 146.98 48.3421H145.952C145.898 48.0493 145.642 47.854 145.314 47.854C144.856 47.854 144.567 48.1751 144.567 48.6298C144.567 49.0845 144.856 49.4107 145.314 49.4107C145.642 49.4107 145.898 49.218 145.952 48.9226V48.9252Z" fill="white"/>
<path d="M150.457 47.4225C150.785 47.7359 150.953 48.1443 150.953 48.6324C150.953 49.1204 150.785 49.5417 150.457 49.8679C150.129 50.1942 149.705 50.356 149.194 50.356C148.682 50.356 148.253 50.1967 147.917 49.8679C147.589 49.5417 147.421 49.1256 147.421 48.6324C147.421 48.1392 147.589 47.7385 147.917 47.4225C148.253 47.1014 148.677 46.9422 149.194 46.9422C149.71 46.9422 150.126 47.1014 150.457 47.4225ZM149.927 48.6375C149.927 48.2111 149.625 47.8772 149.196 47.8772C148.767 47.8772 148.457 48.2111 148.457 48.6375C148.457 49.0639 148.76 49.4184 149.196 49.4184C149.633 49.4184 149.927 49.0845 149.927 48.6375Z" fill="white"/>
<path d="M156.522 47.3223C156.77 47.5895 156.9 47.9491 156.9 48.4038V50.2532H155.812V48.5759C155.812 48.1212 155.598 47.8951 155.228 47.8951C155.047 47.8951 154.879 47.9825 154.732 48.1623C154.74 48.2702 154.745 48.3498 154.745 48.4038V50.2532H153.658V48.5759C153.658 48.1212 153.443 47.8951 153.074 47.8951C152.893 47.8951 152.73 47.9876 152.591 48.1751V50.2532H151.495V47.0141H152.591V47.2016C152.813 47.0089 153.074 46.9139 153.389 46.9139C153.805 46.9139 154.141 47.0603 154.396 47.3557C154.724 47.0629 155.109 46.9139 155.551 46.9139C155.946 46.9139 156.277 47.0475 156.525 47.3223H156.522Z" fill="white"/>
<path d="M160.741 47.4302C161.056 47.7564 161.219 48.1572 161.219 48.6324C161.219 49.1076 161.059 49.5083 160.741 49.8345C160.426 50.1608 160.044 50.3226 159.599 50.3226C159.271 50.3226 158.974 50.243 158.713 50.0811V51.7585H157.618V47.0166H158.713V47.1836C158.974 47.0243 159.271 46.9422 159.599 46.9422C160.044 46.9422 160.426 47.1014 160.741 47.4302ZM160.15 48.6324C160.15 48.1777 159.821 47.8232 159.385 47.8232C159.116 47.8232 158.894 47.9234 158.713 48.1238V49.1384C158.889 49.3311 159.108 49.4312 159.385 49.4312C159.821 49.4312 160.15 49.0845 160.15 48.6298V48.6324Z" fill="white"/>
<path d="M165.262 50.2558H164.174V50.076C163.913 50.243 163.616 50.3226 163.28 50.3226C162.836 50.3226 162.454 50.1633 162.139 49.8345C161.823 49.5083 161.661 49.1076 161.661 48.6324C161.661 48.1572 161.821 47.7564 162.139 47.4302C162.454 47.104 162.836 46.9422 163.28 46.9422C163.616 46.9422 163.911 47.0218 164.174 47.1887V47.0141H165.262V50.2532V50.2558ZM164.174 49.1333V48.1238C163.993 47.9234 163.763 47.8232 163.503 47.8232C163.066 47.8232 162.73 48.1777 162.73 48.6324C162.73 49.087 163.066 49.4338 163.503 49.4338C163.771 49.4338 163.993 49.3336 164.174 49.1333Z" fill="white"/>
<path d="M168.989 47.3223C169.245 47.5895 169.372 47.9491 169.372 48.4038V50.2532H168.284V48.5759C168.284 48.1289 168.062 47.8952 167.687 47.8952C167.478 47.8952 167.284 48.003 167.096 48.2162V50.2532H166V47.0141H167.096V47.2273C167.372 47.0192 167.667 46.9139 167.99 46.9139C168.4 46.9139 168.736 47.0475 168.992 47.3223H168.989Z" fill="white"/>
<path d="M171.71 51.7508H170.56L171.178 50.2943L169.633 47.0141H170.782L171.723 49.01L172.57 47.0141H173.712L171.71 51.7482V51.7508Z" fill="white"/>
<text fill="#FFB8EA" xml:space="preserve" style="white-space: pre" font-family="Gilroy" font-size="14.5681" font-weight="bold" letter-spacing="-0.03em"><tspan x="67.9844" y="288.198">Your Journey Continues</tspan></text>
<text fill="#C8C3E6" xml:space="preserve" style="white-space: pre" font-family="Gilroy" font-size="7.28405" letter-spacing="-0.03em">
    <tspan x="28.5559" y="304.305">Now, a new chapter begins. A blank canvas awaits, ready to be filled with</tspan>
    <tspan x="41.9664" y="313.305">icons of your dreams, adventures, achievements, and milestones.</tspan>
    <tspan x="28.215" y="322.305">Embrace the infinite possibilities ahead and let the stories you create next</tspan>
    <tspan x="66.8307" y="331.305">be written with love and lived with boundless fun.</tspan>
</text>
</g>
<defs>
<filter id="filter0_f_5_4" x="76.3735" y="161.374" width="134.475" height="121.027" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="16.8093" result="effect1_foregroundBlur_5_4"/>
</filter>
<filter id="filter1_d_5_4" x="-2.65467" y="-1.10312" width="293.551" height="68.2121" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="0.551556"/>
<feGaussianBlur stdDeviation="0.827335"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
<feBlend mode="overlay" in2="BackgroundImageFix" result="effect1_dropShadow_5_4"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5_4" result="shape"/>
</filter>
<radialGradient id="paint0_radial_5_4" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(428.175 -297.9) rotate(118.31) scale(962.161 830.09)">
<stop stop-color="#5F5499"/>
<stop offset="1" stop-color="#513EB3" stop-opacity="0"/>
</radialGradient>
<linearGradient id="paint1_linear_5_4" x1="143.611" y1="209" x2="143.611" y2="248.222" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="#C9C3E6"/>
</linearGradient>
<clipPath id="clip0_5_4">
<rect width="288" height="432" fill="white"/>
</clipPath>
</defs>
</svg>
`

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

    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const numberIcons = searchParams.get('numberIcons');
    const periodType = searchParams.get('periodType');
    const iconPath = decodeURIComponent(searchParams.get('iconPath') || "");
    if (startDate == null || endDate == null || numberIcons == null || periodType == null || iconPath == null)
        return;


    const svgImage = await buildSvgImage(iconPath, startDate, endDate, numberIcons, periodType)

    const pngBuffer = await sharp(Buffer.from(svgImage))
        .png()
        .resize(1024)
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
