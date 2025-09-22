
import React from 'react';
import { AspectRatio } from '../types';
import { LoadingSpinner, MagicWandIcon } from './icons';

interface ControlPanelProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    aspectRatio: AspectRatio;
    setAspectRatio: (ratio: AspectRatio) => void;
    onSubmit: () => void;
    isLoading: boolean;
    expertPrompt: string;
}

const aspectRatios: { value: AspectRatio; label: string; }[] = [
    { value: '1:1', label: 'Square' },
    { value: '2:3', label: 'Portrait' },
    { value: '16:9', label: 'Cinematic' },
];

export const ControlPanel: React.FC<ControlPanelProps> = ({
    prompt,
    setPrompt,
    aspectRatio,
    setAspectRatio,
    onSubmit,
    isLoading,
    expertPrompt
}) => {
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 flex flex-col gap-6 h-full shadow-2xl shadow-cyan-500/10">
            <header>
                <h2 className="text-2xl font-bold text-cyan-300">Sovereign Scribe</h2>
                <p className="text-slate-400 mt-1 text-sm">Describe your vision. The Scribe will perfect it.</p>
            </header>

            <div className="flex flex-col gap-2 flex-grow">
                <label htmlFor="prompt" className="text-slate-300 font-medium">Your Narrative Idea</label>
                <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., a majestic griffin soaring through a stormy sky"
                    className="w-full h-40 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all resize-none"
                    disabled={isLoading}
                />
            </div>
            
            {expertPrompt && !isLoading && (
                 <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                    <h4 className="text-sm font-semibold text-cyan-400 mb-1">Scribe's Enhanced Prompt:</h4>
                    <p className="text-xs text-slate-400 italic">{expertPrompt}</p>
                 </div>
            )}

            <div className="flex flex-col gap-2">
                <label className="text-slate-300 font-medium">Aspect Ratio</label>
                <div className="grid grid-cols-3 gap-3">
                    {aspectRatios.map(({ value, label }) => (
                        <button
                            key={value}
                            onClick={() => setAspectRatio(value)}
                            disabled={isLoading}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500
                                ${aspectRatio === value 
                                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' 
                                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                                }
                                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <span className="font-mono">{value}</span>
                            <span className="hidden sm:inline"> - {label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={onSubmit}
                disabled={isLoading || !prompt.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:from-purple-700 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:from-slate-600 disabled:to-slate-700 transform hover:scale-105"
            >
                {isLoading ? (
                    <>
                        <LoadingSpinner className="w-5 h-5" />
                        Creating...
                    </>
                ) : (
                    <>
                        <MagicWandIcon className="w-5 h-5" />
                        Create Masterpiece
                    </>
                )}
            </button>
        </div>
    );
};
