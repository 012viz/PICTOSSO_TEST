"use client";
import Footer from "@/components/Footer";
import PageDivider from "@/components/PageDivider";
import PageHeader from "@/components/PageHeader";

const Cookies = () => {
    return (
        <div className="w-full h-full bg-[url('/background.svg')] bg-cover">
            <PageHeader />

            <div className="px-8 md:px-[10%] flex justify-center">
                <div className="flex gap-12 py-8 flex-col w-full max-w-full pb-48">
                    <p className="text-4xl md:text-[74px] font-bold text-left text-white mt-16">
                        Cookies
                    </p>

                    <PageDivider />

                    <div className="flex align-start relative gap-4">
                        <img
                            className="w-10 h-10 md:w-14 md:h-14 mt-[7px] hidden md:flex"
                            src="/pages/cookies/1.png"
                            alt=""
                        />
                        <p className="flex-grow w-full text-2xl md:text-[38px] leading-8 md:leading-10 font-bold text-left text-white mt-4">
                            What are cookies?
                        </p>
                    </div>
                    <p className="text-lg md:text-2xl font-semibold text-left text-[#b4add9]">
                        Our exclusive collection of icons is a celebration of life's
                        milestones – from the flutter of new beginnings to the jubilation of
                        achievements. These aren't just icons; they are miniature
                        masterpieces, each telling a story,each with a soul of its own.
                        Let's take a journey through our gallery, where artistry and life's
                        treasured moments meet:
                    </p>

                    <div className="flex align-start relative gap-4">
                        <img
                            className="w-10 h-10 md:w-14 md:h-14 mt-[7px] hidden md:flex"
                            src="/pages/cookies/2.png"
                            alt=""
                        />
                        <p className="flex-grow w-full text-2xl md:text-[38px] leading-8 md:leading-10 font-bold text-left text-white mt-4">
                            Lorem ipsum dolor sit amet, ut qui quas dicant convenire, duo ad
                            quem dico dictas?{" "}
                        </p>
                    </div>
                    <p className="text-lg md:text-2xl font-semibold text-left text-[#b4add9]">
                        Purto iriure id eos, omnes percipitur disputando no vix, eos elit
                        philosophia an. Cu velit clita verear est, vis exerci assueverit
                        temporibus in. Virtute meliore incorrupte sit te. Scaevola menandri
                        ad vix, accusam luptatum singulis eam ex, ex nam malis
                        mediocritatem.
                    </p>

                    <div className="flex align-start relative gap-4">
                        <img
                            className="w-10 h-10 md:w-14 md:h-14 mt-[7px] hidden md:flex"
                            src="/pages/cookies/3.png"
                            alt=""
                        />
                        <p className="flex-grow w-full text-2xl md:text-[38px] leading-8 md:leading-10 font-bold text-left text-white mt-4">
                            Dignissim reprimique disputando an me?
                        </p>
                    </div>
                    <p className="text-lg md:text-2xl font-semibold text-left text-[#b4add9]">
                        Mel ne regione fabellas dissentiet. Vim veri voluptatum at, mea id
                        simul nonumy voluptua. Id iusto cotidieque pro, cu facer insolens
                        sea. Ex justo democritum vel, te has erat impetus perfecto, no
                        vocent periculis sed.
                    </p>

                    <p className="text-2xl md:text-[32px] font-bold text-left">
                        <span className="text-2xl md:text-[32px] font-bold text-left text-[#d2b2ff]">
                            3.1.
                        </span>
                        <span className="text-2xl md:text-[32px] font-bold text-left text-white">
                            Dignissim reprimique disputando an me?
                        </span>
                    </p>
                    <p className="text-lg md:text-2xl font-semibold text-left text-[#b4add9]">
                        Our exclusive collection of icons is a celebration of life's
                        milestones – from the flutter of new beginnings to the jubilation of
                        achievements. <br />
                        These aren't just icons; they are miniature masterpieces, each
                        telling a story,each with a soul of its own. Let's take a journey
                        through our gallery, where artistry and life's treasured moments
                        meet: <br />
                        Purto iriure id eos, omnes percipitur disputando no vix, eos elit
                        philosophia an. Cu velit clita verear est, vis exerci assueverit
                        temporibus in. Virtute meliore incorrupte sit te. Scaevola menandri
                        ad vix, accusam luptatum singulis eam ex, ex nam malis
                        mediocritatem.
                    </p>

                    <p className="text-2xl md:text-[32px] font-bold text-left">
                        <span className="text-2xl md:text-[32px] font-bold text-left text-[#d2b2ff]">
                            3.2.
                        </span>
                        <span className="text-2xl md:text-[32px] font-bold text-left text-white">
                            Dignissim reprimique disputando an me?
                        </span>
                    </p>
                    <p className="text-lg md:text-2xl font-semibold text-left text-[#b4add9]">
                        Our exclusive collection of icons is a celebration of life's
                        milestones – from the flutter of new beginnings to the jubilation of
                        achievements. <br />
                        These aren't just icons; they are miniature masterpieces, each
                        telling a story,each with a soul of its own. Let's take a journey
                        through our gallery, where artistry and life's treasured moments
                        meet: <br />
                        Purto iriure id eos, omnes percipitur disputando no vix, eos elit
                        philosophia an. Cu velit clita verear est, vis exerci assueverit
                        temporibus in. Virtute meliore incorrupte sit te. Scaevola menandri
                        ad vix, accusam luptatum singulis eam ex, ex nam malis
                        mediocritatem.
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
};
export default Cookies;
