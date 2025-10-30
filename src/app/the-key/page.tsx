"use client"
import Footer from "@/components/Footer";
import PageDivider from "@/components/PageDivider";
import PageHeader from "@/components/PageHeader";
import { SvgRenderer } from "@/components/SvgRenderer";
import { endIcon, icons, iconsByKey, startIcon } from "@/icons";
import { useEffect } from "react";
import { fbq } from "../lib/fbq";


const Dot = () => <img className="h-6 self-center md:h-8" src="/Dot.png" alt="" />

const HowToRead = () => {
    useEffect(() => {
        fbq('track', 'ViewContent');
    }, [])

    return (
        <div className="w-full h-full bg-[url('/background.svg')] bg-cover">
            <PageHeader />

            <div className="px-8 md:px-[10%] flex justify-center">
                <div className="flex gap-12 py-8 flex-col w-full max-w-[960px]">
                    <p className="text-[38px] md:text-[74px] font-bold text-center text-white mt-8">
                        How to Read Your Pictosso
                    </p>


                    <PageDivider />
                    <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative py-2.5">
                        <p className="flex-grow w-full text-[24px] md:text-[38px] font-bold text-left text-white">Welcome to Your Story, Visualized</p>
                    </div>
                    <p className="self-stretch flex-grow-0 flex-shrink-0 text-base md:text-2xl font-semibold text-left text-[#b4add9]">
                        Understanding your Pictosso is like reading a book where each icon brings back a story. Your Pictosso artwork is a unique journey through time, captured in a collection of meaningful icons. Each piece begins with a special moment - the start date at the top left corner, marking the
                        beginning of your story. The journey flows across the canvas, culminating in the end date at the bottom right, signifying the moment you've chosen to pause and reflect.
                    </p>



                    <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative py-2.5">
                        <p className="flex-grow w-full text-[24px] md:text-[38px] font-bold text-left text-white">Navigating Through Time</p>
                    </div>
                    <p className="self-stretch flex-grow-0 flex-shrink-0 text-base md:text-2xl font-semibold text-left text-[#b4add9]">
                        As you move your gaze across the artwork, you'll notice that the icons are not just randomly placed - they follow the rhythm of your life. Depending on your preference, each icon can represent a day, a month, or a year, creating a personalized timeline of your existence. This flexibility allows your
                        Pictosso to be as detailed or as broad as your story requires.
                    </p>


                    <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative py-2.5">
                        <p className="flex-grow w-full text-[24px] md:text-[38px] font-bold text-left text-white">A Canvas of Memories</p>
                    </div>
                    <p className="self-stretch flex-grow-0 flex-shrink-0 text-base md:text-2xl font-semibold text-left text-[#b4add9]">
                        But what makes your Pictosso truly yours are the customized icons, each marking a significant life event on a specific date. From the joy of a birth to the celebration of a wedding, from the thrill of a personal achievement to the memory of a shared kiss, every icon is a chapter of your story, waiting to
                        be explored.
                    </p>



                    <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative py-2.5">
                        <p className="flex-grow w-full text-[24px] md:text-[38px] font-bold text-left text-white">The Beginning and Beyond: Understanding <br className="hidden md:block" />Your Pictosso's Journey</p>
                    </div>
                    <p className="self-stretch flex-grow-0 flex-shrink-0 text-base md:text-2xl font-semibold text-left text-[#b4add9]">
                        Every Pictosso narrative is bookended by two profound symbols: a Dot and an Infinity icon. These icons are not just artistic embellishments; they are the silent narrators of your story's continuum.
                    </p>



                    <div className="flex flex-col">
                        <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative py-2.5">
                            <Dot /><p className="flex-grow w-full text-[24px] md:text-[38px] font-bold text-left text-white">The Past Icon : A Prelude to Your Story</p>
                        </div>
                        <img className="h-8 w-fit mb-4" src="/pages/the-key/dot.png" alt="" />
                        <p className="self-stretch flex-grow-0 flex-shrink-0 text-base md:text-2xl font-semibold text-left text-[#b4add9]">
                            This icon represents a dot, much like a period at the end of a sentence. Positioned at the very start, just before the first date icon, the Past icon serves as a poignant reminder: the past is a prologue, immutable and foundational. It symbolizes all that has shaped you before the commencement of your Pictosso's timeline. This singular point underscores the journey's beginning, reminding us that while the past has contributed to our story, it remains unalterable, setting the stage for the narrative that unfolds.
                        </p>
                    </div>



                    <div className="flex flex-col">
                        <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative py-2.5">
                            <Dot /><p className="flex-grow w-full text-[24px] md:text-[38px] font-bold text-left text-white">The Future Icon : A Gateway to Endless Possibilities</p>
                        </div>
                        <img className="h-8 w-fit mb-4" src="/pages/the-key/three_dot.png" alt="" />

                        <p className="self-stretch flex-grow-0 flex-shrink-0 text-base md:text-2xl font-semibold text-left text-[#b4add9]">
                            As your eyes traverse the length of your story, from the first memory to the last marked date, they will meet the Future icon, nestled beyond the concluding date. It's a reminder that the final icon of your Pictosso is not the end of your story but an open door to the future's boundless potential. It's a visual testament to the fact that your story is ongoing, with an infinity of options and pathways lying ahead. The future is unwritten, and only you hold the pen to script the chapters yet to come. Whatever you do, it’s an invitation to embrace the infinite possibilities ahead with love and boundless fun
                        </p>
                        <p className="self-stretch mt-4 flex-grow-0 flex-shrink-0 text-base md:text-2xl font-semibold text-left text-[#99D4FF]">
                            These symbols, the Past and the Future icon, encapsulate the essence of Pictosso: it's a celebration of life's journey, acknowledging where we've been and looking forward to the endless possibilities that await. As you explore your Pictosso, let these icons remind you of your unique narrative's depth and the unwritten future's promise.
                        </p>
                    </div>





                </div>
            </div>


            <div className="w-full h-full pb-32 bg-[url('/pages/how-to-read/bg.svg')] bg-cover relative mt-24 flex flex-col items-center">
                <img src="/pages/how-to-read/light.svg" className="max-w-[960px] w-full absolute translate -translate-y-[20%] pointer-events-none" alt="" />
                <div className="w-full border-t-[1rem] border-[#3b326d] px-[10%] md:px-0">
                    <div className="w-full max-w-[960px] ml-auto pb-24 mr-auto flex gap-12 mt-24 md:flex-row flex-col">

                        <div className="w-full md:w-[calc(50%-40px)] flex flex-col self-center">
                            <img src="/pages/how-to-read/frame-filled.png" className="w-full" alt="" />
                        </div>
                        <div className="relative w-full md:w-[calc(50%+40px)] flex flex-col gap-4 justify-between">
                            <div className="absolute h-[calc(100%+4rem)] border-l-[1px] border-[#322969] z-[1] top-[20px] left-[16px]"></div>
                            <div className="absolute border-t-[1px] border-[#322969] z-[1] left-[15px] transform -translate-x-1/2 w-[200%] bottom-[calc(-4rem-20px)]"></div>
                            <div className="flex w-full z-[2] justify-between gap-12 items-center"><SvgRenderer icon={startIcon} fillColor={"#968fcc"} width={40} height={40} /><p className="w-full text-xl font-bold text-white">A Pictosso starts with the “Past” icon placed at the top left. This simple yet profound symbol represents the immutable past, setting the foundation for the story that unfolds.</p></div>
                            <div className="flex w-full z-[2] justify-between gap-12 items-center"><SvgRenderer icon={iconsByKey['First Kiss']} fillColor={"#968fcc"} width={40} height={40} /><p className="w-full text-xl font-bold text-white">Then comes your first icon and milestone. Here, our chapter starts in August 2012 with the “Kiss” icon, symbolizing the beginning of our love story.</p></div>
                            <div className="flex w-full z-[2] justify-between gap-12 items-center"><SvgRenderer icon={iconsByKey['Love & Life']} fillColor={"#968fcc"} width={40} height={40} /><p className="w-full text-xl font-bold text-white">The next icon represents the following month, September 2012, and so on.</p></div>
                            <div className="flex w-full z-[2] justify-between gap-12 items-center"><SvgRenderer icon={iconsByKey['Birth']} fillColor={"#968fcc"} width={40} height={40} /><p className="w-full text-xl font-bold text-white">The next special icon appears 32 months later, in April 2017, with our “Birth” icon.</p></div>
                            <div className="flex w-full z-[2] justify-between gap-12 items-center"><SvgRenderer icon={iconsByKey['New Home']} fillColor={"#968fcc"} width={40} height={40} /><p className="w-full text-xl font-bold text-white">Finally, 24 months later, in April 2019, a new special milestone appears with our “New Home” icon. This marks the end of our Pictosso chapter.</p></div>
                            <div className="flex w-full z-[2] justify-between gap-12 items-center"><div style={{scale: 2}}><SvgRenderer icon={endIcon} fillColor={"#968fcc"} width={40} height={40} /></div><p className="w-full text-xl font-bold text-white">A Pictosso ends with our “Future” icon, reminding you that it's not the end of your story but the beginning of a new chapter with endless possibilities ahead. Whatever you do, do it with love and fun.</p></div>
                        </div>
                    </div>



                </div>
                <p className="self-center mt-16 text-[38px] md:text-[74px] font-bold text-center text-white">Remember</p>
                <p className="self-center max-w-[766px] text-base md:text-2xl font-semibold text-center text-[#b4add9]">
                    Your Pictosso is more than art-it's a conversation between you and your memories. Take your time
                    to explore, reminisce, and enjoy the journey through your own life, beautifully captured on
                    canvas.
                </p>
            </div>
            <Footer />
        </div>
    )
}
export default HowToRead;
