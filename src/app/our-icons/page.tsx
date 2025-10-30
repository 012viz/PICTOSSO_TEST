"use client"
import Footer from "@/components/Footer";
import PageDivider from "@/components/PageDivider";
import PageHeader from "@/components/PageHeader";
import { SvgRenderer } from "@/components/SvgRenderer";
import { icons, iconsByKey } from "@/icons";
import { IIcon } from "@/types";
import { useEffect, useState } from "@preact-signals/safe-react/react";
import { useMediaQuery } from "usehooks-ts";
import { device } from "../media-queries";
import { fbq } from "../lib/fbq";


const OurIcons = () => {

    const [selectedIcon, setSelectedIcon] = useState<IIcon | null>(icons[0])
    const isMobile = useMediaQuery(device.xs);

    useEffect(() => {
        fbq('track', 'ViewContent');
    }, [])

    return (
        <div className="w-full h-full bg-[url('/background.svg')] bg-cover">
            <PageHeader />

            <div className="px-[10%] md:px-[5%] lg:px-[10%] flex justify-center">
                <div className="flex gap-4 py-8 flex-col w-full max-w-[960px]">
                    <p className="text-[44px] md:text-[54px] lg:text-[74px] font-bold text-left text-white mt-8">
                        Our Icons
                    </p>

                    <PageDivider />

                    <p className="tracking-[0.5rem] text-xl font-black uppercase text-[#d2b2ff] mt-8 md:mt-24">
                        Emojis vs. Art Icons
                    </p>
                    <div className="flex justify-start items-start relative">
                        <p className="w-full text-[28px] md:text-[34px] lg:text-[38px] font-bold text-left text-white">A Familiar Joy and Artistic Depth</p>
                    </div>
                    <p className="text-xl md:text-2xl font-semibold text-left text-[#b4add9]">
                        At Pictosso, we understand the universal appeal of emojis – they're fun, expressive, and a language we all speak fluently. That's why we offer you the choice to weave these familiar symbols into the fabric of yourpersonal artwork. But for those who seek a touch of artistic uniqueness, we've crafted a set of 20 bespoke icons that go beyond the ordinary, each meticulously designed to capture the essence of life's mostsignificantevents.
                    </p>


                    <p className="tracking-[0.5rem] text-xl font-black uppercase text-[#d2b2ff] mt-24">
                        The Pictosso Collection
                    </p>
                    <div className="flex justify-start items-start relative">
                        <p className="w-full text-[28px] md:text-[34px] lg:text-[38px] font-bold text-left text-white">Top 20 Life Events Artfully Encapsulated</p>
                    </div>
                    <p className="text-xl md:text-2xl font-semibold text-left text-[#b4add9]">
                        Our exclusive collection of icons is a celebration of life's milestones – from the flutter of new beginnings to the jubilation of achievements. These aren't just icons; they are miniature masterpieces, each telling a story,each with a soul of its own. Let's take a journey through our gallery, where artistry and life's treasured moments meet:
                    </p>



                </div>
            </div>

            <div className="w-full h-full pb-32 bg-[url('/pages/how-to-read/bg.svg')] bg-cover relative mt-48 flex flex-col items-center px-[10%] md:px-0">
                <img src="/pages/how-to-read/light.svg" className="max-w-[960px] w-full absolute translate -translate-y-[20%] pointer-events-none" alt="" />
                <div className="w-full border-t-[1rem] border-[#3b326d]">
                    <div className="w-full max-w-[960px] ml-auto mr-auto flex flex-row gap-12 mt-24">

                        <div className="flex flex-wrap gap-4 items-center justify-center">
                            {icons.map((icon, i) => {
                                const selected = icon == selectedIcon;
                                return (
                                    <div key={icon.id} onClick={() => setSelectedIcon(icon)} className="cursor-pointer relative flex p-4 outline-black items-center justify-center">
                                        <SvgRenderer icon={icon} width={isMobile ? 30 : 45} height={isMobile ? 30 : 45} fillColor="#ffffff" />
                                        {selected && <svg className="absolute w-full h-full" viewBox="0 0 101 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.5" width="100" height="100" rx="16" fill="url(#paint0_linear_9_6829)"
                                                style={{ mixBlendMode: 'overlay' }} />
                                            <rect x="1.5" y="1" width="98" height="98" rx="15" stroke="white" strokeOpacity="0.25"
                                                strokeWidth="2" style={{ mixBlendMode: 'overlay' }} />
                                            <defs>
                                                <linearGradient id="paint0_linear_9_6829" x1="50.5" y1="0" x2="50.5" y2="100"
                                                    gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="white" stopOpacity="0.25" />
                                                    <stop offset="1" stopColor="white" />
                                                </linearGradient>
                                            </defs>
                                        </svg>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-[960px] flex flex-row mt-0 md:mt-32 px-[10%] md:px-0">
                    <div className="w-1/3 relative flex items-center justify-center">
                        <svg className="h-48" style={{ mixBlendMode: 'overlay' }} viewBox="0 0 241 295" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 294V295H0V294H1ZM2 0V294H0V0H2ZM1 293H241V295H1V293Z" fill="white"
                            />
                        </svg>
                    </div>
                    <div className="w-1/3 relative flex items-center justify-center">
                        {selectedIcon && <SvgRenderer icon={selectedIcon} width={isMobile ? 200 : 200} height={isMobile ? 200 : 200} fillColor="#c06ef1" />}
                        {/* <img className=" pointer-events-none absolute top-[0rem] h-[20rem]" src="/pages/our-icons/heart.svg" alt="" /> */}
                    </div>
                    <div className="w-1/3 relative flex items-center justify-center">
                        <svg className="h-48" style={{ mixBlendMode: 'overlay' }} viewBox="0 0 241 295" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M240 294V295H241V294H240ZM239 0V294H241V0H239ZM240 293H0V295H240V293Z" fill="white"
                            />
                        </svg>
                    </div>
                </div>

                <div className="w-full max-w-[960px] flex flex-col items-center justify-center mt-4">
                    <p className="text-[34px] md:text-[38px] lg:text-[44px] font-bold text-center text-white">{selectedIcon?.name}</p>

                    <p className="mt-4 flex-shrink-0 w-full text-xl md:text-2xl font-semibold text-center text-[#b4add9]">
                        {selectedIcon?.description}
                    </p>

                    <p className="mt-4 flex-shrink-0 w-full text-xl md:text-2xl font-semibold text-center text-[#99D4FF]">
                        {selectedIcon?.usage}
                    </p>

                </div>


            </div>

            <div className="px-[10%] md:px-[5%] lg:px-[10%] border-t-[0.6rem] border-[#322a5e] flex justify-center bg-[url('/pages/our-icons/bottom-bg.svg')] bg-cover">
                <div className="flex gap-4 py-8 flex-col w-full max-w-[960px] border-t-[0.6rem] border-[#8676c5] -mt-[0.6rem]">

                    <p className="tracking-[0.5rem] text-xl font-black uppercase text-[#d2b2ff] mt-24">
                        Behind the Scenes
                    </p>
                    <div className="flex justify-start items-start self-stretch relative">
                        <p className="w-full text-[28px] md:text-[34px] lg:text-[38px] font-bold text-left text-white">Behind the Scenes: The Artistic Journey</p>
                    </div>
                    <p className="self-stretch text-xl md:text-2xl font-semibold text-left text-[#b4add9]">
                        Our icons are born from a canvas of imagination, where each stroke is deliberate and chosen with intention. The artistic process is a thoughtful one, blending modern design with timeless symbolism to createvisuals that resonate. Crafted by our team of artists, each Pictosso icon carries the weight of narrative and the lightness of beauty, ensuring that your life's significant moments are captured with both elegance andclarity.
                    </p>


                    <p className="tracking-[0.5rem] text-xl font-black uppercase text-[#d2b2ff] mt-24">
                        Your Life, Your Story
                    </p>
                    <div className="flex justify-start items-start self-stretch relative">
                        <p className="w-full text-[28px] md:text-[34px] lg:text-[38px] font-bold text-left text-white">Your Life, Your Story, Our Art</p>
                    </div>
                    <p className="self-stretch text-xl md:text-2xl font-semibold text-left text-[#b4add9]">
                        Choosing Pictosso's custom icons means choosing to tell your story with a brush dipped in the ink of innovation and a palette colored by your experiences. Whether you lean towards the playful charm of emojis or the distinctive artistry of our custom set, your Pictosso will stand as a testament to the life lived and the memories cherished
                    </p>


                </div>
            </div>

            <Footer />
        </div>
    )
}
export default OurIcons;
