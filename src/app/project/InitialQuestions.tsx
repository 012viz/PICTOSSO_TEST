"use client"

import { mainIcon, startDate, endDate } from "@/signals";
import { IIcon } from "@/types";
import { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import { capitalized } from "@/utils";

interface InitialQuestionsProps {
    onComplete: () => void;
}

const InitialQuestions = ({ onComplete }: InitialQuestionsProps) => {
    const [step, setStep] = useState<1 | 2>(1);
    const [selectedIcon, setSelectedIcon] = useState<IIcon | null>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [emojis, setEmojis] = useState<{ [key: string]: string[] }>({});
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmojis = async () => {
            try {
                const [notoResponse, flagsResponse] = await Promise.all([
                    fetch('https://api.iconify.design/collection?prefix=noto&pretty=1'),
                    fetch('https://api.iconify.design/collection?prefix=circle-flags&pretty=1')
                ]);
                const notoData = await notoResponse.json();
                const flagsData = await flagsResponse.json();
                
                const flagsKeys = Object.fromEntries(
                    Object.entries(notoData.categories).map(([key, values]) => [
                        key,
                        (values as string[]).map((emoji: string) => `noto:${emoji}`)
                    ])
                );
                
                setEmojis({
                    ...flagsKeys,
                    Flags: [...(flagsKeys?.Flags || []), ...flagsData.uncategorized.map((emoji: string) => `circle-flags:${emoji}`)]
                });
                setSelectedCategory(Object.keys(notoData.categories)[0]);
            } catch (error) {
                console.error("Failed to fetch emojis:", error);
            }
        };
        
        if (showEmojiPicker && Object.keys(emojis).length === 0) {
            fetchEmojis();
        }
    }, [showEmojiPicker, emojis]);

    const handleEmojiSelected = (emojiId: string) => {
        const icon: IIcon = {
            id: emojiId,
            name: emojiId,
            path: emojiId,
            source: "iconify",
            width: 15,
            height: 15,
            size: 1,
            color: "unset"
        };
        setSelectedIcon(icon);
        mainIcon.value = icon;
        setShowEmojiPicker(false);
    };

    const handleNextFromStep1 = () => {
        if (selectedIcon) {
            setStep(2);
        }
    };

    const handleNextFromStep2 = () => {
        if (startDate.value && endDate.value) {
            onComplete();
        }
    };

    return (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="w-full max-w-md px-8 py-12 text-center">
                {/* Logo */}
                <div className="mb-12">
                    <img 
                        src="/logo_black.svg" 
                        alt="Pictosso" 
                        className="h-12 mx-auto"
                    />
                    <p className="text-sm mt-2 opacity-60">An art company</p>
                </div>

                {step === 1 && (
                    <>
                        <h1 className="text-6xl font-bold mb-4">1</h1>
                        <h2 className="text-3xl font-bold mb-8">THE ICON</h2>
                        <p className="text-base mb-2">Select the icon that best represents this story</p>
                        <p className="text-sm opacity-60 mb-12">
                            Choose from our set of emojis, or upload your own to make it truly personal.
                        </p>

                        {/* Icon Display */}
                        <div 
                            className="w-32 h-32 mx-auto mb-8 border-2 border-gray-200 rounded-2xl flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                            onClick={() => setShowEmojiPicker(true)}
                        >
                            {selectedIcon ? (
                                <Icon icon={selectedIcon.path} width={60} height={60} />
                            ) : (
                                <div className="text-4xl text-gray-400">+</div>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 justify-center mb-8">
                            <button 
                                className="px-8 py-3 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                                onClick={() => alert('Upload feature coming soon')}
                            >
                                Upload
                            </button>
                            <button 
                                className="px-8 py-3 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                                onClick={() => setShowEmojiPicker(true)}
                            >
                                Emoji
                            </button>
                        </div>

                        {/* Next Button */}
                        <button 
                            className={`w-32 py-3 rounded-md text-white font-medium transition-colors ${
                                selectedIcon 
                                    ? 'bg-black hover:bg-gray-800' 
                                    : 'bg-gray-300 cursor-not-allowed'
                            }`}
                            onClick={handleNextFromStep1}
                            disabled={!selectedIcon}
                        >
                            Next
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h1 className="text-6xl font-bold mb-4">2</h1>
                        <h2 className="text-3xl font-bold mb-8">TIMELINE</h2>
                        <p className="text-base mb-2">When does your chapter begin?</p>
                        <p className="text-sm opacity-60 mb-8">
                            A specific date, a month or even a year.
                        </p>

                        {/* Start Date Input */}
                        <input
                            type="date"
                            className="w-full max-w-xs mx-auto block px-6 py-4 mb-8 border-2 border-gray-200 rounded-full text-center text-lg"
                            value={startDate.value ? new Date(startDate.value).toISOString().split('T')[0] : ''}
                            onChange={(e) => {
                                if (e.target.value) {
                                    startDate.value = new Date(e.target.value).getTime();
                                }
                            }}
                        />

                        <p className="text-base mb-2">When does your chapter begin?</p>
                        <p className="text-sm opacity-60 mb-8">
                            A specific date, a month or even a year.
                        </p>

                        {/* End Date Input */}
                        <input
                            type="date"
                            className="w-full max-w-xs mx-auto block px-6 py-4 mb-8 border-2 border-gray-200 rounded-full text-center text-lg"
                            value={endDate.value ? new Date(endDate.value).toISOString().split('T')[0] : ''}
                            onChange={(e) => {
                                if (e.target.value) {
                                    endDate.value = new Date(e.target.value).getTime();
                                }
                            }}
                        />

                        {/* Next Button */}
                        <button 
                            className={`w-32 py-3 rounded-md text-white font-medium transition-colors ${
                                startDate.value && endDate.value
                                    ? 'bg-black hover:bg-gray-800' 
                                    : 'bg-gray-300 cursor-not-allowed'
                            }`}
                            onClick={handleNextFromStep2}
                            disabled={!startDate.value || !endDate.value}
                        >
                            Next
                        </button>
                    </>
                )}
            </div>

            {/* Emoji Picker Modal */}
            {showEmojiPicker && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                    onClick={() => setShowEmojiPicker(false)}
                >
                    <div 
                        className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold">Select an Emoji</h3>
                            <button 
                                onClick={() => setShowEmojiPicker(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 13L1 1" stroke="black" strokeWidth="2" />
                                    <path d="M1 13L13 1" stroke="black" strokeWidth="2" />
                                </svg>
                            </button>
                        </div>
                        
                        {/* Categories */}
                        {Object.keys(emojis).length > 0 && (
                            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                                {Object.keys(emojis).map((cat) => (
                                    <button
                                        key={cat}
                                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                                            cat === selectedCategory
                                                ? 'bg-black text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                        onClick={() => setSelectedCategory(cat)}
                                    >
                                        {capitalized(cat)}
                                    </button>
                                ))}
                            </div>
                        )}
                        
                        {/* Emoji Grid */}
                        <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                            {selectedCategory && emojis[selectedCategory]?.map((emoji, index) => (
                                <button
                                    key={index}
                                    className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                                    onClick={() => handleEmojiSelected(emoji)}
                                    title={emoji.split(":")[1]?.split('-').map(t => capitalized(t)).join(' ')}
                                >
                                    <Icon icon={emoji} width={32} height={32} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InitialQuestions;
