"use client"

import { useState } from "react";
import dynamic from "next/dynamic";

const InitialQuestions = dynamic(() => import("./InitialQuestions"), { ssr: false });
const AIPictossoChat = dynamic(() => import("../ai-pictosso/AIPictossoChat"), { ssr: false });

interface ProjectChoiceProps {
    onComplete: () => void;
}

type ChoiceMode = 'select' | 'questionnaire' | 'ai';

export default function ProjectChoice({ onComplete }: ProjectChoiceProps) {
    const [mode, setMode] = useState<ChoiceMode>('select');

    if (mode === 'questionnaire') {
        return <InitialQuestions onComplete={onComplete} />;
    }

    if (mode === 'ai') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
                <div className="w-full max-w-5xl">
                    <AIPictossoChat onGenerated={onComplete} />
                </div>
            </div>
        );
    }

    // Selection screen
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
            <div className="max-w-5xl w-full">
                {/* Logo */}
                <div className="text-center mb-12">
                    <img 
                        src="/logo_black.svg" 
                        alt="Pictosso" 
                        className="h-12 mx-auto mb-4"
                    />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Create Your Pictosso</h1>
                    <p className="text-xl text-gray-600">Choose how you want to start</p>
                </div>

                {/* Choice Cards */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    {/* Manual Questionnaire Card */}
                    <button
                        onClick={() => setMode('questionnaire')}
                        className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-transparent hover:border-purple-500 text-left"
                    >
                        <div className="text-6xl mb-6">📝</div>
                        <h2 className="text-2xl font-bold mb-4 group-hover:text-purple-600 transition-colors">
                            Manual Creation
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Answer a few simple questions about your timeline, choose your icons, and customize every detail of your Pictosso.
                        </p>
                        <div className="flex items-center text-purple-600 font-semibold">
                            <span>Start questionnaire</span>
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex items-center text-sm text-gray-500">
                                <span className="mr-4">✓ Full control</span>
                                <span>✓ Step-by-step</span>
                            </div>
                        </div>
                    </button>

                    {/* AI Generation Card */}
                    <button
                        onClick={() => setMode('ai')}
                        className="group bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-transparent text-left text-white relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                        <div className="text-6xl mb-6">🤖</div>
                        <h2 className="text-2xl font-bold mb-4">
                            AI Generation
                        </h2>
                        <p className="text-purple-100 mb-6">
                            Describe a person, event, or story in your own words. Our AI will automatically create your complete Pictosso with dates and icons.
                        </p>
                        <div className="flex items-center font-semibold">
                            <span>Generate with AI</span>
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div className="mt-6 pt-6 border-t border-purple-400 border-opacity-30">
                            <div className="flex items-center text-sm text-purple-100">
                                <span className="mr-4">✓ Fast & easy</span>
                                <span>✓ AI-powered</span>
                            </div>
                        </div>
                        <div className="absolute bottom-4 right-4 bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-full">
                            BETA
                        </div>
                    </button>
                </div>

                {/* Examples Section */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-gray-500 mb-4">Popular AI prompts:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {[
                            "Life of Bob Marley",
                            "Career of Lionel Messi",
                            "History of Apple Inc.",
                            "Life of Marie Curie"
                        ].map((example) => (
                            <span 
                                key={example}
                                className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 border border-gray-200"
                            >
                                "{example}"
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
