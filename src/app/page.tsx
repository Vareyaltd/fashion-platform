import Navbar from "@/components/layout/Navbar";
import HeroScene from "@/components/3d/HeroScene";
import FeaturedDrops from "@/components/sections/FeaturedDrops";
import AIFashion from "@/components/sections/AIFashion";
import VirtualRunway from "@/components/sections/VirtualRunway";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen relative bg-matte-black selection:bg-neon-purple selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* 3D Canvas Background */}
        <HeroScene />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center pointer-events-none mt-20">
          <h1 className="font-heading text-6xl md:text-[8rem] leading-none font-bold tracking-tighter mb-6 mix-blend-difference">
            <span className="text-white">ENTER THE </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">NEW ERA</span>
          </h1>
          <p className="text-silver text-lg md:text-xl max-w-2xl mx-auto mb-10 font-sans pointer-events-auto backdrop-blur-md bg-black/20 p-4 rounded-xl border border-white/10">
            A cinematic digital fashion universe. Create AI-powered outfits, explore virtual worlds, and build your digital identity.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pointer-events-auto">
            <Link href="/drops" className="px-10 py-4 bg-white text-black font-heading font-bold uppercase tracking-wider rounded-none hover:bg-neon-blue hover:text-white transition-all duration-300">
              Explore Collection
            </Link>
            <Link href="/create-avatar" className="px-10 py-4 glass text-white font-heading font-bold uppercase tracking-wider rounded-none hover:bg-white/10 transition-colors duration-300">
              Create Avatar
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-float">
          <span className="text-silver/60 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-silver/60 to-transparent"></div>
        </div>
      </section>

      <FeaturedDrops />
      <AIFashion />
      <VirtualRunway />
    </main>
  );
}
