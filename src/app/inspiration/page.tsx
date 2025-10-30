"use client"
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { SvgRenderer } from "@/components/SvgRenderer";
import { restoreTemplate, template1, template2, template3 } from "./templates";
import { useRouter } from "next/navigation";
import { IIcon, ILifeEvent } from "@/types";
import { useEffect } from "react";
import { fbq } from "../lib/fbq";

const IconLine: React.FC<{ icon: IIcon, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="flex flex-row items-center gap-4">
    <SvgRenderer icon={icon} fillColor={icon.color} width={20} height={20} />
    {/* <SvgRenderer icon={icon} fillColor={"#968fcc"} width={30} height={30} /> */}
    {/* <span className="text-lg md:text-lg font-bold text-left text-[#d2b2ff]">{title}:</span> */}
    <span className="text-lg md:text-lg font-bold text-left text-[#64607c]">—</span>
    <span className="text-lg md:text-lg uppercase font-bold text-left text-white">{desc}</span>
  </div>
);

const Template: React.FC<{ title: string, framePath: string, onClick: Function, icons: { icon: IIcon, title: string, desc: string }[] }> = ({ title, icons, framePath, onClick }) => (
  <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col self-center">
    <div className="relative w-full flex flex-col self-center p-4 pb-12">
      <p className="text-xl md:text-2xl lg:text-[35px] font-bold text-center self-center absolute top-0 text-white transform -translate-y-1/2">{title}</p>

      <svg className="absolute w-[15%] top-0 left-0 z-0" viewBox="0 0 50 342" style={{ mixBlendMode: "overlay" }} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1H0V0H1V1ZM50 2H1V0H50V2ZM2 1V342H0V1H2Z" fill="white" />
      </svg>

      <svg className="absolute w-[15%] top-0 right-0 z-0" viewBox="0 0 50 342" style={{ mixBlendMode: "overlay" }} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M49 1H50V0H49V1ZM0 2H49V0H0V2ZM48 1V342H50V1H48Z" fill="white" />
      </svg>

      <svg className="absolute w-[15%] bottom-0 left-0 z-0" viewBox="0 0 50 310" style={{ mixBlendMode: "overlay" }} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 309H0V310H1V309ZM50 308H1V310H50V308ZM2 309V0H0V309H2Z" fill="white" />
      </svg>

      <svg className="absolute w-[15%] bottom-0 right-0 z-0" viewBox="0 0 50 310" style={{ mixBlendMode: "overlay" }} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M49 309H50V310H49V309ZM0 308H49V310H0V308ZM48 309V0H50V309H48Z" fill="white" />
      </svg>
      <img src={framePath} className="w-full lg:w-[120%] lg:-ml-[10%] mt-6 z-[1]" alt="" />

      <div className="flex flex-col gap-2 mt-6 z-[1]">
        {icons.map(i => <IconLine key={i.title} {...i} />)}
      </div>
      <div className="w-full relative top-12" onClick={() => onClick()}>
        <img src="/pages/templates/start.png" className="absolute cursor-pointer w-full lg:w-[120%] lg:-left-[10%] bottom-0 translate-y-[55%]" alt="" />
      </div>
    </div>
    <div className="w-full flex flex-col self-center">
    </div>
  </div>
);

const t1le = template1.lifeEvents as ILifeEvent[];
const t2le = template2.lifeEvents as ILifeEvent[];
const t3le = template3.lifeEvents as ILifeEvent[];

const HowToRead = () => {
  const router = useRouter()

  useEffect(() => {
    fbq('track', 'ViewContent');
}, [])

  return (
    <div className="w-full h-full bg-[url('/background.svg')] bg-cover">
      <PageHeader />

      <div className="px-4 md:px-8 lg:px-[10%] flex justify-center">
        <div className="flex gap-6 md:gap-8 lg:gap-12 py-8 flex-col w-full max-w-[960px]">
          <p className="text-4xl md:text-5xl lg:text-[74px] font-bold text-center text-white mt-8 md:mt-12 lg:mt-16">
            Templates
          </p>
        </div>
      </div>

      <div className="w-full h-full pb-16 md:pb-24 lg:pb-32 bg-[url('/pages/how-to-read/bg.svg')] bg-cover relative mt-12 md:mt-16 lg:mt-24 flex flex-col items-center">
        <img src="/pages/how-to-read/light.svg" className="max-w-full lg:max-w-[960px] w-full absolute translate -translate-y-1/4 pointer-events-none" alt="" />
        <div className="w-full border-t-4 border-[#3b326d]">
          <div className="w-full max-w-[960px] mx-auto pb-16 md:pb-24 lg:pb-32 flex flex-col md:flex-row gap-40 md:gap-12 lg:gap-20 mt-12 md:mt-16 lg:mt-24 px-[10%] md:px-0 ">
            <Template onClick={() => { restoreTemplate(template1); router.push('/project') }} framePath="/pages/inspiration/template-1.png" title="LOVE" icons={[{ icon: t1le[0].icon, title: "Icon 1", desc: "Dad's birth" }, { icon: t1le[1].icon, title: "Icon 2", desc: "Mom's birth" }, { icon: t1le[2].icon, title: "Icon 3", desc: "Baby's birth" },]} />

            <Template onClick={() => { restoreTemplate(template2); router.push('/project') }} framePath="/pages/inspiration/template-2.png" title="SPORT" icons={[{ icon: t2le[0].icon, title: "Icon 1", desc: "Training begins" }, { icon: t2le[1].icon, title: "Icon 2", desc: "3rd place" }, { icon: t2le[2].icon, title: "Icon 3", desc: "1st place" },]} />

            <Template onClick={() => { restoreTemplate(template3); router.push('/project') }} framePath="/pages/inspiration/template-3.png" title="BUSINESS" icons={[{ icon: t3le[0].icon, title: "Icon 1", desc: "The idea" }, { icon: t3le[1].icon, title: "Icon 2", desc: "Fundraising" }, { icon: t3le[2].icon, title: "Icon 3", desc: "Our first million" },]} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default HowToRead;
