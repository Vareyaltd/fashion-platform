"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [showAuth, setShowAuth] = useState(false);
  const [authType, setAuthType] = useState<"login" | "join">("login");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    if (!username || !password) return;
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false
    });
    if (res?.ok) setShowAuth(false);
  };

  const openAuth = (type: "login" | "join") => {
    setAuthType(type);
    setShowAuth(true);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 py-6 px-6 md:px-12 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-heading text-2xl font-bold tracking-wider text-white relative z-50">
            VAREYA
          </Link>

          {/* Links - Desktop */}
          <div className="hidden md:flex items-center gap-10 glass-dark px-8 py-3 rounded-none border border-white/10 relative z-50">
            <Link href="/drops" className="text-sm font-bold uppercase tracking-widest text-silver hover:text-white transition-colors">Drops</Link>
            <Link href="/create" className="text-sm font-bold uppercase tracking-widest text-silver hover:text-neon-purple transition-colors">AI Studio</Link>
            <Link href="/runway" className="text-sm font-bold uppercase tracking-widest text-silver hover:text-neon-blue transition-colors">Runway</Link>
            <Link href="/community" className="text-sm font-bold uppercase tracking-widest text-silver hover:text-white transition-colors">Community</Link>
          </div>

          {/* Right CTA */}
          <div className="flex items-center gap-4 relative z-50">
            {session ? (
              <div className="hidden md:flex items-center gap-4">
                <span className="text-silver font-bold uppercase tracking-widest text-sm">@{session.user?.name}</span>
                <button onClick={() => signOut()} className="text-sm bg-white text-black px-6 py-2 font-bold uppercase tracking-widest hover:bg-neon-purple hover:text-white transition-all">
                  Log Out
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <button onClick={() => openAuth("login")} className="text-sm font-bold uppercase tracking-widest text-white hover:text-neon-blue transition-colors">
                  Log In
                </button>
                <button onClick={() => openAuth("join")} className="text-sm bg-white text-black px-8 py-3 font-bold uppercase tracking-widest hover:bg-neon-blue hover:text-white transition-all">
                  Join
                </button>
              </div>
            )}
            
            {/* Hamburger Button */}
            <button 
              className="md:hidden text-white ml-4 p-2 z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-matte-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 px-6"
          >
            <Link href="/drops" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold uppercase tracking-widest text-white hover:text-neon-blue transition-colors">Drops</Link>
            <Link href="/create" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold uppercase tracking-widest text-white hover:text-neon-purple transition-colors">AI Studio</Link>
            <Link href="/runway" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold uppercase tracking-widest text-white hover:text-neon-blue transition-colors">Runway</Link>
            <Link href="/community" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold uppercase tracking-widest text-white hover:text-neon-purple transition-colors">Community</Link>
            
            <div className="w-full h-px bg-white/10 my-4" />
            
            {session ? (
              <div className="flex flex-col items-center gap-6 w-full">
                <span className="text-silver font-bold uppercase tracking-widest text-xl">@{session.user?.name}</span>
                <button 
                  onClick={() => { signOut(); setMobileMenuOpen(false); }} 
                  className="w-full max-w-xs bg-white text-black px-8 py-4 font-bold uppercase tracking-widest"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                <button 
                  onClick={() => { setMobileMenuOpen(false); openAuth("login"); }} 
                  className="w-full border border-white/20 text-white px-8 py-4 font-bold uppercase tracking-widest"
                >
                  Log In
                </button>
                <button 
                  onClick={() => { setMobileMenuOpen(false); openAuth("join"); }} 
                  className="w-full bg-white text-black px-8 py-4 font-bold uppercase tracking-widest"
                >
                  Join
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal Simulation */}
      <AnimatePresence>
        {showAuth && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuth(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-charcoal border border-white/10 p-10 w-full max-w-md"
            >
              <h2 className="font-heading text-4xl font-bold text-white uppercase tracking-tighter mb-2">
                {authType === "login" ? "Access Portal" : "Join VAREYA"}
              </h2>
              <p className="text-silver mb-8">
                {authType === "login" ? "Enter your credentials to sync your digital identity." : "Create your account to mint your first avatar."}
              </p>

              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/50 border border-white/20 text-white px-6 py-4 focus:outline-none focus:border-neon-blue transition-colors placeholder:text-silver/50" 
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-white/20 text-white px-6 py-4 focus:outline-none focus:border-neon-blue transition-colors placeholder:text-silver/50" 
                />
                
                <button 
                  onClick={handleAuth} 
                  className="w-full bg-white text-black font-bold uppercase tracking-wider py-4 mt-4 hover:bg-neon-blue hover:text-white transition-colors"
                >
                  {authType === "login" ? "Authenticate" : "Initialize Identity"}
                </button>
              </div>

              <button 
                onClick={() => setAuthType(authType === "login" ? "join" : "login")}
                className="w-full text-center mt-6 text-sm text-silver hover:text-white uppercase tracking-widest font-bold"
              >
                {authType === "login" ? "Need an account? Join" : "Have an account? Log In"}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
