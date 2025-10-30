import { titles } from '@/signals';
import React, { useState, useRef, useEffect } from 'react';
import { getMaxCharsPerLine } from '../../ProjectPreview';

const TitleEditor = (props: { onTextChange: (title: string) => void, enabled: boolean, placeholder: string, type: "title" | "subtitle", baseStyle?: React.CSSProperties, totalCharLimit?: number, maxLineNumber?: number, scaleOffset?: number }) => {
    const [text, setText] = useState(props.type == "title" ? titles.value.title || "" : titles.value.subtitle || "");
    const [dimensions, setDimensions] = useState({ width: 0, height: 0, scale: 1 });
    const TOTAL_CHAR_LIMIT = props.totalCharLimit || 24;
    const MAX_LINE_NUMBER = props.maxLineNumber || 3;
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const maxCharPerLine = getMaxCharsPerLine(titles.value, props.type);

    const updateDimensions = () => {
        if (containerRef.current && contentRef.current) {
            const containerWidth = containerRef.current.offsetWidth - 32;
            const contentWidth = contentRef.current.scrollWidth;
            const contentHeight = contentRef.current.scrollHeight;

            if (!text.trim()) {
                setDimensions({ width: 0, height: 0, scale: 1 });
                return;
            }

            const scale = Math.min(1, containerWidth / contentWidth);

            setDimensions({
                width: contentWidth,
                height: contentHeight,
                scale: scale + (props.scaleOffset || 0)
            });
        }
    };

    useEffect(() => {
        updateDimensions();
    }, [text]);

    useEffect(() => {
        const handleResize = () => {
            updateDimensions();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.target;
        const newText = textarea.value;
        const cursorPosition = textarea.selectionStart;

        let processedText = newText.toUpperCase();
        let lines = processedText.split('\n');
        let newLines: string[] = [];
        let newCursorPosition = cursorPosition;
        let charactersBeforeCursor = 0;

        // Process each line
        lines.forEach((line, index) => {
            // If the line is longer than maxCharPerLine, split it
            while (line.length > maxCharPerLine) {
                const splitPoint = maxCharPerLine;
                const firstPart = line.slice(0, splitPoint);
                newLines.push(firstPart);
                line = line.slice(splitPoint);

                // Adjust cursor position if it was after the split point
                if (charactersBeforeCursor + splitPoint < cursorPosition) {
                    newCursorPosition += 1; // Add 1 for the new line character
                }
            }
            newLines.push(line);

            // Add length of current line plus newline character
            charactersBeforeCursor += line.length + 1;
        });

        const finalText = newLines.join('\n');
        setText(finalText);
        props.onTextChange(finalText);
        console.log("finalText", `|${finalText}|`)

        // Restore cursor position after state update
        requestAnimationFrame(() => {
            if (textareaRef.current) {
                textareaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
            }
        });
    };

    const renderText = () => {
        if (!text) {
            return (
                <div style={baseStyle} className="line">
                    <span style={baseStyle} className="text-gray-400">{props.placeholder}</span>
                </div>
            );
        }

        const lines = text.split('\n')

        return lines.map((line, index) => (
            <div key={index} style={baseStyle} className="line whitespace-pre">
                {line.split('').length === 0 ? (
                    <span style={baseStyle} className="text-black">{'\u00A0'}</span>
                ) : (
                    line.split('').map((char, charIndex) => {
                        const charPosition = lines.slice(0, index).join('').length + charIndex;
                        const color = charPosition < TOTAL_CHAR_LIMIT - 1 && index < MAX_LINE_NUMBER ? 'text-black' : 'text-red-500';
                        return <span style={baseStyle} key={charIndex} className={color}>{char === ' ' ? '\u00A0' : char}</span>;
                    })
                )}
            </div>
        ));
    };

    const baseStyle: React.CSSProperties = {
        fontFamily: "Roboto",
        fontWeight: 600,
        fontSize: '4rem',
        lineHeight: '4rem',
        textAlign: titles.value.position.x,
        opacity: props.enabled ? 1 : 0.5,
        ...props.baseStyle,
    };

    const containerStyle: React.CSSProperties = {
        width: dimensions.width ? `${dimensions.width}px` : 'auto',
        height: dimensions.height ? `${dimensions.height + 48}px` : 'auto',
        transform: `scale(${dimensions.scale})`,
        transformOrigin: 'left top',
    };

    return (
        <div className="w-full h-full p-4" ref={containerRef}>
            <div className="relative p-4 min-h-24">
                {text.length > TOTAL_CHAR_LIMIT && <p className="font-['Inter'] text-sm font-normal leading-5 text-[#F53354] text-center mb-2 mt-0">{text.length} out of {TOTAL_CHAR_LIMIT} characters</p>}
                {props.type == "title" && text.split('\n').length > MAX_LINE_NUMBER && <p className="font-['Inter'] text-sm font-normal leading-5 text-[#F53354] text-center mb-6 mt-0">{text.split('\n').length} out of {MAX_LINE_NUMBER} lines</p>}
                <div style={containerStyle}>
                    <textarea
                        disabled={!props.enabled}
                        ref={textareaRef}
                        // className="absolute inset-0 border-none bg-transparent m-0 p-0 w-full h-full text-4xl caret-black text-yellow-300 opacity-30 outline-none resize-none whitespace-pre "
                        className="absolute inset-0 border-none bg-transparent m-0 p-0 w-full h-full text-4xl caret-black text-transparent  outline-none resize-none whitespace-pre overflow-hidden"
                        value={text}
                        onChange={handleChange}
                        style={baseStyle}
                        spellCheck={false}
                    />
                    <div
                        ref={contentRef}
                        className="w-full text-4xl pointer-events-none"
                        style={{
                            ...baseStyle,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {renderText()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TitleEditor;