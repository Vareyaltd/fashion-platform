"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function AIFashion() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for the image
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text reveal animation
      gsap.fromTo(textRef.current?.children || [], 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center+=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-charcoal relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        <div ref={textRef} className="w-full md:w-1/2 z-10">
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tighter">
            AI-Powered <br/> <span className="text-neon-purple">Identity.</span>
          </h2>
          <p className="text-silver text-lg mb-8 font-sans">
            Generate unique digital fashion pieces using advanced AI. Type your mood, define your style, and let the algorithm design your next iconic look for the metaverse.
          </p>
          <div className="glass-dark p-1 rounded-none flex max-w-md border border-white/20">
            <input 
              type="text" 
              placeholder="e.g. Cyberpunk kimono with neon..." 
              className="bg-transparent border-none text-white px-6 py-3 w-full focus:outline-none placeholder:text-silver/50"
            />
            <Link href="/create" className="bg-neon-purple text-white px-8 py-3 rounded-none font-heading font-bold uppercase hover:bg-white hover:text-black transition-colors flex items-center justify-center">
              Generate
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-[600px] relative rounded-none overflow-hidden border border-white/10">
          <div ref={imageRef} className="absolute inset-[-10%] w-[120%] h-[120%]">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2640&auto=format&fit=crop" 
              alt="AI Fashion Generation" 
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-neon-purple/30 mix-blend-overlay" />
          </div>
        </div>
        
      </div>
    </section>
  );
}
