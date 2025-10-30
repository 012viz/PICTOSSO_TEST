import Link from "next/link";

const Circle = () => (
    <svg
        width={9}
        height={8}
        viewBox="0 0 9 8"
        fill="#ffffff"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-grow-0 flex-shrink-0"
        preserveAspectRatio="xMidYMid meet"
    >
        <circle
            cx="4.875"
            cy={4}
            r={4}
            fill="white"
            style={{ mixBlendMode: "soft-light" }}
        />
    </svg>
);

const FooterRow2Bg = () => <svg
    className="absolute top-0 left-0 w-full h-full pointer-events-none"
    viewBox="0 0 1920 148"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <mask id="path-1-inside-1_1_264" fill="white">
        <path d="M0 0H1920V148H0V0Z" />
    </mask>
    <path
        d="M0 0H1920V148H0V0Z"
        fill="url(#paint0_linear_1_264)"
        style={{ mixBlendMode: "soft-light" }}
    />
    <path
        d="M0 2H1920V-2H0V2ZM1920 146H0V150H1920V146Z"
        fill="white"
        fillOpacity="0.5"
        style={{ mixBlendMode: "soft-light" }}
        mask="url(#path-1-inside-1_1_264)"
    />
    <defs>
        <linearGradient
            id="paint0_linear_1_264"
            x1="960"
            y1="0"
            x2="960"
            y2="148"
            gradientUnits="userSpaceOnUse"
        >
            <stop stopColor="white" stopOpacity="0.75" />
            <stop offset="1" stopColor="white" stopOpacity="0.25" />
        </linearGradient>
    </defs>
</svg>

const Footer = (props: { hideActionCall?: boolean }) => {
    return (
        <div className={`w-full h-full bg-[url('/footer/bg.svg')] bg-cover flex flex-col justify-center relative ${!props.hideActionCall && 'pt-16 md:pt-32'}`}>
            {!props.hideActionCall && <div className="w-full mb-8 h-56 md:h-96 relative flex flex-col items-center gap-0 md:pt-0 overflow-hidden">
                <img className="h-12 md:h-24" src="/pictosso_art_company.svg" alt="" />
                <Link className="relative w-full flex justify-center" href="/project">
                    <img className="absolute h-48 md:h-72 mt-0" src="/start_now.png" alt="" />
                </Link>
            </div>}

            <div className="w-full bg-[url('/footer/bg2.svg')] bg-cover relative p-8 flex justify-center items-center gap-2 md:gap-4 md:flex-row flex-wrap  ">

                <FooterRow2Bg />
                {/* <div className="w-full relative p-8 flex justify-center items-center gap-2 md:gap-4 bg-[url('/footer/links-bg.svg')] bg-cover md:flex-row flex-wrap  "> */}
                <Link href="/">
                    <p className="text-[20px] md:text-[25px] lg:text-[30px] font-bold text-left text-white">
                        The Art Project
                    </p>
                </Link>
                <Circle />
                <Link href="/our-icons">
                    <p className="text-[20px] md:text-[25px] lg:text-[30px] font-bold text-left text-white">
                        Our Icons
                    </p>
                </Link>
                <Circle />
                <Link href="/the-key">
                    <p className="text-[20px] md:text-[25px] lg:text-[30px] font-bold text-left text-white">
                        The Key
                    </p>
                </Link>
                <Circle />
                <Link href="/inspiration">
                    <p className="text-[20px] md:text-[25px] lg:text-[30px] font-bold text-left text-white">
                        Inspiration
                    </p>
                </Link>
                <Circle />
                <Link href="/faq">
                    <p className="text-[20px] md:text-[25px] lg:text-[30px] font-bold text-left text-white">
                        FAQ
                    </p>
                </Link>
                <Circle />
                <Link href="/get-in-touch">
                    <p className="text-[20px] md:text-[25px] lg:text-[30px] font-bold text-left text-white">
                        Contact Us
                    </p>
                </Link>
            </div>

            <div className="w-full relative py-8 flex flex-col justify-center items-center gap-4 md:flex-row md:gap-8">
                {/* <Link href="/cookies">
                    <p className="text-base md:text-xl font-black text-left uppercase text-[#887dd1]">
                        COOKIE SETTINGS
                    </p>
                </Link> */}
                <Link href="/general-terms">
                    <p className="text-base md:text-xl font-black text-left uppercase text-[#887dd1]">
                        GENERAL TERMS
                    </p>
                </Link>
                <Link href="/privacy-center">
                    <p className="text-base md:text-xl font-black text-left uppercase text-[#887dd1]">
                        PRIVACY CENTER
                    </p>
                </Link>
            </div>

            <svg
                className="w-96 self-center max-w-full"
                height="2"
                viewBox="0 0 420 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 1H420"
                    stroke="white"
                    strokeWidth="2"
                    style={{ mixBlendMode: "soft-light" }}
                />
            </svg>

            <div className="w-full relative py-8 flex flex-col justify-center items-center gap-2 md:flex-row">
                <p className="text-base font-black text-center uppercase text-[#42387d]">
                    @2024 PICTOSSO
                </p>
                <svg
                    width="4"
                    height="5"
                    viewBox="0 0 4 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="2" cy="2.5" r="2" fill="#42387D" />
                </svg>
                <p className="text-base font-black text-center uppercase text-[#42387d]">
                    ALL RIGHTS RESERVED
                </p>
            </div>
        </div>
    );
};

export default Footer;
