"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function VirtualRunway() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-40 bg-matte-black relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-blue/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="text-center z-10 mb-20 px-6">
        <h2 className="font-heading text-5xl md:text-8xl font-bold text-white mb-6 tracking-tighter uppercase">
          Virtual <span className="text-transparent" style={{ WebkitTextStroke: '1px #00f0ff' }}>Runways</span>
        </h2>
        <p className="text-silver max-w-xl mx-auto text-lg">
          Attend live cinematic fashion shows in real-time. Experience the future of high-fashion events from anywhere in the metaverse.
        </p>
      </div>

      {/* Marquee */}
      <div className="w-[120%] overflow-hidden flex whitespace-nowrap border-y border-white/5 py-6 bg-black/50 backdrop-blur-md z-10 -rotate-2">
        <div ref={marqueeRef} className="flex gap-12 font-heading text-3xl tracking-widest uppercase text-silver/40">
          <span>NEXT EVENT: NEO-TOKYO SHOWCASE [20:00 UTC]</span>
          <span className="text-neon-blue">•</span>
          <span>FEATURING CREATOR: @CYBER_AESTHETICS</span>
          <span className="text-neon-blue">•</span>
          <span>NEXT EVENT: NEO-TOKYO SHOWCASE [20:00 UTC]</span>
          <span className="text-neon-blue">•</span>
          <span>FEATURING CREATOR: @CYBER_AESTHETICS</span>
          <span className="text-neon-blue">•</span>
          <span>NEXT EVENT: NEO-TOKYO SHOWCASE [20:00 UTC]</span>
        </div>
      </div>

      <div className="mt-20 z-10">
        <Link href="/runway" className="px-12 py-5 bg-transparent border border-neon-blue text-neon-blue font-heading font-bold uppercase tracking-widest hover:bg-neon-blue hover:text-black transition-all duration-300 inline-block">
          Get VIP Access
        </Link>
      </div>

    </section>
  );
}
