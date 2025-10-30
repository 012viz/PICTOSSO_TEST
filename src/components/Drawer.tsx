"use client"

import { signal } from "@preact/signals-react";
import React, { CSSProperties, useCallback, useEffect, useMemo, useRef } from "react";
import { useIsClient, useOnClickOutside } from "usehooks-ts";
import { useRouter } from 'next/navigation'

const drawerOpen = signal<boolean>(false);

const Drawer: React.FC<{ navHeight: string, buttonStyle?: CSSProperties }> = ({ navHeight, buttonStyle }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const hoverButtonStyle = `text-white transition-colors duration-400 hover:bg-gradient-purple hover:text-transparent hover:bg-clip-text`;
    const menuStyle = useMemo(
        () =>
            `transform ${!drawerOpen.value ? "-translate-x-full" : "translate-x-0"
            } transition duration-400`,
        [drawerOpen.value]
    );

    const handleClickOutside = (event: MouseEvent | TouchEvent | FocusEvent) => {
        if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
            drawerOpen.value = !drawerOpen.value;
        } else {
            drawerOpen.value = false;
        }
    };

    useOnClickOutside(drawerRef, handleClickOutside);

    useEffect(() => {
        const handleButtonClick = (event: MouseEvent) => {
            // event.stopPropagation();
        };

        const buttonEl = buttonRef.current;
        if (buttonEl) {
            buttonEl.addEventListener("click", handleButtonClick);
        }

        return () => {
            if (buttonEl) {
                buttonEl.removeEventListener("click", handleButtonClick);
            }
        };
    }, []);
    const isClient = useIsClient();


    return (
        <div className="flex items-center justify-center h-fit">
            <button style={buttonStyle} ref={buttonRef}>
                {drawerOpen.value ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                )}
            </button>
            <div
                ref={drawerRef}
                style={{ height: `calc(100vh - ${navHeight})`, top: navHeight }}
                className={`${menuStyle} z-[99999999] fixed w-screen md:w-96 left-0 bg-accent text-white overflow-auto`}
            >

                {isClient && window.location.pathname == "/" && <svg
                    onMouseDown={() => { drawerOpen.value = false }}
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 md:hidden absolute top-8 left-8"
                    preserveAspectRatio="none"
                >
                    <path d="M13 13L1 1" stroke="white" strokeWidth={2} />
                    <path d="M1 13L13 1" stroke="white" strokeWidth={2} />
                </svg>}

                <div className="flex flex-col items-center gap-4 justify-center">
                    <a onMouseDown={() => { drawerOpen.value = false; console.log("PUSH"); setTimeout(() => router.push("/"), 400) }} >
                        <img src="/logo.svg" className="h-8 mt-8 mb-8" />
                    </a>
                    <div className=" border-t w-3/5 border-menuBorder transform -skew-y-3"></div>
                    <a onMouseDown={() => { drawerOpen.value = false; console.log("PUSH"); setTimeout(() => router.push("/"), 400) }}
                        className={`${hoverButtonStyle} cursor-pointer text-center text-3xl md:text-xl font-medium`}>
                        HOME
                    </a>

                    <div className=" border-t w-3/5 border-menuBorder transform -skew-y-3"></div>
                    <a onMouseDown={() => { drawerOpen.value = false; console.log("PUSH"); setTimeout(() => router.push("/project"), 400) }}
                        className={`${hoverButtonStyle} cursor-pointer text-center text-3xl md:text-xl font-medium`}>
                        THE STUDIO
                    </a>
                    <div className=" border-t w-3/5 border-menuBorder transform -skew-y-3"></div>
                    <a onMouseDown={() => { drawerOpen.value = false; console.log("PUSH"); setTimeout(() => router.push("/the-art-project"), 400) }}
                        className={`${hoverButtonStyle} cursor-pointer text-center text-3xl md:text-xl font-medium`}>
                        THE ART PROJECT
                    </a>
                    <div className=" border-t w-3/5 border-menuBorder transform -skew-y-3"></div>
                    <a onMouseDown={() => { drawerOpen.value = false; console.log("PUSH"); setTimeout(() => router.push("/our-icons"), 400) }}
                        className={`${hoverButtonStyle} cursor-pointer text-center text-3xl md:text-xl font-medium`}>
                        OUR ICONS
                    </a>
                    <div className=" border-t w-3/5 border-menuBorder transform -skew-y-3"></div>
                    <a onMouseDown={() => { drawerOpen.value = false; console.log("PUSH"); setTimeout(() => router.push("/the-key"), 400) }}
                        className={`${hoverButtonStyle} cursor-pointer text-center text-3xl md:text-xl font-medium`}>
                        THE KEY
                    </a>
                    <div className=" border-t w-3/5 border-menuBorder transform -skew-y-3"></div>
                    <a onMouseDown={() => { drawerOpen.value = false; console.log("PUSH"); setTimeout(() => router.push("/inspiration"), 400) }}
                        className={`${hoverButtonStyle} cursor-pointer text-center text-3xl md:text-xl font-medium`}>
                        INSPIRATION
                    </a>
                    <div className=" border-t w-3/5 border-menuBorder transform -skew-y-3"></div>
                </div>
            </div>
        </div>
    );
};
export default Drawer;
