'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollingText = ({ text }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scroll speeds for each row
  const row1X = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const row2X = useTransform(scrollYProgress, [0, 1], [0, 250]);

  return (
    <section 
      ref={containerRef}
      className="w-full bg-black py-24 relative overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center relative">
        
        {/* Row 1 - Filled Text */}
        <motion.div 
          className="whitespace-nowrap"
          style={{ x: row1X }}
        >
          {Array(4).fill("").map((_, i) => (
            <span 
              key={`row1-${i}`} 
              className="text-8xl md:text-9xl font-bold text-gray-300 inline-block mr-6"
            >
              {text}
            </span>
          ))}
        </motion.div>
        
        {/* Row 2 - Outline Text */}
        <motion.div 
          className="whitespace-nowrap"
          style={{ x: row2X }}
        >
          {Array(4).fill("").map((_, i) => (
            <span 
              key={`row2-${i}`}
              className="text-8xl md:text-9xl font-bold inline-block mr-6"
              style={{ 
                WebkitTextStroke: '2px #f5f5f5',
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
            background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,1) 100%)'
          }}
        />
      </div>
    </section>
  );
};

export default ScrollingText;
