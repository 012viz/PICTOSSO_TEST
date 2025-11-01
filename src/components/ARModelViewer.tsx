"use client"

// import "@google/model-viewer";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import PurpleButton from "./PurpleButton";
import { ModelViewer } from "@/custom";
import { TProduct, TProductDetail } from "@/types";
import { frameTextureUri, selectedProduct, selectedProductDetail } from "@/signals";
import { ProductDetailPicker, ProductSizePicker } from "@/app/project/Checkout/Product";
import dynamic from "next/dynamic";

export async function drawImageOnCanvas(imageBlob: Blob, product: TProduct, productDetail: TProductDetail): Promise<string> {
    const url = URL.createObjectURL(imageBlob);

    const img = new Image();
    img.src = url;

    // Ensure the image is loaded before drawing it on the canvas
    await new Promise<void>((resolve, reject) => {
        img.onload = () => {
            resolve();
        };
        img.onerror = (err) => {
            reject(err);
        };
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas size
    canvas.width = product.frame_width * 50;
    canvas.height = product.frame_height * 50;

    if (!ctx) {
        return "";
    }

    // Calculate the scaling factor to fit the SVG to the canvas
    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;
    const scale = Math.min(scaleX, scaleY);

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas if needed
    ctx.fillStyle = '#FFF'; // Change this to any background color you need
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Save the current context state
    ctx.save();

    // Move the canvas origin to the center of the canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Flip the canvas vertically
    ctx.scale(1, -1);

    // Draw the image with the new origin
    ctx.drawImage(img, -img.width / 2 * scale, -img.height / 2 * scale, img.width * scale, img.height * scale);

    // Restore the context state
    ctx.restore();

    // Revoke the object URL to free up memory
    URL.revokeObjectURL(url);

    return canvas.toDataURL();
}


const scales = {
    "Small": 1,
    "Medium": 1.5,
    "Large": 2

}
const ARModelViewer = (props: { static: boolean, showARMessage?: boolean, downloadButton?: boolean, autoRotate?: boolean }) => {
    // Avoid non-deterministic initial value during SSR/hydration.
    // Initialize to a stable value and set a random key on the client in an effect.
    const [key, setKey] = useState(0)
    const modelRef = useRef<ModelViewer | undefined>();
    const [supportsAR, setSupportsAr] = useState(true);
    const scale = scales[(selectedProduct.value?.name || "Small") as keyof typeof scales]


    useEffect(() => { 
        import('@google/model-viewer').catch(console.error);
        // assign a random key after client mount to avoid SSR/client mismatch
        setKey(Math.random());
    }, []);


    useEffect(() => {
        (async () => {
            if (props.static) return;
            // @ts-ignore
            const _supportsAR = await window.navigator.xr.isSessionSupported("immersive-ar")
            setSupportsAr(_supportsAR);
        })()
    }, [])


    useEffect(() => {
        var mv: ModelViewer | undefined = modelRef.current;
        if (!mv) return;
        // @ts-ignore
        mv.addEventListener('model-visibility', async function (evt) {
            // mv.addEventListener('model-visibility', async function (evt) {
            const modelViewer = evt.target as ModelViewer;
            const materialFront = modelViewer.model.materials[1];
            const materialBack = modelViewer.model.materials[2];
            materialFront.setDoubleSided(true)
            materialBack.setDoubleSided(true)

            setTimeout(async () => {
                if (!frameTextureUri.value) return;

                const texture = await modelViewer.createTexture(frameTextureUri.value);
                if (materialFront.pbrMetallicRoughness["baseColorTexture"])
                    materialFront.pbrMetallicRoughness["baseColorTexture"].setTexture(texture);
                if (materialBack.pbrMetallicRoughness["baseColorTexture"])
                    materialBack.pbrMetallicRoughness["baseColorTexture"].setTexture(texture);
            }, 500)
        })

        // @ts-ignore
        mv.addEventListener('ar-status', async (event: any) => {
            if (event.detail.status === 'session-started') {
                console.log('AR session started');
                if (mv) {
                    const scale = scales[(selectedProduct.value?.name || "Small") as keyof typeof scales]
                    mv.scale = `${scale} ${scale} ${scale}`
                }
                // Add your logic for AR session start here
            } else if (event.detail.status === 'not-presenting') {
                console.log('AR session ended');
                setKey(Math.random())
            }
        });


    }, [modelRef.current, key])

    useLayoutEffect(() => {
        const color = selectedProductDetail.value?.color;
        var mv: ModelViewer | undefined = modelRef.current;
        if (!mv || !mv?.model) return;

        console.log("MVVVV", mv)
        const materialFrame = mv.model.materials[0];
        if (color == "White")
            materialFrame.pbrMetallicRoughness.setBaseColorFactor([0.9, 0.9, 0.9, 1]);
        else if (color == "Black")
            materialFrame.pbrMetallicRoughness.setBaseColorFactor([0, 0, 0, 1]);

    }, [selectedProductDetail.value])


    return (
        <div className="w-full h-full min-h-[20rem]">

            {!supportsAR && props.showARMessage && <p className="mt-8 text-xl text-center"> Votre navigateur ne prend pas en charge la réalité augmentée. <br />
                Pour voir votre produit en réalité augmentée, ouvrez cette page dans <a href="https://www.google.com/intl/fr_fr/chrome/" style={{ color: 'red' }} target="_blank">un navigateur compatible.</a><br />
                (Cette fonctionnalité n'est disponible que sur téléphone ou tablette.)
            </p>}

            {props.downloadButton && <button onClick={() => {
                // @ts-ignore
                const url = modelRef.current.toDataURL();
                const a = document.createElement("a");
                a.href = url;
                a.download = "modelViewer_toDataURL.png";
                a.click();
                URL.revokeObjectURL(url);

            }}>Telecharger</button>}

            <div className="flex w-full h-full flex-col">

                <model-viewer
                    key={key}
                    style={{ display: 'flex', justifyContent: 'space-between', aspectRatio: '1', minHeight: '250px', height: '100%', width: '100%', maxWidth: '100%' }}
                    ref={modelRef}
                    src={"/3d/frame.glb"}
                    xr-environment
                    shadow-intensity="1"
                    {...(props.static ? {} : { "camera-controls": true })}
                    ar-placement={"wall"}
                    interaction-prompt="auto"
                    interaction-prompt-style="wiggle"
                    ar-scale="fixed"
                    camera-target={props.static ? "" : "0m 0.04m 0.02m"}
                    min-camera-orbit={props.static ? "0deg 90deg 0deg" : "-15deg 75deg auto"}
                    max-camera-orbit={props.static ? "0deg 90deg 0deg" : "15deg 105deg auto"}
                    ar
                    // ar-modes="scene-viewer quick-look"
                    ar-modes="webxr"
                >
                    {!props.static &&
                        <div className="flex items-center justify-center" slot="ar-button">
                            <PurpleButton className="absolute top-4">
                                <p>Voir en réalité augmentée</p>
                            </PurpleButton>
                        </div>
                    }
                </model-viewer>
                {!props.static &&
                    <div className="flex flex-col px-4 gap-4">
                        <ProductDetailPicker />
                        <ProductSizePicker />
                    </div>
                }


            </div>

        </div>
    )
}

// export default dynamic(() => Promise.resolve(ARModelViewer), { ssr: false });

export default ARModelViewer;