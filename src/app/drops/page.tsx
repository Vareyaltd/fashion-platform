"use client";

import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";

const allDrops = [
  { id: 1, name: "CYBER-TRENCH X", price: "0.5 ETH", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", status: "Live Now" },
  { id: 2, name: "NEON VISOR V2", price: "0.2 ETH", img: "https://images.unsplash.com/photo-1558244402-28c5316dbf58?q=80&w=2574&auto=format&fit=crop", status: "Sold Out" },
  { id: 3, name: "HOLO-SNEAKERS", price: "0.8 ETH", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670&auto=format&fit=crop", status: "Live Now" },
  { id: 4, name: "VOID JACKET", price: "1.2 ETH", img: "https://images.unsplash.com/photo-1550614000-4b95d4ed798a?q=80&w=2574&auto=format&fit=crop", status: "Live Now" },
  { id: 5, name: "AURA VEST", price: "0.4 ETH", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2459&auto=format&fit=crop", status: "Live Now" },
  { id: 6, name: "SYNTH PANTS", price: "0.3 ETH", img: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=2535&auto=format&fit=crop", status: "Sold Out" },
];

export default function DropsPage() {
  return (
    <main className="min-h-screen bg-matte-black selection:bg-neon-purple selection:text-white pt-32 pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="font-heading text-6xl md:text-8xl font-bold text-white uppercase tracking-tighter">
            All <span className="text-transparent" style={{ WebkitTextStroke: '1px #a3a3a3' }}>Collections</span>
          </h1>
          <p className="text-silver mt-4 max-w-2xl text-lg">Browse the latest live digital fashion drops. Secure your pieces before they vanish into the void.</p>
        </div>

        <div className="flex gap-4 mb-12">
          <button className="px-6 py-2 bg-white text-black font-bold uppercase text-sm tracking-wider">All</button>
          <button className="px-6 py-2 border border-white/20 text-white font-bold uppercase text-sm tracking-wider hover:bg-white/10">Live</button>
          <button className="px-6 py-2 border border-white/20 text-white font-bold uppercase text-sm tracking-wider hover:bg-white/10">Upcoming</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {allDrops.map((drop, i) => (
            <motion.div 
              key={drop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-charcoal border border-white/5">
                <img 
                  src={drop.img} 
                  alt={drop.name} 
                  className="object-cover w-full h-full opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out grayscale-0 md:grayscale md:group-hover:grayscale-0" 
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1">
                  <span className={`text-xs font-bold uppercase tracking-wider ${drop.status === 'Live Now' ? 'text-neon-blue' : 'text-silver'}`}>
                    {drop.status}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white font-heading text-xl font-bold tracking-wider">{drop.name}</p>
                      <p className="text-neon-blue text-sm font-medium mt-1">{drop.price}</p>
                    </div>
                    <button className="px-4 py-2 bg-white text-black font-bold text-sm hover:bg-neon-blue hover:text-white transition-colors">
                      BUY
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
