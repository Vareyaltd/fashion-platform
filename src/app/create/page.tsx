"use client";

import Navbar from "@/components/layout/Navbar";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AIStudioPage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.imageUrl) {
        setResult(data.imageUrl);
      } else {
        alert(`Error: ${data.error || "Failed to generate image."}`);
      }
    } catch (e: any) {
      alert(`Error: ${e.message || "Failed to communicate with AI Studio."}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-matte-black selection:bg-neon-purple selection:text-white pt-32 pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h1 className="font-heading text-6xl md:text-8xl font-bold text-white uppercase tracking-tighter">
            AI <span className="text-neon-purple">Studio.</span>
          </h1>
          <p className="text-silver mt-4 max-w-2xl mx-auto text-lg">
            Describe your vision. Our neural networks will synthesize it into a digital fashion piece ready for the metaverse.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-charcoal p-8 border border-white/10 rounded-2xl shadow-2xl">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A cyberpunk jacket made of glowing neon circuits and dark metallic fabric..." 
              className="flex-1 bg-black/50 border border-white/20 text-white px-6 py-4 focus:outline-none focus:border-neon-purple transition-colors rounded-none placeholder:text-silver/50 font-sans"
            />
            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
              className="bg-neon-purple text-white px-10 py-4 font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? "Synthesizing..." : "Generate"}
            </button>
          </div>

          {/* Result Area */}
          <div className="aspect-video w-full bg-black/50 border border-white/5 rounded-xl flex items-center justify-center overflow-hidden relative">
            {!isGenerating && !result && (
              <p className="text-silver/40 font-heading uppercase tracking-widest text-sm">Awaiting Prompt</p>
            )}

            {isGenerating && (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-white/10 border-t-neon-purple rounded-full animate-spin mb-4" />
                <p className="text-neon-purple font-heading uppercase tracking-widest animate-pulse">Running Neural Engine...</p>
              </div>
            )}

            {result && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full relative"
              >
                <img src={result} alt="Generated Fashion" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <p className="text-neon-purple font-bold text-xs uppercase tracking-widest mb-1">Generated Output</p>
                    <p className="text-white font-heading text-xl">"{prompt}"</p>
                  </div>
                  <div className="flex gap-4">
                    <button className="px-6 py-2 bg-white text-black font-bold uppercase text-sm hover:bg-neon-blue hover:text-white transition-colors">Mint Asset</button>
                    <button className="px-6 py-2 border border-white/20 text-white font-bold uppercase text-sm hover:bg-white/10">Wear in 3D</button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
