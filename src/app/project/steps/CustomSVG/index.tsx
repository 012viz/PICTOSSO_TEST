"use client"
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { mainIcon } from "@/signals";
import { IIcon } from "@/types";
import { availabelColors, StyledCircle } from "../../utils";
import { useLocalStorage } from "usehooks-ts";
import { SvgRenderer } from "@/components/SvgRenderer";

interface UploadedSVG {
  svg: string;
  name: string;
}

const CustomSVG = (props: { preSelectedIcon?: IIcon; onIconPicked: (icon: IIcon) => void }) => {
  // const [hexColor, setHexColor] = useState(props?.preSelectedIcon?.color || mainIcon.value.color);
  const [selectedIcon, setSelectedIcon] = useState<IIcon | null>(props?.preSelectedIcon || null);
  const [storedSVGs, setStoredSVGs] = useLocalStorage<UploadedSVG[]>('uploadedSVGs', []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      if (file.type === "image/svg+xml" || file.name.endsWith(".svg")) {
        const reader = new FileReader();
        reader.onload = () => {
          const svgContent = reader.result as string;
          const newSVG: UploadedSVG = { svg: svgContent, name: file.name };
          setStoredSVGs(prev => {
            const isDuplicate = prev.some(svg => svg.svg === svgContent);
            if (isDuplicate) return prev;
            return [...prev, newSVG];
          });
        };
        reader.readAsText(file);
      }
    });
  }, [setStoredSVGs]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/svg+xml': ['.svg'] }
  });

  return (
    <div className="px-12 pb-48 flex flex-col h-full overflow-auto">
      {/* <p className="text-xl font-bold text-center md:text-left text-black pt-8 py-4 md:py-12">
        Select color
      </p>
      <div className="flex items-center gap-4">

        <button
          onClick={() => {
            setHexColor('');
            if (selectedIcon) {
              const updatedIcon: IIcon = {
                ...selectedIcon,
                color: '',
              };
              setSelectedIcon(updatedIcon);
              props.onIconPicked(updatedIcon);
            }
          }}
          className="w-8 h-8 min-w-8 min-h-8 rounded-full relative flex items-center justify-center"
        >
          <div className="absolute w-full h-[2px] bg-red-500 rotate-45 transform origin-center"></div>
          <div className="w-full h-full rounded-full border-2 border-gray-400"></div>
        </button>

        <StyledCircle
          hexColor={hexColor}
          className="full-w mt-2 gap-3 justify-between md:justify-normal"
          colors={availabelColors}
          color={hexColor}
          pointProps={{ className: '!w-9 !h-9 !m-0 !rounded-full' }}
          rectProps={{ className: '!rounded-full w-1/2 h-1/2' }}
          onChange={(color) => {
            setHexColor(color.hex);
            if (selectedIcon) {
              const updatedIcon: IIcon = {
                ...selectedIcon,
                color: color.hex,
              };
              setSelectedIcon(updatedIcon);
              props.onIconPicked(updatedIcon);
            }
          }}
        />
      </div> */}

      <p className="text-xl font-bold text-center md:text-left text-black py-4 pt-0 md:py-12">
        Upload SVG
      </p>


      {/* Section d'upload de SVG avec react-dropzone */}
      <div
        {...getRootProps()}
        className={`border-dashed border-2 p-4 cursor-pointer text-center ${isDragActive ? "bg-gray-200" : ""}`}
      >
        <input {...getInputProps()} />
        <p>Drag & Drop SVG file here or click to select</p>
      </div>

      <p className="text-xl font-bold text-center md:text-left text-black py-4 pt-0 md:py-12">
        Select Your SVG
      </p>

      {/* Affichage des SVG uploadés */}
      <div className="flex flex-wrap gap-2 p-[1px] justify-start">
        {storedSVGs.map((svgObj, index) => {
          const id = `custom_svg_${index}`
          const icon: IIcon = {
            id: id,
            size: 1,
            source: "path",
            width: 15,
            height: 15,
            // color: hexColor,
            path: svgObj.svg,
            name: svgObj.name,
          };
          return (
            <div
              key={index}
              className={`cursor-pointer w-14 h-14 flex items-center justify-center rounded-2xl ${selectedIcon?.id == id ? 'shadow-[0_1px_1px_0_rgba(0,0,0,0.8)] bg-gradient-to-r from-[rgba(212,0,255,0.8)] to-[rgba(128,0,255,0.8)]' : 'shadow-[0_1px_1px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.15)]'}`}
            >
              <SvgRenderer
                onClick={() => {
                  setSelectedIcon(icon);
                  props.onIconPicked(icon);
                }}
                key={id}
                icon={icon}
                fillColor={icon.color}
                width={40}
                height={40}
              />
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default CustomSVG;
