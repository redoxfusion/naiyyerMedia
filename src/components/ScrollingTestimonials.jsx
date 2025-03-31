'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Outfit } from "next/font/google";

// Load Outfit font
const outfit = Outfit({
  weight: ["200", "400", "600"],
  subsets: ["latin"],
  display: "swap",
});

const ScrollingText = ({ text }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Adjusted scroll speeds for full-width effect
  const row1X = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const row2X = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={containerRef}
      className="w-full bg-black relative overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center relative w-full">
        {/* Row 1 - Filled Text */}
        <motion.div 
          className="whitespace-nowrap w-[200vw] flex"
          style={{ x: row1X }}
        >
          {Array(8).fill("").map((_, i) => (
            <span 
              key={`row1-${i}`} 
              className={`${outfit.className} text-4xl sm:text-5xl md:text-6xl font-semibold text-gray-300 inline-block mx-4 tracking-wide leading-none`}
            >
              {text}
            </span>
          ))}
        </motion.div>
        
        {/* Row 2 - Outline Text */}
        <motion.div 
          className="whitespace-nowrap w-[200vw] flex"
          style={{ x: row2X }}
        >
          {Array(8).fill("").map((_, i) => (
            <span 
              key={`row2-${i}`}
              className={`${outfit.className} text-4xl sm:text-5xl md:text-6xl font-semibold inline-block mx-4 tracking-wide leading-none`}
              style={{ 
                WebkitTextStroke: '1px #f5f5f5',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {text}
            </span>
          ))}
        </motion.div>
        
        {/* Gradient Overlay */}
        <div 
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,1) 100%)'
          }}
        />
      </div>
    </section>
  );
};

export default ScrollingText;