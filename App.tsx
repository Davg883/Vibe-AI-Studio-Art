
import React, { useState, useCallback } from 'react';
import { AspectRatio } from './types';
import { generateExpertPrompt, generateImage } from './services/geminiService';
import { ControlPanel } from './components/ControlPanel';
import { Canvas } from './components/Canvas';

function App() {
    const [prompt, setPrompt] = useState<string>('');
    const [expertPrompt, setExpertPrompt] = useState<string>('');
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreateMasterpiece = useCallback(async () => {
        if (!prompt.trim()) return;

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);
        setExpertPrompt('');

        try {
            // Step 1: Generate the expert-level prompt
            const detailedPrompt = await generateExpertPrompt(prompt);
            setExpertPrompt(detailedPrompt);

            // Step 2: Generate the image using the new prompt and selected aspect ratio
            const imageBase64 = await generateImage(detailedPrompt, aspectRatio);
            setGeneratedImage(imageBase64);

        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [prompt, aspectRatio]);
    
    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto max-w-7xl">
                <header className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 pb-2">
                        VibeAI Art Studio
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto mt-2">
                        Transform your narrative ideas into stunning visual art. You are the director, we are your digital brush.
                    </p>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <ControlPanel
                            prompt={prompt}
                            setPrompt={setPrompt}
                            aspectRatio={aspectRatio}
                            setAspectRatio={setAspectRatio}
                            onSubmit={handleCreateMasterpiece}
                            isLoading={isLoading}
                            expertPrompt={expertPrompt}
                        />
                    </div>
                    <div className="lg:col-span-2 flex items-center justify-center">
                        <Canvas
                            imageSrc={generatedImage}
                            isLoading={isLoading}
                            error={error}
                            aspectRatio={aspectRatio}
                        />
                    </div>
                </main>
                
                <footer className="text-center mt-12 text-slate-500 text-sm">
                    <p>Powered by Google Gemini. Crafted for creators.</p>
                </footer>
            </div>
        </div>
    );
}

export default App;
