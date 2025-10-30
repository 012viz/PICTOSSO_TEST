import Footer from "@/components/Footer";
import PageDivider from "@/components/PageDivider";
import PageHeader from "@/components/PageHeader";

const PictossoProject = () => {

    return (
        <div className="w-full h-full bg-[url('/background.svg')] bg-cover">
            <PageHeader />

            <div className="px-8 md:px-8 lg:px-[10%] flex justify-center overflow-auto">
                <div className="flex gap-6 md:gap-8 lg:gap-12 py-8 flex-col w-full max-w-[960px]">
                    <p className="text-4xl md:text-5xl lg:text-[74px] font-bold text-center text-white mt-8 md:mt-12 lg:mt-16">
                        The Pictosso Project
                    </p>

                    <PageDivider />
                    <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative py-2.5">
                        <p className="flex-grow w-full text-2xl md:text-3xl lg:text-[38px] font-bold text-left text-white">
                            Pictosso: Weaving Memories into Art
                        </p>
                    </div>
                    <p className="self-stretch flex-grow-0 flex-shrink-0 text-lg md:text-xl lg:text-2xl font-semibold text-left text-[#b4add9]">
                        In the realm of Pictosso, art becomes a mirror to our soul's journey, reflecting every laugh,
                        every tear, and every triumph through the vibrant language of icons. Inspired by the poetic
                        explorations of time by On Kawara, the meticulous detail of Roman Opałka, and the boundless
                        imagination of Yayoi Kusama, Pictosso is a sanctuary where the essence of human experiences is
                        celebrated. Amidst a world rushing towards the future, Pictosso stands as a testament to the
                        enduring beauty of human life, transforming the stories that make us into an iconic artwork.
                    </p>

                    <div className='relative mt-8 md:mt-10 lg:mt-[10%]'>
                        <img className='absolute w-full lg:w-[120%] lg:-left-[10%] top-0 -translate-y-[33%]' src="/pictosso-project/neon.png" alt="" />


                        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 p-4 md:p-8 lg:p-16 w-[calc(100%-3rem)] md:w-full bg-gradient-to-b from-[#ffffff25] to-[#99999925] m-6 -mt-2 md:mt-0  md:m-0">
                            <p className="text-white flex-grow w-full text-2xl md:text-3xl lg:text-[43px] font-bold text-left">More than Art</p>
                            <p className='text-[#9E8FE5] text-lg md:text-xl lg:text-2xl'>
                                In the intimate dance of light and shadow across the canvas, Pictosso reveals itself to be far more than mere art - it is a living chronicle, a dialogue whispered across the years. Each icon, a tender note in
                                the symphony of your past, invites you to pause and listen, to engage with your memories as though they were old friends recounting tales of days gone by. <br />
                                This is the essence of Pictosso: a narrative vessel that transcends the visual, becoming an interactive companion through which you can explore, reminisce, and celebrate the myriad chapters of your life. It is art that grows with you, art that responds
                                to the quiet introspection of a solitary moment, and art that resonates with the collective joy of shared experiences. With Pictosso, you're not merely observing a representation of your journey; you're
                                engaging in an ongoing conversation with your own history, each glance an opportunity to rediscover and relive the emotions, challenges, and triumphs that are uniquely yours.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 p-4 md:p-8 lg:p-16 w-full">
                        <p className="text-white flex-grow w-full text-2xl md:text-3xl lg:text-[43px] font-bold text-left">The Joy of Discovery</p>
                        <p className='text-[#9E8FE5] text-lg md:text-xl lg:text-2xl'>The true delight of Pictosso lies in its playful nature, a coded masterpiece where the story unravels with each viewer's interaction. It's an invitation to rediscover your own story, to find joy in the memories
                            that have shaped your journey. Every icon on your Pictosso piece is a secret door to the past, waiting for you to unlock it with a smile, a tear, or a moment of reflection. It's this intimate dialogue between the
                            art and its beholder that makes each Pictosso piece a living, breathing entity.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
};

export default PictossoProject;