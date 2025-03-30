"use client";  // Add this at the top

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="w-full min-h-screen bg-zinc-600 overflow-hidden">
      {/* Hero Section */}
      <div
        className="w-full h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <div
          className="absolute w-96 h-96 bg-red-500 opacity-30 blur-3xl rounded-full pointer-events-none"
          style={{
            left: mousePosition.x - 150,
            top: mousePosition.y - 150,
          }}
        />
        <h1 className="text-red-500 text-6xl sm:text-8xl md:text-9xl lg:text-[190px] font-bold font-['Inter'] text-center shadow-md relative">
          logo
        </h1>
      </div>

      {/* Image Section */}
      <div className="relative w-full h-auto">
        <Image
          className="w-full h-auto object-cover"
          src="/placeholder 1.png"
          alt="Placeholder Image"
          width={1512}
          height={753}
          priority
        />
        <div className="absolute inset-0 bg-zinc-300 bg-opacity-30" />
      </div>

      {/* Logo Section */}
      <div className="flex flex-wrap justify-center items-center gap-6 p-6">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-white text-4xl sm:text-6xl font-bold font-['JetBrains_Mono']">
            logo
          </span>
        ))}
      </div>

      {/* Yellow Section */}
      <div className="w-full h-[500px] sm:h-[600px] bg-yellow-500 bg-opacity-60 flex justify-center items-center">
        <div className="bg-black rounded-2xl overflow-hidden max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
          <Image
            className="w-full h-auto object-cover"
            src="/placeholder 2.png"
            alt="Placeholder Image"
            width={1235}
            height={618}
            priority
          />
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
        {[...Array(3)].map((_, i) => (
          <Image
            key={i}
            className="w-full h-auto object-cover"
            src="/placeholder 3.png"
            alt="Placeholder Image"
            width={485}
            height={422}
            priority
          />
        ))}
      </div>
    </div>
  );
}
