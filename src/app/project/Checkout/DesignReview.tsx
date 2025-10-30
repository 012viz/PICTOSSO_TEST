import { activeStep, computedProject, endDate, lifeEvents, selectedPeriodType, startDate } from "@/signals";
import { Back, Checkbox, StepTitle } from ".";
import { Steps } from "@/types";
import { useState } from "react";
import { SvgRenderer } from "@/components/SvgRenderer";
import { LifeEvent } from "../steps/LifeEvents";
import PurpleButton from "@/components/PurpleButton";
import { formatDate, handleButtonClick } from "@/utils";
import { getIconCount } from "../ProjectPreview";

const DesignReview = () => {
    // const [textReview, setTextReview] = useState(true);
    // const [timeFrameReview, setTimeFrameReview] = useState(true);
    // const [lifeEventsAndIconsReview, setLifeEventsAndIconsReview] = useState(true);

    return (
        <div className="flex flex-col ">
            <div className="p-8">

                <Back onClick={() => { activeStep.value = Steps.TitleLayout }} />
                <p className="text-[32px] mt-3 font-bold text-left text-black">Checkout</p>
                <StepTitle />
            </div>

            <div className="flex flex-col gap-8 w-full p-8 pt-0">

                {/* <div className="flex justify-start items-center relative cursor-pointer gap-4" onClick={() => setTextReview(!textReview)}> */}
                <div className="flex justify-start items-center relative cursor-pointer gap-4">
                    <Checkbox checked={true} onChange={() => { }} />
                    <div className="flex flex-col justify-start items-start relative">
                        <p className="text-base font-bold text-left text-black">Text Review</p>
                        <p className="text-[13px] text-left text-[#626264]">
                            If any text is included, please double-check for any spelling, orthography, or grammatical
                            errors, to maintain the integrity of your artwork.
                        </p>
                    </div>
                </div>

                {/* <div className="flex justify-start items-center relative cursor-pointer gap-4" onClick={() => setTimeFrameReview(!timeFrameReview)}> */}
                <div className="flex justify-start items-center relative cursor-pointer gap-4">
                    <Checkbox checked={true} onChange={() => { }} />
                    <div className="flex flex-col justify-start items-start relative">
                        <p className="text-base font-bold text-left text-black">Timeframe Review</p>
                        <p className="text-[13px] text-left text-[#626264]">
                            Your artwork features <span className="text-black font-medium">{getIconCount()}</span> icons, each representing a <span className="text-black font-medium">{selectedPeriodType.value.slice(0,-1)}</span> from <span className="text-black font-medium">{formatDate(new Date(startDate.value), selectedPeriodType.value)}</span> to <span className="text-black font-medium">{formatDate(new Date(endDate.value), selectedPeriodType.value)}</span>. Please confirm that these dates accurately reflect the intended timeframe of your story.
                        </p>
                    </div>
                </div>


                {/* <div className="flex justify-start items-center relative cursor-pointer gap-4" onClick={() => setLifeEventsAndIconsReview(!lifeEventsAndIconsReview)}> */}
                <div className="flex justify-start items-center relative cursor-pointer gap-4">
                    <Checkbox checked={true} onChange={() => { }} />
                    <div className="flex flex-col justify-start items-start relative">
                        <p className="text-base font-bold text-left text-black">Life Events and Icons Review</p>
                        <p className="text-[13px] text-left text-[#626264]">
                            Review all life's event dates and corresponding icons for accuracy to ensure your milestones are precisely captured in your artwork.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-0">
                    {lifeEvents.value.map(le => <LifeEvent key={le.id} event={le} showActions={false} />)}
                </div>



            </div>

            <div className="sticky bottom-0 px-12 py-4 flex  flex-col gap-6 backdrop-blur w-full">
                <p className="text-[13px] font-medium text-left bg-gradient-purple text-transparent bg-clip-text">
                    By proceeding with the checkout process, you confirm that all information regarding your artwork
                    is accurate and final. Once the order is placed, changes may not be possible. Thank you for your
                    attention to detail.
                </p>
                <PurpleButton className="flex items-center self-center w-full" onClick={() => {handleButtonClick("project_checkout_1-continue-to-product"); activeStep.value = Steps.Checkout2Product}}>
                    <p className="w-full">Continue to Product</p>
                </PurpleButton>
            </div>

        </div>
    )
}
export default DesignReview;