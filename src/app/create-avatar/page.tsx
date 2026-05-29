"use client";

import Navbar from "@/components/layout/Navbar";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateAvatarPage() {
  const [step, setStep] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const colors = ["#050505", "#f5f5f5", "#00f0ff", "#b026ff", "#ff0055"];

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    
    const data = await res.json();
    if (data.url) {
      setAvatarUrl(data.url);
      setStep(2);
    } else {
      alert("Upload failed.");
    }
  };

  return (
    <main className="min-h-screen bg-matte-black selection:bg-neon-purple selection:text-white pt-32 pb-20 overflow-hidden">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 items-center h-[calc(100vh-160px)]">
        
        {/* Left Side: Steps & Input */}
        <div className="w-full lg:w-1/3 flex flex-col justify-center">
          <h1 className="font-heading text-5xl font-bold text-white uppercase tracking-tighter mb-2">
            Build Your <br/><span className="text-neon-blue">Digital Self.</span>
          </h1>
          <p className="text-silver mb-10">Upload a picture and define your aesthetic to generate your 3D mini avatar.</p>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-white/20 rounded-xl p-10 text-center hover:bg-white/5 transition-colors cursor-pointer">
                  <p className="text-silver uppercase tracking-widest text-sm font-bold">Upload Picture</p>
                  <p className="text-white/40 text-xs mt-2">JPG, PNG up to 5MB</p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleUpload} 
                  />
                </div>
                <button disabled className="w-full bg-white/50 text-black/50 font-bold uppercase tracking-wider py-4 cursor-not-allowed">
                  Upload to Continue
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <p className="text-white font-bold uppercase tracking-widest text-sm mb-4">Select Outfit Color Palette</p>
                  <div className="flex gap-4">
                    {colors.map((color) => (
                      <button 
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-12 h-12 rounded-full border-2 transition-all ${selectedColor === color ? 'border-white scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <button onClick={() => setStep(3)} className="w-full bg-white text-black font-bold uppercase tracking-wider py-4 hover:bg-neon-blue hover:text-white transition-colors">
                  Generate Avatar
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="p-6 bg-charcoal border border-white/10 rounded-xl">
                  <p className="text-neon-blue font-bold uppercase tracking-widest text-sm mb-2">Avatar Ready</p>
                  <p className="text-silver text-sm">Your digital identity has been synthesized. You can now equip digital clothing from your collection.</p>
                </div>
                <button className="w-full bg-transparent border border-white text-white font-bold uppercase tracking-wider py-4 hover:bg-white hover:text-black transition-colors">
                  Enter VAREYA
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: 3D Preview Simulation */}
        <div className="w-full lg:w-2/3 h-full relative bg-charcoal border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-radial from-neon-blue/10 to-transparent opacity-50" />
          
          {step < 3 ? (
            <div className="text-center z-10">
              <div className="w-32 h-32 border-4 border-white/10 border-t-neon-blue rounded-full animate-spin mb-6 mx-auto" />
              <p className="text-silver font-heading uppercase tracking-[0.3em]">Awaiting Input...</p>
            </div>
          ) : (
            <div className="z-10 text-center animate-fade-in relative w-full h-full flex flex-col items-center justify-center">
               {/* Simulating a 3D Avatar Image with the user's uploaded face blended */}
               {avatarUrl && (
                 <img 
                   src={avatarUrl} 
                   alt="User Face Base" 
                   className="absolute top-10 w-24 h-24 object-cover rounded-full border-2 border-neon-blue opacity-50 z-20 mix-blend-screen" 
                 />
               )}
               <img 
                 src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" 
                 alt="Generated Avatar Outfit" 
                 className="w-auto h-[80%] object-contain drop-shadow-[0_0_30px_rgba(0,240,255,0.4)] mix-blend-screen grayscale relative z-10" 
                 style={selectedColor ? { filter: `drop-shadow(0 0 20px ${selectedColor})` } : {}}
               />
               <p className="absolute bottom-10 text-neon-blue font-heading uppercase tracking-widest bg-black/50 px-4 py-2 backdrop-blur-md border border-white/10">
                 Digital Entity Synced
               </p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
