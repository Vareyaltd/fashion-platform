"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// A futuristic abstract shape
function AbstractShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[2.5, 0.8, 200, 40]} />
        <meshStandardMaterial 
          color="#050505"
          metalness={1}
          roughness={0.1}
          envMapIntensity={3}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.1} />
        <spotLight position={[10, 15, 10]} angle={0.2} penumbra={1} intensity={2} color="#ffffff" />
        
        {/* Neon Accents */}
        <pointLight position={[-5, 2, -2]} intensity={20} color="#00f0ff" />
        <pointLight position={[5, -2, -2]} intensity={20} color="#b026ff" />
        
        {/* Environment Reflections */}
        <Environment preset="city" />
        
        <AbstractShape />
        
        {/* Floating Particles */}
        <Sparkles count={300} scale={15} size={1.5} speed={0.3} opacity={0.5} color="#ffffff" />
      </Canvas>
      
      {/* Vignette & Fog Gradient */}
      <div className="absolute inset-0 bg-radial from-transparent to-matte-black/60 pointer-events-none" />
      <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-matte-black to-transparent pointer-events-none" />
    </div>
  );
}
