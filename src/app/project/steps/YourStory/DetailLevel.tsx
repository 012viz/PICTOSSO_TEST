'use client'
import { useState, useEffect, useRef } from 'react';
import { selectedPeriodType } from "@/signals";
import { IPeriodType, PeriodType } from "@/types";
import { capitalized } from "@/utils";

const getPosition = (pt: IPeriodType) => {
    const margin = '0.5rem';
    switch (pt) {
        case PeriodType.DAY:
            return '0%';
        case PeriodType.MONTH:
            return `calc(100% + 2 * ${margin})`;
        case PeriodType.YEAR:
            return `calc(200% + 4 * ${margin})`;
        default:
            return '0%';
    }
};

const margin = '0.5rem';

const DetailLevel = () => {
    const [mounted, setMounted] = useState(false);
    // Initialize with the signal value to prevent hydration mismatch
    const [currentType, setCurrentType] = useState<IPeriodType | null>(null);
    const isInitialMount = useRef(true);

    // Handle initial mount
    useEffect(() => {
        // Set current type from signal on mount to avoid hydration mismatch
        setCurrentType(selectedPeriodType.value);
        setMounted(true);
    }, []);

    // Handle signal updates separately from initial mount
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const unsubscribe = selectedPeriodType.subscribe((value) => {
            if (value !== currentType) {
                // Use requestAnimationFrame to avoid state updates during render
                requestAnimationFrame(() => {
                    setCurrentType(value);
                });
            }
        });
        
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [currentType]);

    // Handle period changes in a safe way
    const handlePeriodChange = (pt: IPeriodType) => {
        if (pt !== currentType) {
            // Use requestAnimationFrame to batch updates
            requestAnimationFrame(() => {
                selectedPeriodType.value = pt;
                setCurrentType(pt);
            });
        }
    };

    // Don't render until mounted and currentType is set
    if (!mounted || !currentType) {
        return (
            <div className="flex flex-col items-center justify-center w-full">
                <p className="mb-4 text-[13px] opacity-60 font-medium text-left self-start text-black">
                    Detail level
                </p>
                <div className="h-16 flex items-center justify-center">
                    <p className="text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <p className="mb-4 text-[13px] opacity-60 font-medium text-left self-start text-black">
                Detail level
            </p>
            <div className="flex flex-col items-center justify-center w-full max-w-[560px] relative">
                <div className="relative w-full max-w-[560px]">
                    <div
                        className="absolute top-0 left-0 h-full w-1/3 rounded-2xl bg-white transition-transform duration-300"
                        style={{
                            transform: `translateX(${getPosition(currentType as IPeriodType)})`,
                            boxShadow: "0px 1px 1px 0 rgba(0,0,0,0.1), 0px 1px 2px 0 rgba(0,0,0,0.15)",
                            margin: `${margin}`,
                            width: `calc(100% / 3 - 2 * ${margin})`,
                            height: `calc(100% - 2 * ${margin})`
                        }}
                    />
                    <div className="cursor-pointer flex justify-between w-full p-2 gap-4 rounded-[20px] bg-black/[0.01] border border-black/[0.07] relative">
                        {[PeriodType.DAY, PeriodType.MONTH, PeriodType.YEAR].map(pt => (
                            <p
                                key={pt}
                                className={`flex-1 h-12 flex items-center justify-center z-10 ${
                                    currentType === pt ? 'font-bold' : ''
                                }`}
                                onClick={() => handlePeriodChange(pt)}
                            >
                                {capitalized(pt)}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailLevel;