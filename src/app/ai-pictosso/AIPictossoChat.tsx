"use client"

import { useState, useMemo } from 'react';
import { GeneratedPictosso } from './pictosso-generator';
import { mainIcon, startDate, endDate, selectedPeriodType, lifeEvents, titles } from '@/signals';
import { PeriodType } from '@/types';
import { mapEventToLocalIcon, mapMainEmojiToLocalIcon } from './icon-mapper';
import { v4 as uuid } from 'uuid';
import { SvgRenderer } from '@/components/SvgRenderer';

interface AIPictossoChatProps {
    onGenerated?: () => void;
}

export default function AIPictossoChat({ onGenerated }: AIPictossoChatProps) {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<GeneratedPictosso | null>(null);
    const [apiKey, setApiKey] = useState('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');
    const [showApiKey, setShowApiKey] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!prompt.trim()) {
            setError('Veuillez entrer une description');
            return;
        }

        if (!apiKey.trim()) {
            setError('Veuillez entrer votre clé API OpenRouter');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('/api/ai-pictosso/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    prompt,
                    apiKey 
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.details || data.error || 'Erreur lors de la génération');
            }

            setResult(data.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    const applyToPictosso = () => {
        if (!result) return;

        // Map AI-generated main icon to our local icon
        const localMainIcon = mapMainEmojiToLocalIcon(result.mainIcon.name);
        mainIcon.value = localMainIcon;

        // Apply dates (convert string dates to timestamps)
        const start = new Date(result.startDate);
        const end = new Date(result.endDate);
        startDate.value = start.getTime();
        endDate.value = end.getTime();
        
        // Calculate appropriate period type based on date range
        const yearsDiff = end.getFullYear() - start.getFullYear();
        if (yearsDiff > 25) {
            // More than 25 years: use months
            selectedPeriodType.value = PeriodType.MONTH;
        } else {
            // 25 years or less: use days for more detail
            selectedPeriodType.value = PeriodType.DAY;
        }

        // Map AI events to local icons with pink color
        lifeEvents.value = result.events.map((event) => {
            const localIcon = mapEventToLocalIcon(event.title);
            return {
                id: uuid(),
                date: new Date(event.date).getTime(),
                title: event.title,
                description: "",
                icon: {
                    ...localIcon,
                    color: "#e91e63" // Pink color for life events
                }
            };
        });

        // Apply title and subtitle
        const startYear = start.getFullYear();
        const endYear = end.getFullYear();
        const generatedSubtitle = result.subtitle 
            ? `${result.subtitle} - From ${startYear} to ${endYear}`
            : `A beautiful chapter - From ${startYear} to ${endYear}`;
        
        titles.value = {
            ...titles.value,
            title: result.title.toUpperCase(),
            subtitle: generatedSubtitle
        };

        // Call the callback
        onGenerated?.();
    };

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">🤖 Générateur AI de Pictosso</h2>
                <p className="text-gray-600">
                    Décrivez une personne ou un événement, et l'IA créera automatiquement votre Pictosso
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mb-6">
                {/* API Key Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Clé API OpenRouter
                        <a 
                            href="https://openrouter.ai/keys" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="ml-2 text-blue-600 hover:underline text-xs"
                        >
                            (obtenir une clé)
                        </a>
                    </label>
                    <div className="flex gap-2">
                        <input
                            type={showApiKey ? "text" : "password"}
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="sk-or-v1-..."
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                            {showApiKey ? '🙈' : '👁️'}
                        </button>
                    </div>
                </div>

                {/* Prompt Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Description
                    </label>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Ex: Fais-moi le Pictosso de la vie de Bob Marley"
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading || !prompt.trim() || !apiKey.trim()}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="animate-spin">⚙️</span>
                            Génération en cours...
                        </span>
                    ) : (
                        'Générer le Pictosso ✨'
                    )}
                </button>
            </form>

            {/* Error Display */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    <strong>Erreur:</strong> {error}
                </div>
            )}

            {/* Result Display */}
            {result && (
                <div className="flex-1 overflow-auto bg-white border border-gray-200 rounded-lg p-6">
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold mb-2">{result.title}</h3>
                        {result.subtitle && (
                            <p className="text-gray-600">{result.subtitle}</p>
                        )}
                        <div className="mt-4 flex gap-4 text-sm text-gray-500">
                            <span>📅 {result.startDate} → {result.endDate}</span>
                            <span>⏱️ Par {result.periodType.toLowerCase()}</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h4 className="font-semibold mb-2">Icône principale:</h4>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                            <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg border border-gray-200">
                                <SvgRenderer 
                                    icon={mapMainEmojiToLocalIcon(result.mainIcon.name)} 
                                    fillColor="#000000" 
                                    width={32} 
                                    height={32} 
                                />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium">{mapMainEmojiToLocalIcon(result.mainIcon.name).name}</div>
                                <span className="text-sm text-gray-500">{result.mainIcon.name}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h4 className="font-semibold mb-3">Événements clés ({result.events.length}):</h4>
                        <div className="space-y-2 max-h-96 overflow-auto">
                            {result.events.map((event, index) => {
                                const localIcon = mapEventToLocalIcon(event.title);
                                return (
                                    <div 
                                        key={index}
                                        className="flex items-start gap-3 p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border border-gray-200 flex-shrink-0">
                                            <SvgRenderer 
                                                icon={localIcon} 
                                                fillColor="#000000" 
                                                width={24} 
                                                height={24} 
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium">{event.title}</div>
                                            <div className="text-sm text-gray-500">{event.date}</div>
                                            <div className="text-xs text-gray-400 mt-1">→ {localIcon.name}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <button
                        onClick={applyToPictosso}
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                        ✅ Appliquer ce Pictosso
                    </button>
                </div>
            )}

            {/* Examples */}
            {!loading && !result && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold mb-2">💡 Exemples de prompts:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                        <li>• "Fais-moi le Pictosso de la vie de Bob Marley"</li>
                        <li>• "Crée un Pictosso pour la carrière de Lionel Messi"</li>
                        <li>• "Génère un Pictosso de la vie de Marie Curie"</li>
                        <li>• "Fais le Pictosso de l'histoire d'Apple"</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
