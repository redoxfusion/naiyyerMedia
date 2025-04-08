"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Link from 'next/link';
import React from "react";

const CameraModel = () => {
  const { scene } = useGLTF("/camera.glb"); // Ensure camera.glb is in /public
  return <primitive object={scene} scale={0.7} position={[0, -1, 0]} />; // Lowered model
};

const Pitch = () => {
  return (
    <section className="relative w-screen min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 gap-10">
        {/* Left Side: Text and Buttons */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            We unlock your brand’s potential to scale using content, marketing &
            tech.
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Nayyer Media is an highly skilled creative company that helps brands
            with advertising campaigns, video production, influencer marketing,
            social media a lot more.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {/* Schedule a Call Button */}
              <Link href="/contact">
                <button className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition">
                  Schedule a Call
                </button>
              </Link>

              {/* Our Work Button */}
              <Link href="/ourServices">
                <button className="border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition">
                  Our Work
                </button>
              </Link>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center h-[400px]">
          <Canvas
            camera={{ position: [0, 0, 10], fov: 50 }}
            className="rounded-xl"
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 2]} intensity={1} />
            <CameraModel />
            <OrbitControls enableZoom={false} />

            {/* Glow Effect */}
            <EffectComposer>
              <Bloom
                luminanceThreshold={0}
                luminanceSmoothing={0.9}
                intensity={1.5}
              />
            </EffectComposer>
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default Pitch;
