
import React from 'react';
import { LoadingSpinner } from './icons';

interface CanvasProps {
    imageSrc: string | null;
    isLoading: boolean;
    error: string | null;
    aspectRatio: string;
}

const WelcomeState: React.FC = () => (
    <div className="text-center text-slate-400 flex flex-col items-center justify-center h-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600 mb-4"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
        <h3 className="text-xl font-semibold text-slate-300">Generation Canvas</h3>
        <p className="mt-2 max-w-sm">Your masterpiece will appear here. Let your creativity flow and the Sovereign Scribe will bring it to life.</p>
    </div>
);

const LoadingState: React.FC = () => (
     <div className="text-center text-slate-300 flex flex-col items-center justify-center h-full">
        <LoadingSpinner className="w-12 h-12 mb-4 text-cyan-400" />
        <h3 className="text-xl font-semibold">The Aether is Churning...</h3>
        <p className="mt-2 max-w-sm text-slate-400">Our digital artisans are meticulously crafting your vision. This can take a moment.</p>
    </div>
);

const ErrorState: React.FC<{ message: string }> = ({ message }) => (
    <div className="text-center text-red-400 flex flex-col items-center justify-center h-full p-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        <h3 className="text-xl font-semibold text-red-300">A Creative Block!</h3>
        <p className="mt-2 text-sm">{message}</p>
    </div>
);

export const Canvas: React.FC<CanvasProps> = ({ imageSrc, isLoading, error, aspectRatio }) => {
    
    const getAspectRatioClass = (ratio: string) => {
        switch(ratio) {
            case '1:1': return 'aspect-square';
            case '2:3': return 'aspect-[2/3]';
            case '16:9': return 'aspect-video';
            default: return 'aspect-square';
        }
    };

    return (
        <div className={`w-full bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-700 flex items-center justify-center transition-all duration-300 ${getAspectRatioClass(aspectRatio)}`}>
            <div className="w-full h-full p-4">
                {isLoading ? (
                    <LoadingState />
                ) : error ? (
                    <ErrorState message={error} />
                ) : imageSrc ? (
                    <img
                        src={`data:image/jpeg;base64,${imageSrc}`}
                        alt="Generated masterpiece"
                        className="w-full h-full object-contain rounded-lg shadow-2xl shadow-black"
                    />
                ) : (
                    <WelcomeState />
                )}
            </div>
        </div>
    );
};
