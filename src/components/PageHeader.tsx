'use client'
import React, { useState } from 'react';
import Drawer from './Drawer';
import Link from 'next/link';
import { useMediaQuery } from 'usehooks-ts';
import { device } from '@/app/media-queries';


const PageHeader = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    const isMobile = useMediaQuery(device.xs);

    return (
        <div className='min-h-16 w-full'>

            <nav className="px-[10%] flex fixed top-0 z-[99999999] w-full items-center justify-between md:justify-start gap-8 h-16 md:h-24" style={{ background: 'linear-gradient(90deg, #241E49, #514591)' }}>
                <Drawer navHeight={isMobile ? '4rem' : '6rem'} />

                <div className="h-full flex items-center mb-[2px] border-b-2 border-[#d2b2ff] absolute left-1/2 transform -translate-x-1/2 md:relative md:left-0 md:translate-x-0">
                    <a href="/" id="">
                        <img src="/pictosso_art_company.svg" className="h-12 hidden md:block" />
                        <img src="/logo.svg" className="h-6 block md:hidden" />
                    </a>
                </div>
                <Link href="/project" className="ml-auto hidden md:flex h-full items-center relative cursor-pointer aspect-[3.5]">
                    <img src="/start_now.png" className="h-48 right-0 pointer-events-none transform translate-x-[15%] translate-y-[3%]" />
                </Link>
                <Link href="/project" className="flex md:hidden items-center h-full">
                    <p className="text-base font-semibold text-center text-white">Order</p>
                </Link>
            </nav>
        </div>
    );
};

export default PageHeader;
