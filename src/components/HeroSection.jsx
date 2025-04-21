"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const HeroSection = ({ scrollToNextSection, forwardedRef }) => {
  const [mousePosition, setMousePosition] = useState({ x: 600, y: 400 });
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const targetPosition = useRef({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const [isInSection, setIsInSection] = useState(true);

  // Update screen size on mount and resize
  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateScreenSize = () => {
        const width = window.innerWidth || 0;
        const height = window.innerHeight || 0;
        setScreenSize({ width, height });
        setIsMobile(width < 768);
      };

      updateScreenSize();
      window.addEventListener("resize", updateScreenSize);
      return () => window.removeEventListener("resize", updateScreenSize);
    }
  }, []);

  // Auto-move effect for mobile with random positions
  useEffect(() => {
    if (isMobile && screenSize.width > 0 && screenSize.height > 0) {
      let animationFrame;

      const getRandomPosition = () => {
        const rect = sectionRef.current?.getBoundingClientRect() || {
          width: screenSize.width,
          height: screenSize.height,
          left: 0,
          top: 0,
        };

        const padding = 50;
        const x = padding + Math.random() * (rect.width - 2 * padding);
        const y = padding + Math.random() * (rect.height - 2 * padding);
        return { x, y };
      };

      targetPosition.current = getRandomPosition();

      const animate = () => {
        setMousePosition((prev) => {
          const speed = 0.05;
          const newX = prev.x + (targetPosition.current.x - prev.x) * speed;
          const newY = prev.y + (targetPosition.current.y - prev.y) * speed;

          const distance = Math.sqrt(
            Math.pow(targetPosition.current.x - newX, 2) +
              Math.pow(targetPosition.current.y - newY, 2)
          );

          if (distance < 5) {
            targetPosition.current = getRandomPosition();
          }

          return { x: newX, y: newY };
        });

        animationFrame = requestAnimationFrame(animate);
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isMobile, screenSize]);

  const handleMouseMove = (e) => {
    if (!isMobile && sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
      setIsInSection(true);
    }
  };

  const handleMouseLeave = () => {
    setIsInSection(false);
  };

  const handleMouseEnter = () => {
    setIsInSection(true);
  };

  // Combine refs
  const combineRefs = (el) => {
    sectionRef.current = el;
    if (typeof forwardedRef === "function") {
      forwardedRef(el);
    } else if (forwardedRef) {
      forwardedRef.current = el;
    }
  };

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      ref={combineRefs}
    >
      {/* Grid Background Image */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Image
          src="/Grid2.png"
          alt="Grid Background"
          fill
          className="object-cover"
          priority
        />

        {/* Dark gray overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "#181818", opacity: 0.85 }}
        />

        {/* Black mask that reveals background - confined to section */}
        {/* Black mask that reveals background - confined to section */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundColor: "#181818",
            WebkitMaskImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, transparent 150px, #181818 250px)`,
            //maskImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, transparent 150px, #181818 300px)`,
          }}
        />
      </div>
      {isInSection && (
        <div
          className="absolute pointer-events-none z-50"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Image
            src="/gradient ball.png"
            alt="Custom cursor"
            width={350}
            height={350}
            decoding="async"
            priority
            data-nimg="1"
            className="w-600 h-600"
          />
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/+923006163603"
        target="_blank"
        rel="noopener noreferrer"
        decoding="async"
        priority
        data-nimg="1"
        className="fixed right-10 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition"
        style={{
          bottom: "20px",
          zIndex: 9999,
        }}
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp size={24} />
      </a>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="z-10"
      >
        <Image
          src="/logo.png"
          alt="Hero Image"
          width={600}
          height={600}
          className=" w-[300px] sm:w-[275px] md:w-[325px] lg:w-[400px] h-auto"
          decoding="async"
          priority
          data-nimg="1"
        />
      </motion.div>

      {/* Scroll Down Button */}
      <motion.button
        type="button"
        className="absolute bottom-10 flex flex-col items-center text-white z-10"
        onClick={scrollToNextSection}
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{
          opacity: 1,
          y: [0, 10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          opacity: { duration: 0.5, ease: "easeOut" },
          y: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
          scale: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
        }}
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll to next section"
      >
        <ChevronDown size={32} className="text-white opacity-80" />
      </motion.button>
    </section>
  );
};

export default HeroSection;
