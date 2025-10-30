"use client"

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const IconPickerPortal = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, []);

    const portalElement = document.querySelector("#myportal");
    if (!portalElement) {
        return null;
    }

    return mounted
        ? createPortal(children, portalElement)
        : null;
};

export default IconPickerPortal;
