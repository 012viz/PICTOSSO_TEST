"use client"

import 'react-tooltip/dist/react-tooltip.css'
import StepPicker, { mainSteps } from "./StepPicker";
import YourStory from "./steps/YourStory";
import LifeEvents from "./steps/LifeEvents";
import TitleLayout from "./steps/TitleLayout";
import { activeStep, bottomProjectPreviewOpen, frameTextureUri, mobileMenuOpen, selectedProduct, selectedProductDetail } from "@/signals";
import { Steps } from "@/types";
import { drawImageOnCanvas } from "@/components/ARModelViewer";
import { getPictoFrameSvgBlob } from "./RenderPictoFrame";
import { Tooltip } from 'react-tooltip'
import { useEffect } from '@preact-signals/safe-react/react';
import { fbq } from '../lib/fbq';

export const CloseIconPicker = (props: { className?: string, onClick: () => void }) => {
    return (
        <div onClick={props.onClick} className={`flex flex-col gap-4 p-4 bg-white self-center mt-auto w-[calc(100%-2rem)] absolute bottom-0 ${props.className}`}>
            <div className="absolute left-0 pointer-events-none -top-16 min-h-16 bg-gradient-to-b from-transparent to-white w-full"></div>
            <div className="flex flex-col gap-4 cursor-pointer w-fit self-center">
                <svg className="self-center bg-white" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">

                    <rect width="44" height="44" rx="22" fill="black" fillOpacity="0.03" />
                    <rect x="0.5" y="0.5" width="43" height="43" rx="21.5" stroke="black" strokeOpacity="0.07" />
                    <path d="M28 28L16 16" stroke="black" strokeWidth="2" />
                    <path d="M16 28L28 16" stroke="black" strokeWidth="2" />
                </svg>
                <p className="flex-grow-0 flex-shrink-0 opacity-40 text-xs font-medium text-center text-black">  Close</p>
            </div>
        </div>

    )
}



const steps = [Steps.YourStory, Steps.LifeEvents, Steps.TitleLayout]
const ProjectEditor = () => {
    useEffect(() => {
        fbq('track', 'ViewContent');
    }, [])
    return (
        <>
            <Tooltip id="tooltip" place="bottom" />


            {/* Mobile close menu */}
            <div className="bg-white w-full h-12 min-h-12 relative z-[12] flex md:hidden">
                <div className="flex items-center h-full px-4 gap-4 w-full">

                    {/* close icon */}
                    <div className="flex items-center h-full gap-4 ">

                        <svg
                            onClick={() => mobileMenuOpen.value = false}
                            width={14}
                            height={14}
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3.5 h-3.5"
                            preserveAspectRatio="none"
                        >
                            <path d="M13 13L1 1" stroke="black" strokeWidth={2} />
                            <path d="M1 13L13 1" stroke="black" strokeWidth={2} />
                        </svg>
                        <p className="text-[13px] font-medium text-left text-black/60">
                            Close
                        </p>
                    </div>

                    <svg
                        onClick={async () => {
                            if (!selectedProduct.value || !selectedProductDetail.value) return;
                            frameTextureUri.value = await drawImageOnCanvas(getPictoFrameSvgBlob(), selectedProduct.value, selectedProductDetail.value)
                            bottomProjectPreviewOpen.value = true
                        }}
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 relative ml-auto"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M3.5 11.9999C3.5 11.9999 6.9 5.7666 12 5.7666C17.1 5.7666 20.5 11.9999 20.5 11.9999C20.5 11.9999 17.1 18.2333 12 18.2333C6.9 18.2333 3.5 11.9999 3.5 11.9999Z"
                            stroke="black"
                            strokeWidth={2}
                            strokeMiterlimit={10}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <ellipse
                            cx="12.0001"
                            cy="11.9999"
                            rx="2.5"
                            ry="2.5"
                            stroke="black"
                            strokeWidth="1.76471"
                            strokeMiterlimit={10}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path d="M1 6V3C1 1.89543 1.89543 1 3 1H6" stroke="black" strokeWidth={2} />
                        <path d="M1 18V21C1 22.1046 1.89543 23 3 23H6" stroke="black" strokeWidth={2} />
                        <path d="M23 6V3C23 1.89543 22.1046 1 21 1H18" stroke="black" strokeWidth={2} />
                        <path d="M23 18V21C23 22.1046 22.1046 23 21 23H18" stroke="black" strokeWidth={2} />
                    </svg>
                </div>
            </div>


            <div id="editor" className="md:h-full h-[calc(100%-3rem)] flex flex-col bg-center bg-cover overflow-auto relative" style={{ backgroundImage: "url('/yourStoryBg.svg')" }}>


                <StepPicker z={12} steps={steps} activeStep={activeStep.value} onStepClicked={(step) => { activeStep.value = step }} />
                <div className="flex flex-col md:pt-0 pt-8 overflow-y-auto h-full w-full overflow-x-hidden">
                    {activeStep.value == mainSteps[0] &&
                        <svg className={`hidden md:block py-4 mt-2 h-24 min-h-24 w-[calc(100%/3)] ml-[calc(100%/6)]`} viewBox="0 0 219 64" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <path opacity="0.2" d="M215.5 64L218.387 59H212.613L215.5 64ZM0.5 0V1.71429H1.5V0H0.5ZM0.5 6.28571V9.71429H1.5V6.28571H0.5ZM0.5 14.2857V17.7143H1.5V14.2857H0.5ZM0.5 22.2857V24H1.5V22.2857H0.5ZM0.5 24C0.5 24.4848 0.540646 24.9606 0.618821 25.4239L1.60488 25.2575C1.53595 24.849 1.5 24.4289 1.5 24H0.5ZM2.06742 28.9194C2.62083 29.6979 3.30207 30.3792 4.08064 30.9326L4.66 30.1175C3.97263 29.6289 3.37107 29.0274 2.88249 28.34L2.06742 28.9194ZM7.5761 32.3812C8.03941 32.4594 8.51515 32.5 9 32.5V31.5C8.57113 31.5 8.15104 31.4641 7.74248 31.3951L7.5761 32.3812ZM9 32.5H10.5191V31.5H9V32.5ZM14.5702 32.5H17.6084V31.5H14.5702V32.5ZM21.6594 32.5H24.6977V31.5H21.6594V32.5ZM28.7487 32.5H31.787V31.5H28.7487V32.5ZM35.838 32.5H38.8763V31.5H35.838V32.5ZM42.9273 32.5H45.9656V31.5H42.9273V32.5ZM50.0166 32.5H53.0549V31.5H50.0166V32.5ZM57.1059 32.5H60.1441V31.5H57.1059V32.5ZM64.1952 32.5H67.2334V31.5H64.1952V32.5ZM71.2844 32.5H74.3227V31.5H71.2844V32.5ZM78.3737 32.5H81.412V31.5H78.3737V32.5ZM85.463 32.5H88.5013V31.5H85.463V32.5ZM92.5523 32.5H95.5905V31.5H92.5523V32.5ZM99.6416 32.5H102.68V31.5H99.6416V32.5ZM106.731 32.5H109.769V31.5H106.731V32.5ZM113.82 32.5H116.858V31.5H113.82V32.5ZM120.909 32.5H123.948V31.5H120.909V32.5ZM127.999 32.5H131.037V31.5H127.999V32.5ZM135.088 32.5H138.126V31.5H135.088V32.5ZM142.177 32.5H145.216V31.5H142.177V32.5ZM149.267 32.5H152.305V31.5H149.267V32.5ZM156.356 32.5H159.394V31.5H156.356V32.5ZM163.445 32.5H166.483V31.5H163.445V32.5ZM170.534 32.5H173.573V31.5H170.534V32.5ZM177.624 32.5H180.662V31.5H177.624V32.5ZM184.713 32.5H187.751V31.5H184.713V32.5ZM191.802 32.5H194.841V31.5H191.802V32.5ZM198.892 32.5H201.93V31.5H198.892V32.5ZM205.981 32.5H207.5V31.5H205.981V32.5ZM207.5 32.5C207.929 32.5 208.349 32.5359 208.758 32.6049L208.924 31.6188C208.461 31.5406 207.985 31.5 207.5 31.5V32.5ZM211.84 33.8825C212.527 34.3711 213.129 34.9726 213.618 35.66L214.433 35.0806C213.879 34.3021 213.198 33.6208 212.419 33.0674L211.84 33.8825ZM214.895 38.7425C214.964 39.151 215 39.5711 215 40H216C216 39.5152 215.959 39.0394 215.881 38.5761L214.895 38.7425ZM215 40V41.7143H216V40H215ZM215 46.2857V49.7143H216V46.2857H215ZM215 54.2857V57.7143H216V54.2857H215Z" fill="black" />
                        </svg>

                    }
                    {activeStep.value == mainSteps[1] &&
                        <svg className={`hidden md:block py-2 mt-2 ml-[calc(100%/2)] h-24 min-h-24 w-2 -translate-x-[3px]`} viewBox="0 0 6 64" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <path opacity="0.2" d="M3 64L5.88675 59H0.113249L3 64ZM2.5 0V1.37143H3.5V0H2.5ZM2.5 5.02857V7.77143H3.5V5.02857H2.5ZM2.5 11.4286V14.1714H3.5V11.4286H2.5ZM2.5 17.8286V20.5714H3.5V17.8286H2.5ZM2.5 24.2286V26.9714H3.5V24.2286H2.5ZM2.5 30.6286V32H3.5V30.6286H2.5ZM2.5 32V33.3714H3.5V32H2.5ZM2.5 37.0286V39.7714H3.5V37.0286H2.5ZM2.5 43.4286V46.1714H3.5V43.4286H2.5ZM2.5 49.8286V52.5714H3.5V49.8286H2.5ZM2.5 56.2286V58.9714H3.5V56.2286H2.5Z" fill="black" />
                        </svg>

                    }
                    {activeStep.value == mainSteps[2] &&
                        <svg className={`hidden md:block py-4 mt-2 h-24 min-h-24 w-[calc(100%/3)] ml-[calc(100%/2)]`} viewBox="0 0 219 64" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <path opacity="0.2" d="M3.5 64L6.38675 59H0.613249L3.5 64ZM4 57.7143V54.2857H3V57.7143H4ZM4 49.7143V46.2857H3V49.7143H4ZM4 41.7143V40H3V41.7143H4ZM4 40C4 39.5711 4.03595 39.151 4.10488 38.7425L3.11882 38.5761C3.04065 39.0394 3 39.5152 3 40H4ZM5.38249 35.66C5.87107 34.9726 6.47264 34.3711 7.16 33.8825L6.58064 33.0674C5.80207 33.6208 5.12083 34.3021 4.56742 35.0806L5.38249 35.66ZM10.2425 32.6049C10.651 32.5359 11.0711 32.5 11.5 32.5V31.5C11.0152 31.5 10.5394 31.5406 10.0761 31.6188L10.2425 32.6049ZM11.5 32.5H13.0191V31.5H11.5V32.5ZM17.0702 32.5H20.1084V31.5H17.0702V32.5ZM24.1594 32.5H27.1977V31.5H24.1594V32.5ZM31.2487 32.5H34.287V31.5H31.2487V32.5ZM38.338 32.5H41.3763V31.5H38.338V32.5ZM45.4273 32.5H48.4656V31.5H45.4273V32.5ZM52.5166 32.5H55.5549V31.5H52.5166V32.5ZM59.6059 32.5H62.6441V31.5H59.6059V32.5ZM66.6952 32.5H69.7334V31.5H66.6952V32.5ZM73.7844 32.5H76.8227V31.5H73.7844V32.5ZM80.8737 32.5H83.912V31.5H80.8737V32.5ZM87.963 32.5H91.0013V31.5H87.963V32.5ZM95.0523 32.5H98.0905V31.5H95.0523V32.5ZM102.142 32.5H105.18V31.5H102.142V32.5ZM109.231 32.5H112.269V31.5H109.231V32.5ZM116.32 32.5H119.358V31.5H116.32V32.5ZM123.409 32.5H126.448V31.5H123.409V32.5ZM130.499 32.5H133.537V31.5H130.499V32.5ZM137.588 32.5H140.626V31.5H137.588V32.5ZM144.677 32.5H147.716V31.5H144.677V32.5ZM151.767 32.5H154.805V31.5H151.767V32.5ZM158.856 32.5H161.894V31.5H158.856V32.5ZM165.945 32.5H168.983V31.5H165.945V32.5ZM173.034 32.5H176.073V31.5H173.034V32.5ZM180.124 32.5H183.162V31.5H180.124V32.5ZM187.213 32.5H190.251V31.5H187.213V32.5ZM194.302 32.5H197.341V31.5H194.302V32.5ZM201.392 32.5H204.43V31.5H201.392V32.5ZM208.481 32.5H210V31.5H208.481V32.5ZM210 32.5C210.485 32.5 210.961 32.4594 211.424 32.3812L211.258 31.3951C210.849 31.4641 210.429 31.5 210 31.5V32.5ZM214.919 30.9326C215.698 30.3792 216.379 29.6979 216.933 28.9194L216.118 28.34C215.629 29.0274 215.027 29.6289 214.34 30.1175L214.919 30.9326ZM218.381 25.4239C218.459 24.9606 218.5 24.4848 218.5 24H217.5C217.5 24.4289 217.464 24.849 217.395 25.2575L218.381 25.4239ZM218.5 24V22.2857H217.5V24H218.5ZM218.5 17.7143V14.2857H217.5V17.7143H218.5ZM218.5 9.71428V6.28571H217.5V9.71428H218.5ZM218.5 1.71428V0H217.5V1.71428H218.5Z" fill="black" />
                        </svg>

                    }

                    {mainSteps.includes(activeStep.value) && (
                        <>
                            {activeStep.value == Steps.YourStory && <YourStory />}
                            {activeStep.value == Steps.LifeEvents && <LifeEvents />}
                            {activeStep.value == Steps.TitleLayout && <TitleLayout />}
                        </>
                    )}

                </div>

            </div>
            <div id="myportal" />
        </>
    )
}

export default ProjectEditor;