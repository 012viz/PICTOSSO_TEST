"use client"

import ProjectHeader from "@/components/ProjectHeader";
import ProjectEditor from "./ProjectEditor";
import ProjectPreview from "./ProjectPreview";
import { checkoutSteps, mainSteps } from "./StepPicker";
import { activeStep, mobileMenuOpen, selectedPeriodType, mainIcon, startDate, endDate } from "@/signals";
import Checkout from "./Checkout";
import BottomProjectPreview from "./BottomProjectPreview";
import { getPictoFrameSvgBlob } from "./RenderPictoFrame";
import { useMediaQuery } from "usehooks-ts";
import { device } from "../media-queries";
import { Modal, Box, IconButton } from "@mui/material";
import dynamic from "next/dynamic";

import React from "react";

// Import ProjectChoice component
const ProjectChoice = dynamic(() => import("./ProjectChoice"), { ssr: false });

const Project = () => {
    const isMobile = useMediaQuery(device.xs);
    const [showModal, setShowModal] = React.useState(false);
    const [showProjectChoice, setShowProjectChoice] = React.useState(true);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
        if (isMobile) {
            setShowModal(true);
        }
    }, [isMobile]);

    const handleClose = () => {
        setShowModal(false);
    };

    const handleChoiceComplete = () => {
        // Ensure all required signals are set before proceeding
        console.log('Validating signals before showing editor...');
        console.log('selectedPeriodType:', selectedPeriodType.value);
        console.log('mainIcon:', mainIcon.value);
        console.log('startDate:', startDate.value);
        console.log('endDate:', endDate.value);
        
        // Only proceed if essential signals are set
        if (selectedPeriodType.value && mainIcon.value && startDate.value && endDate.value) {
            setShowProjectChoice(false);
        } else {
            console.error('Missing required signals!');
        }
    };

    if (!mounted) {
        return null;
    }

    // Show project choice screen (manual or AI)
    if (showProjectChoice) {
        return <ProjectChoice onComplete={handleChoiceComplete} />;
    }

    return (
        <>
            <ProjectHeader />
            <BottomProjectPreview />
            <div className="flex-1 flex flex-row h-[calc(100vh-4rem)] ">
                <div className="md:w-3/5 w-full">
                    <ProjectPreview />
                </div>
                <div className={`md:w-2/5 md:relative md:block h-full bg-white w-full overflow-y-auto z-[11] ${mobileMenuOpen.value == true && isMobile ? 'absolute' : 'hidden'}`}>
                    {/* TODO: BUILD ERRORS COMES FROME 2next lines */}
                    {mainSteps.includes(activeStep.value) && <ProjectEditor />}
                    {checkoutSteps.includes(activeStep.value) && <Checkout />}
                </div>
            </div>
            <Modal
                open={showModal}
                onClose={handleClose}
                aria-labelledby="mobile-warning-modal"
                aria-describedby="mobile-warning-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                        }}
                    >
                        <svg className="self-center bg-white" width="24" height="24" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">

                            <rect width="44" height="44" rx="22" fill="black" fillOpacity="0.03" />
                            <rect x="0.5" y="0.5" width="43" height="43" rx="21.5" stroke="black" strokeOpacity="0.07" />
                            <path d="M28 28L16 16" stroke="black" strokeWidth="2" />
                            <path d="M16 28L28 16" stroke="black" strokeWidth="2" />
                        </svg>

                    </IconButton>
                    <p>
                        Enjoy the Studio at its best! <br />
                        We suggest using a laptop or desktop for a smoother and more immersive experience.
                    </p>
                </Box>
            </Modal>
        </>
    )
}

export default Project;