"use client"
import Footer from "@/components/Footer";
import PageDivider from "@/components/PageDivider";
import PageHeader from "@/components/PageHeader";
import styled from "styled-components";
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { useEffect, useState } from "react";
import { fbq } from "../lib/fbq";


const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // border: `1px solid red`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    // expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  minHeight: '1px',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    margin: 0,
    width: '100%'
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)`
    padding: 2rem;
    borderTop: 1px solid rgba(0, 0, 0, .125);
    .MuiAccordionDetails-root {
        border-top: 0;
    }
    .MuiAccordionSummary-content {
        margin: 0;
    }
`

const FAQItem: React.FC<{
  expanded: boolean;
  handleChange: Function;
  id: string;
  question: string;
  answer: React.ReactNode;
}> = ({ expanded, handleChange, id, question, answer }) => {
  return (
    <Accordion
      className="w-full overflow-hidden rounded-[1.3vw] bg-transparent"
      expanded={expanded}
      onChange={handleChange(id)}
    >
      <AccordionSummary
        className=" w-full overflow-hidden bg-[url('/pages/faq/itembg.svg')] bg-no-repeat bg-contain aspect-[7] px-4 md:px-12 md:p-12"
        style={{ background: expanded ? "white" : "" }}
      >
        <div className="w-full flex justify-between items-center">
          <p
            className="text-[1rem] md:text-[40px] font-bold text-left whitespace-nowrap overflow-hidden overflow-ellipsis"
            style={{ color: expanded ? "#39316a" : "white" }}
          >
            {question}
          </p>
          <svg
            className={`w-6 h-6 md:w-8 md:h-8`}
            style={{
              transition: "0.4s",
              opacity: expanded ? 0.5 : 1,
              transform: `rotate(${expanded ? -180 : 0}deg)`,
            }}
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="49.5"
              y="49.5"
              width="49"
              height="49"
              rx="24.5"
              transform="rotate(180 49.5 49.5)"
              fill={expanded ? "#f4f2fc" : "#3B316B"}
              stroke="#6756B0"
            />
            <rect
              x="45"
              y="45"
              width="40"
              height="40"
              rx="20"
              transform="rotate(180 45 45)"
              fill="url(#paint0_linear_2010_421)"
            />
            <path
              d="M20 22.6362L25 27.6362L30 22.6362"
              stroke="white"
              strokeWidth="3"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2010_421"
                x1="65"
                y1="85"
                x2="65"
                y2="45"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#7C6BD6" />
                <stop offset="1" stopColor="#514496" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </AccordionSummary>
      <AccordionDetails
        className="border-solid bg-[#f4f2fc] md:p-6"
        style={{ borderTop: "2px solid #eae6fa" }}
      >
        <div className="text-[#5E5885] text-lg md:text-2xl font-semibold">
          {answer}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}



const FAQ = () => {

  const [expanded, setExpanded] = useState<string | false>(false);
  
  useEffect(() => {
    fbq('track', 'ViewContent');
  }, [])


  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  return (
    <div className="w-full h-full bg-[url('/background.svg')] bg-cover">
      <PageHeader />

      <div className="px-[10%] h-full transform translate-y-[4rem] md:translate-y-[6rem] z-[999] relative  flex justify-center overflow-auto">
        <div className="flex gap-12 py-8 flex-col pt-16 w-full max-w-[960px]">

          <div className='relative mt-[20%]'>
            <img className='absolute w-[120%] -left-[10%] top-0 -translate-y-[33%]' src="/pictosso-project/neon.png" alt="" />
            <svg className="absolute w-4/5 left-[10%] top-0 -translate-y-[75%]" viewBox="0 0 825 357" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="path-1-inside-1_9_796" fill="white">
                <path d="M199.375 7.72972V87.8182H83.1773V140.593H197.06V220.682H83.1773V331.787H0.311279V7.72972H199.375ZM499.038 331.787H409.69L395.802 285.03H287.937L274.049 331.787H184.239L291.178 7.72972H392.099L499.038 331.787ZM341.638 103.558L309.233 213.738H374.507L341.638 103.558ZM824.256 169.758C824.256 209.108 812.682 243.366 789.535 273.457L818.7 304.936L760.833 356.323L728.89 322.065C705.743 333.176 680.745 338.731 654.357 338.731C606.674 338.731 566.399 322.528 533.53 290.122C500.661 257.254 484.459 217.441 484.459 169.758C484.459 122.076 500.661 82.2629 533.53 49.8572C566.399 16.9885 606.674 0.785645 654.357 0.785645C702.04 0.785645 741.853 16.9885 774.721 49.8572C807.59 82.2629 824.256 122.076 824.256 169.758ZM654.357 257.717C657.598 257.717 662.227 257.254 667.782 256.791L624.266 210.034L682.596 159.111L732.131 211.886C738.612 198.923 741.853 185.035 741.853 169.758C741.853 144.297 733.52 123.002 716.854 106.799C700.188 90.1329 679.356 81.7999 654.357 81.7999C629.358 81.7999 608.526 90.1329 591.86 106.799C575.195 123.002 566.862 144.297 566.862 169.758C566.862 195.22 575.195 216.515 591.86 233.181C608.526 249.384 629.358 257.717 654.357 257.717Z" />
              </mask>
              <path d="M199.375 7.72972V87.8182H83.1773V140.593H197.06V220.682H83.1773V331.787H0.311279V7.72972H199.375ZM499.038 331.787H409.69L395.802 285.03H287.937L274.049 331.787H184.239L291.178 7.72972H392.099L499.038 331.787ZM341.638 103.558L309.233 213.738H374.507L341.638 103.558ZM824.256 169.758C824.256 209.108 812.682 243.366 789.535 273.457L818.7 304.936L760.833 356.323L728.89 322.065C705.743 333.176 680.745 338.731 654.357 338.731C606.674 338.731 566.399 322.528 533.53 290.122C500.661 257.254 484.459 217.441 484.459 169.758C484.459 122.076 500.661 82.2629 533.53 49.8572C566.399 16.9885 606.674 0.785645 654.357 0.785645C702.04 0.785645 741.853 16.9885 774.721 49.8572C807.59 82.2629 824.256 122.076 824.256 169.758ZM654.357 257.717C657.598 257.717 662.227 257.254 667.782 256.791L624.266 210.034L682.596 159.111L732.131 211.886C738.612 198.923 741.853 185.035 741.853 169.758C741.853 144.297 733.52 123.002 716.854 106.799C700.188 90.1329 679.356 81.7999 654.357 81.7999C629.358 81.7999 608.526 90.1329 591.86 106.799C575.195 123.002 566.862 144.297 566.862 169.758C566.862 195.22 575.195 216.515 591.86 233.181C608.526 249.384 629.358 257.717 654.357 257.717Z" fill="url(#paint0_linear_9_796)" style={{ mixBlendMode: 'soft-light' }} />
              <path d="M199.375 7.72972H201.375V5.72972H199.375V7.72972ZM199.375 87.8182V89.8182H201.375V87.8182H199.375ZM83.1773 87.8182V85.8182H81.1773V87.8182H83.1773ZM83.1773 140.593H81.1773V142.593H83.1773V140.593ZM197.06 140.593H199.06V138.593H197.06V140.593ZM197.06 220.682V222.682H199.06V220.682H197.06ZM83.1773 220.682V218.682H81.1773V220.682H83.1773ZM83.1773 331.787V333.787H85.1773V331.787H83.1773ZM0.311279 331.787H-1.68872V333.787H0.311279V331.787ZM0.311279 7.72972V5.72972H-1.68872V7.72972H0.311279ZM499.038 331.787V333.787H501.804L500.937 331.16L499.038 331.787ZM409.69 331.787L407.773 332.356L408.198 333.787H409.69V331.787ZM395.802 285.03L397.719 284.461L397.294 283.03H395.802V285.03ZM287.937 285.03V283.03H286.445L286.02 284.461L287.937 285.03ZM274.049 331.787V333.787H275.542L275.966 332.356L274.049 331.787ZM184.239 331.787L182.34 331.16L181.473 333.787H184.239V331.787ZM291.178 7.72972V5.72972H289.732L289.279 7.10297L291.178 7.72972ZM392.099 7.72972L393.998 7.10297L393.545 5.72972H392.099V7.72972ZM341.638 103.558L343.555 102.986L341.625 96.5163L339.72 102.994L341.638 103.558ZM309.233 213.738L307.314 213.173L306.56 215.738H309.233V213.738ZM374.507 213.738V215.738H377.191L376.423 213.166L374.507 213.738ZM789.535 273.457L787.95 272.237L786.92 273.576L788.068 274.816L789.535 273.457ZM818.7 304.936L820.028 306.432L821.556 305.076L820.168 303.577L818.7 304.936ZM760.833 356.323L759.37 357.687L760.701 359.114L762.161 357.818L760.833 356.323ZM728.89 322.065L730.353 320.701L729.35 319.626L728.025 320.262L728.89 322.065ZM533.53 290.122L532.116 291.537L532.121 291.542L532.126 291.547L533.53 290.122ZM533.53 49.8572L534.934 51.2814L534.939 51.2764L534.944 51.2714L533.53 49.8572ZM774.721 49.8572L773.307 51.2714L773.312 51.2764L773.317 51.2814L774.721 49.8572ZM667.782 256.791L667.948 258.784L672.051 258.442L669.246 255.428L667.782 256.791ZM624.266 210.034L622.951 208.527L621.395 209.885L622.802 211.397L624.266 210.034ZM682.596 159.111L684.055 157.742L682.734 156.335L681.281 157.604L682.596 159.111ZM732.131 211.886L730.673 213.255L732.636 215.347L733.92 212.78L732.131 211.886ZM716.854 106.799L715.44 108.213L715.45 108.223L715.46 108.233L716.854 106.799ZM591.86 106.799L593.255 108.233L593.265 108.223L593.275 108.213L591.86 106.799ZM591.86 233.181L590.446 234.595L590.456 234.605L590.466 234.615L591.86 233.181ZM197.375 7.72972V87.8182H201.375V7.72972H197.375ZM199.375 85.8182H83.1773V89.8182H199.375V85.8182ZM81.1773 87.8182V140.593H85.1773V87.8182H81.1773ZM83.1773 142.593H197.06V138.593H83.1773V142.593ZM195.06 140.593V220.682H199.06V140.593H195.06ZM197.06 218.682H83.1773V222.682H197.06V218.682ZM81.1773 220.682V331.787H85.1773V220.682H81.1773ZM83.1773 329.787H0.311279V333.787H83.1773V329.787ZM2.31128 331.787V7.72972H-1.68872V331.787H2.31128ZM0.311279 9.72972H199.375V5.72972H0.311279V9.72972ZM499.038 329.787H409.69V333.787H499.038V329.787ZM411.608 331.217L397.719 284.461L393.885 285.6L407.773 332.356L411.608 331.217ZM395.802 283.03H287.937V287.03H395.802V283.03ZM286.02 284.461L272.132 331.217L275.966 332.356L289.855 285.6L286.02 284.461ZM274.049 329.787H184.239V333.787H274.049V329.787ZM186.138 332.414L293.077 8.35648L289.279 7.10297L182.34 331.16L186.138 332.414ZM291.178 9.72972H392.099V5.72972H291.178V9.72972ZM390.199 8.35648L497.138 332.414L500.937 331.16L393.998 7.10297L390.199 8.35648ZM339.72 102.994L307.314 213.173L311.151 214.302L343.557 104.122L339.72 102.994ZM309.233 215.738H374.507V211.738H309.233V215.738ZM376.423 213.166L343.555 102.986L339.722 104.13L372.59 214.309L376.423 213.166ZM822.256 169.758C822.256 208.679 810.821 242.505 787.95 272.237L791.121 274.676C814.543 244.226 826.256 209.538 826.256 169.758H822.256ZM788.068 274.816L817.233 306.296L820.168 303.577L791.002 272.097L788.068 274.816ZM817.372 303.441L759.505 354.827L762.161 357.818L820.028 306.432L817.372 303.441ZM762.296 354.959L730.353 320.701L727.427 323.429L759.37 357.687L762.296 354.959ZM728.025 320.262C705.158 331.238 680.456 336.731 654.357 336.731V340.731C681.033 340.731 706.329 335.113 729.756 323.868L728.025 320.262ZM654.357 336.731C607.181 336.731 567.415 320.722 534.934 288.698L532.126 291.547C565.382 324.335 606.168 340.731 654.357 340.731V336.731ZM534.944 288.708C502.462 256.226 486.459 216.927 486.459 169.758H482.459C482.459 217.955 498.861 258.281 532.116 291.537L534.944 288.708ZM486.459 169.758C486.459 122.587 502.464 83.2946 534.934 51.2814L532.126 48.433C498.859 81.2311 482.459 121.564 482.459 169.758H486.459ZM534.944 51.2714C567.422 18.7935 607.182 2.78564 654.357 2.78564V-1.21436C606.167 -1.21436 565.375 15.1836 532.116 48.443L534.944 51.2714ZM654.357 2.78564C701.526 2.78564 740.825 18.7894 773.307 51.2714L776.135 48.443C742.88 15.1876 702.554 -1.21436 654.357 -1.21436V2.78564ZM773.317 51.2814C805.798 83.3046 822.256 122.601 822.256 169.758H826.256C826.256 121.55 809.382 81.2212 776.125 48.433L773.317 51.2814ZM654.357 259.717C657.707 259.717 662.471 259.24 667.948 258.784L667.616 254.798C661.983 255.267 657.488 255.717 654.357 255.717V259.717ZM669.246 255.428L625.73 208.671L622.802 211.397L666.318 258.153L669.246 255.428ZM625.581 211.541L683.912 160.617L681.281 157.604L622.951 208.527L625.581 211.541ZM681.138 160.479L730.673 213.255L733.589 210.517L684.055 157.742L681.138 160.479ZM733.92 212.78C740.545 199.529 743.853 185.334 743.853 169.758H739.853C739.853 184.737 736.679 198.318 730.342 210.991L733.92 212.78ZM743.853 169.758C743.853 143.825 735.348 121.989 718.248 105.365L715.46 108.233C731.692 124.014 739.853 144.768 739.853 169.758H743.853ZM718.268 105.384C701.203 88.3191 679.851 79.7999 654.357 79.7999V83.7999C678.861 83.7999 699.173 91.9467 715.44 108.213L718.268 105.384ZM654.357 79.7999C628.864 79.7999 607.512 88.3191 590.446 105.384L593.275 108.213C609.541 91.9467 629.853 83.7999 654.357 83.7999V79.7999ZM590.466 105.365C573.367 121.989 564.862 143.825 564.862 169.758H568.862C568.862 144.768 577.023 124.014 593.255 108.233L590.466 105.365ZM564.862 169.758C564.862 195.698 573.37 217.519 590.446 234.595L593.275 231.767C577.02 215.512 568.862 194.742 568.862 169.758H564.862ZM590.466 234.615C607.526 251.201 628.867 259.717 654.357 259.717V255.717C629.85 255.717 609.527 247.567 593.255 231.747L590.466 234.615Z" fill="url(#paint1_linear_9_796)" style={{ mixBlendMode: 'soft-light' }} mask="url(#path-1-inside-1_9_796)" />
              <defs>
                <linearGradient id="paint0_linear_9_796" x1="412.283" y1="0.785645" x2="412.283" y2="356.323" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0.15" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint1_linear_9_796" x1="412.283" y1="0.785645" x2="412.283" y2="356.323" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0.25" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>


            <div className="flex flex-col gap-2 p-4 w-full">
              <FAQItem id="1" expanded={expanded == "1"} handleChange={handleChange}
                question="Custom Options & Requests"
                answer={<p>At Pictosso, you can let your creativity shine. If you have a special request or a creative idea, like adding a unique icon or requesting specific sizes? Reach out to us at custom@pictosso.com, and we'll do our best to make your vision come to life.</p>}
              />
              <FAQItem id="2" expanded={expanded == "2"} handleChange={handleChange}
                question="Frame & Paper Details"
                answer={<p>Each Pictosso comes elegantly framed, ready to grace your walls. Our frames, available in black or white, are crafted from solid, untreated oak wood with lightweight, shatterproof acrylic glass. Your Pictosso arrives ready to hang, beautifully placed within the frame. We print on 200g/m² uncoated premium paper with a matte surface, providing a glare-free, luxurious feel. Our paper is also age-resistant, ensuring your Pictosso remains a timeless piece of art.</p>}
              />
              <FAQItem id="3" expanded={expanded == "3"} handleChange={handleChange}
                question="Sizes"
                answer={<>
                  <p>We offer three standard sizes for Pictosso:</p>
                  <ul className=" list-disc p-4 ml-4">
                    <li>Small: 30×40 cm (12x16'')</li>
                    <li>Medium: 40×50 cm (16x20'')</li>
                    <li>Large: 50×70 cm (20x28'')</li>
                  </ul>
                  <p>If you have specific size requests outside of these options, please contact us at custom@pictosso.com and we'll do our best to accommodate your needs.</p>
                </>}
              />
              <FAQItem id="4" expanded={expanded == "4"} handleChange={handleChange}
                question="The Pictosso Signature"
                answer={<p>The Pictosso signature is an integral part of the artwork and cannot be removed. The signature represents the authenticity and artistic integrity of each Pictosso piece. It serves as a mark of quality and a testament to the unique creative process behind every personalized artwork. Just as an artist signs their painting to claim their creation, the Pictosso signature embodies the blend of your personal journey and the artistic craftsmanship that goes into visualizing it. This signature ensures that each piece remains true to its origin and the story it tells.</p>}
              />
              <FAQItem id="5" expanded={expanded == "5"} handleChange={handleChange}
                question="Pictosso Icon and Emoji Copyrights"
                answer={<p>The icons used in Pictosso artworks are proprietary and exclusively owned by Pictosso. These custom-designed icons have had their copyrights fully transferred to Pictosso, ensuring that all personal and professional rights to the icon designs are held by us. Consequently, these proprietary icons cannot be used, modified, altered, replicated, or borrowed for any personal or commercial purposes outside of Pictosso. This protection ensures the uniqueness and artistic integrity of each Pictosso creation, making your artwork truly special and exclusive.
                  .Emojis used within Pictosso artworks are different. They are licensed under the Apache License, Version 2.0, which means they are open source and can be freely used for both personal and commercial purposes. The Apache License allows for reproduction, modification, and distribution of the emojis without any restrictions. This ensures that while Pictosso's custom icons remain exclusive and protected, the use of emojis remains flexible and accessible for various creative and commercial applications.</p>} />

              <FAQItem id="7" expanded={expanded == "7"} handleChange={handleChange}
                question="Worldwide Shipping"
                answer={<p>.We proudly ship Pictosso creations worldwide. Our products are fulfilled in 15 countries: Australia, Brazil, Canada, Denmark, France, Germany, Ireland, Italy, New Zealand, Norway, Singapore, Spain, Sweden, the United Kingdom, and the United States. Our advanced routing algorithm selects the fulfillment country at the time of ordering to ensure the fastest delivery. Typically, products are fulfilled at the closest production center, but occasionally, due to stock availability, orders may be shipped internationally even if a fulfillment center exists within the same country.</p>}
              />

              <FAQItem id="8" expanded={expanded == "8"} handleChange={handleChange}
                question="Delivery Time"
                answer={
                  <ul className=" list-disc p-4 ml-4">
                    <li>
                      For standard shipping, it typically takes 1-2 weeks from the date of order to delivery.
                    </li>
                    <li>
                      Express shipping options are also available for faster delivery. Estimated delivery in 3-5 business days.
                    </li>
                  </ul>
                }
              />

              <FAQItem id="9" expanded={expanded == "9"} handleChange={handleChange}
                question="Tracking Number"
                answer={<p>You can track your order with a tracking link sent to you via email 2 to 3 days after your purchase. As we use third-party providers, this service might slightly differ from one order to another. Some shipping companies may offer scheduling at your convenience, though it can’t be guaranteed by Pictosso. Please note that the tracking information is sent to you by our third-party delivery services.</p>}
              />

              <FAQItem id="10" expanded={expanded == "10"} handleChange={handleChange}
                question="Payment Methods"
                answer={<p>We accept various payment methods including credit/debit cards. All transactions are secure and encrypted.</p>}
              />

              <FAQItem id="11" expanded={expanded == "11"} handleChange={handleChange}
                question="Privacy and Security"
                answer={<p>We take your privacy seriously. All personal information are securely encrypted and used solely for the purpose of creating your Pictosso.</p>}
              />

              <FAQItem id="12" expanded={expanded == "12"} handleChange={handleChange}
                question="Taxes & Customs"
                answer={<p>All final prices include taxes. In some rare cases, the shipping company may ask you to pay customs import fees. If this occurs, please advance the payment and share the receipt/bank statement with our customer care specialist. This way, there will be no further delays, and we’ll be able to refund the entire amount back to you.</p>}
              />

              <FAQItem id="13" expanded={expanded == "13"} handleChange={handleChange}
                question="Order Changes & Cancellations"
                answer={<p>You can modify or cancel your order only before it is printed. We cannot provide a specific timeline before print production begins as it varies for each order and is influenced by multiple factors. Please contact our support team at support@pictosso.com as soon as possible to get an update on your order's printing status. In any case, we will do our best to accommodate your needs and ensure you are 100% happy.</p>}
              />

              <FAQItem id="14" expanded={expanded == "14"} handleChange={handleChange}
                question="Return & Refund"
                answer={<p>Each Pictosso is a unique, personalized piece of art created just for you, so we currently do not support returns. However, your happiness is our priority. If you are not 100% satisfied, please get in touch with us within 30 days of receiving your Pictosso, and we will do everything we can to find a solution. Contact us at support@pictosso.com.</p>}
              />

              <FAQItem id="15" expanded={expanded == "15"} handleChange={handleChange}
                question="Defective or Damaged Products"
                answer={<p>If your Pictosso arrives defective or damaged (not due to the content provided by you), we will cover the cost of a new order. This includes damage to the delivered products, errors in the number or quantity of products, and lack of quality in the delivered product.</p>}
              />

              <FAQItem id="16" expanded={expanded == "16"} handleChange={handleChange}
                question="Customer Support"
                answer={<p>You can reach our customer support team via email at support@pictosso.com. We aim to respond within 24 hours on business days.</p>}
              />
            </div>

          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
};

export default FAQ;