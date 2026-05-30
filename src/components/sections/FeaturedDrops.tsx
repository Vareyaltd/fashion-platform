"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const drops = [
  { id: 1, name: "CYBER-TRENCH X", price: "0.5 ETH", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
  { id: 2, name: "NEON VISOR V2", price: "0.2 ETH", img: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=2000&auto=format&fit=crop" },
  { id: 3, name: "HOLO-SNEAKERS", price: "0.8 ETH", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670&auto=format&fit=crop" }
];

export default function FeaturedDrops() {
  return (
    <section className="py-32 px-6 bg-matte-black relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <h2 className="font-heading text-5xl md:text-7xl font-bold text-white tracking-tighter">
            EXCLUSIVE <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px #a3a3a3' }}>DROPS.</span>
          </h2>
          <Link href="/drops" className="text-neon-blue font-medium hover:text-white transition-colors uppercase tracking-widest text-sm mb-2">
            View Collection
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {drops.map((drop, index) => (
            <motion.div 
              key={drop.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-charcoal border border-white/5">
                <img 
                  src={drop.img} 
                  alt={drop.name} 
                  className="object-cover w-full h-full opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out grayscale-0 md:grayscale md:group-hover:grayscale-0" 
                />
                
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white font-heading text-xl font-bold tracking-wider">{drop.name}</p>
                      <p className="text-neon-blue text-sm font-medium mt-1">{drop.price}</p>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-neon-blue hover:text-white transition-colors">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
