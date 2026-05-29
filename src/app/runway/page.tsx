"use client";

import Navbar from "@/components/layout/Navbar";
import { useState, useEffect, useRef } from "react";
import { getMessages, sendMessage, getCurrentEvent } from "@/app/actions";
import { useSession } from "next-auth/react";

export default function RunwayPage() {
  const { data: session } = useSession();
  const [vipPurchased, setVipPurchased] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  const [event, setEvent] = useState<any>(null);

  // Poll for messages and event data
  useEffect(() => {
    const fetchData = async () => {
      const msgs = await getMessages();
      setMessages(msgs);
      const currentEvent = await getCurrentEvent();
      setEvent(currentEvent);
    };
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async () => {
    if (!chatInput.trim() || !session) return;
    const text = chatInput;
    setChatInput("");
    // Optimistic update
    setMessages((prev) => [...prev, { id: "temp", content: text, author: { username: session.user?.name } }]);
    await sendMessage(text, "neo-tokyo"); // Hardcoded event ID for demo
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <main className="min-h-screen bg-matte-black selection:bg-neon-blue selection:text-white pt-32 pb-20 overflow-hidden relative">
      <Navbar />

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-neon-blue/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 border-b border-white/10 pb-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className={`w-3 h-3 rounded-full animate-pulse ${event?.status === 'Live' ? 'bg-red-500' : 'bg-neon-blue'}`} />
              <span className={`${event?.status === 'Live' ? 'text-red-500' : 'text-neon-blue'} font-bold uppercase tracking-widest text-sm`}>
                {event?.status === 'Live' ? 'Live Event' : 'Upcoming Event'}
              </span>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter">
              {event?.title ? event.title.split(' ')[0] : 'UPCOMING'} <br/>
              <span className="text-transparent" style={{ WebkitTextStroke: '1px #00f0ff' }}>
                {event?.title ? event.title.split(' ').slice(1).join(' ') : 'SHOWCASE'}
              </span>
            </h1>
          </div>
          <div className="text-right">
            <p className="text-silver font-heading uppercase tracking-widest text-sm mb-2">Featuring Creator</p>
            <p className="text-white text-2xl font-bold">@{event?.creator || 'USER'}</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Stage Simulation */}
          <div ref={videoRef} className="w-full lg:w-2/3 aspect-video bg-black border border-white/10 relative group overflow-hidden flex items-center justify-center">
            {event?.videoUrl ? (
              <video 
                src={event.videoUrl} 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full relative">
                <video 
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-60 mix-blend-luminosity scale-105 group-hover:scale-100 transition-transform duration-1000"
                />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div className="glass-dark px-4 py-2 flex items-center gap-4">
                <span className={`w-2 h-2 rounded-full animate-pulse ${event?.status === 'Live' ? 'bg-red-500' : 'bg-neon-blue'}`} />
                <span className="text-white font-bold">{event?.status === 'Live' ? (event.viewers > 0 ? event.viewers.toLocaleString() : "12,450") : "0"}</span>
                <span className="text-silver text-sm uppercase tracking-widest">Watching</span>
              </div>
              <button onClick={toggleFullscreen} className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-3 hover:bg-white hover:text-black transition-colors">
                [ {isFullscreen ? "Exit Fullscreen" : "Fullscreen"} ]
              </button>
            </div>
          </div>

          {/* VIP Tickets & Chat */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <div className="bg-charcoal p-8 border border-neon-blue/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/20 blur-3xl" />
              <h3 className="font-heading text-2xl font-bold text-white uppercase mb-2 relative z-10">VIP Access</h3>
              <p className="text-silver text-sm mb-6 relative z-10">Unlock exclusive backstage 3D angles and claim the limited drop during the show.</p>
              
              {!vipPurchased ? (
                <button 
                  onClick={() => setVipPurchased(true)}
                  className="w-full bg-neon-blue text-black font-bold uppercase tracking-wider py-4 hover:bg-white transition-colors relative z-10"
                >
                  Buy VIP Ticket ({event?.ticketPrice || 0.1} {event?.ticketCurrency || 'ETH'})
                </button>
              ) : (
                <div className="w-full border border-neon-blue text-neon-blue font-bold uppercase tracking-wider py-4 text-center relative z-10 bg-neon-blue/10">
                  Access Granted
                </div>
              )}
            </div>

            <div className="flex-1 bg-charcoal border border-white/5 p-6 flex flex-col min-h-[300px]">
              <h3 className="font-heading text-sm text-silver font-bold uppercase tracking-widest mb-4">Live Chat</h3>
              <div className="flex-1 space-y-4 mb-4 opacity-80 overflow-y-auto max-h-[300px]">
                {messages.length === 0 && <p className="text-silver/50">No messages yet. Be the first to type!</p>}
                {messages.map((msg, i) => (
                  <p key={i}>
                    <span className="text-neon-blue font-bold">@{msg.author?.username}:</span> {msg.content}
                  </p>
                ))}
              </div>
              <div className="mt-auto flex border border-white/20">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={session ? "Send a message..." : "Log in to chat"} 
                  disabled={!session}
                  className="flex-1 bg-transparent px-4 py-2 text-white focus:outline-none disabled:opacity-50" 
                />
                <button onClick={handleSend} disabled={!session || !chatInput.trim()} className="px-4 text-silver hover:text-white disabled:opacity-50">SEND</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
