"use client";

import Navbar from "@/components/layout/Navbar";
import { useState, useEffect } from "react";
import { getPosts, createPost } from "@/app/actions";
import { useSession } from "next-auth/react";

const posts = [
  { id: 1, author: "@X_AE_A", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop", content: "Just minted the new Void Jacket. The 3D render is insane on my avatar.", likes: 124, time: "2h ago" },
  { id: 2, author: "@NeonDreams", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop", content: "Who's pulling up to the Neo-Tokyo showcase tonight? I have extra VIP access if anyone needs.", likes: 89, time: "4h ago" },
  { id: 3, author: "@Cyber_Tailor", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop", content: "AI Studio just generated my next physical collection. The prompt was 'Glassmorphic streetwear'. Output is crazy.", likes: 342, time: "5h ago" },
];

export default function CommunityPage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<any[]>([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const p = await getPosts();
      setPosts(p);
    };
    fetchPosts();
  }, []);

  const handlePost = async () => {
    if (!content.trim() || !session) return;
    await createPost(content);
    setContent("");
    const p = await getPosts();
    setPosts(p);
  };
  return (
    <main className="min-h-screen bg-matte-black selection:bg-neon-purple selection:text-white pt-32 pb-20">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6">
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter mb-12 text-center">
          The <span className="text-neon-blue">Network.</span>
        </h1>

        <div className="bg-charcoal border border-white/10 p-6 mb-12">
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={!session}
            placeholder={session ? "Share your digital fit, drops, or thoughts..." : "Log in to post..."} 
            className="w-full bg-transparent text-white focus:outline-none resize-none h-24 font-sans placeholder:text-silver/50 disabled:opacity-50"
          />
          <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-2">
            <button className="text-silver hover:text-white text-sm uppercase tracking-widest font-bold">Attach 3D Asset</button>
            <button onClick={handlePost} disabled={!session || !content.trim()} className="bg-white text-black px-8 py-2 font-bold uppercase tracking-wider hover:bg-neon-blue hover:text-white transition-colors disabled:opacity-50">
              Post
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {posts.length === 0 && <p className="text-center text-silver">No posts yet. Be the first to share your aesthetic!</p>}
          {posts.map(post => (
            <div key={post.id} className="bg-charcoal/50 border border-white/5 p-6 flex gap-6 hover:border-white/20 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue font-bold uppercase">
                {post.author.username[0]}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-white">@{post.author.username}</p>
                  <p className="text-silver text-xs">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
                <p className="text-silver mb-4 font-sans">{post.content}</p>
                {post.image && (
                  <img src={post.image} alt="Post asset" className="w-full max-h-96 object-cover rounded-lg mb-4" />
                )}
                <div className="flex gap-6 text-silver text-sm font-bold uppercase tracking-widest">
                  <button className="hover:text-neon-purple transition-colors">Like ({post.likes})</button>
                  <button className="hover:text-white transition-colors">Reply</button>
                  <button className="hover:text-white transition-colors">Repost</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
