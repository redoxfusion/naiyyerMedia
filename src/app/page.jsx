"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { motion } from "framer-motion";
import { Outfit } from "next/font/google";
import FramerMotionVideoGallery from "@/components/FramerMotionVideoGallery";
import ScrollingText from "@/components/ScrollingTestimonials";
import Pitch from "@/components/Pitch";
import { FaWhatsapp } from "react-icons/fa";
// Initialize Outfit font
const outfit = Outfit({
  subsets: ["latin"],
  weight: "700",
});

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const targetPosition = useRef({ x: 0, y: 0 }); // Store the target position for smooth movement

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateScreenSize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        setScreenSize({ width, height });
        setIsMobile(width < 768); // Consider mobile if width is less than 768px
      };

      updateScreenSize(); // Initial check
      window.addEventListener("resize", updateScreenSize);
      return () => window.removeEventListener("resize", updateScreenSize);
    }
  }, []);

  // Auto-move effect for mobile with random positions
  useEffect(() => {
    if (isMobile) {
      let animationFrame;

      // Function to generate a new random target position within screen bounds
      const getRandomPosition = () => {
        const padding = 50; // Keep the position away from the edges
        const x = padding + Math.random() * (screenSize.width - 2 * padding);
        const y = padding + Math.random() * (screenSize.height - 2 * padding);
        return { x, y };
      };

      // Set initial target position
      targetPosition.current = getRandomPosition();

      const animate = () => {
        setMousePosition((prev) => {
          // Smoothly interpolate toward the target position
          const speed = 0.01; // Adjust speed of movement (0 to 1, lower = slower)
          const newX = prev.x + (targetPosition.current.x - prev.x) * speed;
          const newY = prev.y + (targetPosition.current.y - prev.y) * speed;

          // Check if the position is close enough to the target
          const distance = Math.sqrt(
            Math.pow(targetPosition.current.x - newX, 2) +
              Math.pow(targetPosition.current.y - newY, 2)
          );

          // If close to the target, set a new random target
          if (distance < 5) {
            targetPosition.current = getRandomPosition();
          }

          return { x: newX, y: newY };
        });

        // Request the next frame
        animationFrame = requestAnimationFrame(animate);
      };

      animationFrame = requestAnimationFrame(animate);

      // Cleanup on unmount
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isMobile, screenSize]);

  const handleMouseMove = (e) => {
    if (!isMobile) {
      // Only update mouse position on desktop
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const sectionRefs = useRef([
    useRef(null), // First section (hero)
    useRef(null), // Second section (testimonials)
    useRef(null), // Third section (video gallery)
  ]);

  const scrollToNextSection = () => {
    if (sectionRefs.current[1] && sectionRefs.current[1].current) {
      sectionRefs.current[1].current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Hero Section with Grid Background */}
      <section
        className="relative w-full min-h-screen flex items-center justify-center"
        onMouseMove={handleMouseMove}
        ref={sectionRefs.current[0]}
      >
        {/* Grid Background Image */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <Image
            src="/grid.png"
            alt="Grid Background"
            fill
            className="object-cover"
            priority
          />

          {/* Black mask that reveals background - FIXED GRADIENT VALUES */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-black"
            style={{
              WebkitMaskImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, transparent 150px, rgba(0, 0, 0, 0.9) 300px)`,
              maskImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, transparent 150px, rgba(0, 0, 0, 0.9) 300px)`,
            }}
          ></div>
        </div>

        {/* WhatsApp button */}
        <a
          href="https://wa.me/+923006163603"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed right-10 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition"
          style={{
            bottom: 20 + "px", // 20px above the footer
            zIndex: 9999, // Ensure it's above other elements
          }}
        >
          <FaWhatsapp size={24} />
        </a>

        {/* Crosshair and coordinates (visible on both mobile and desktop) */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div
            className="absolute w-12 h-12 rounded-full shadow-lg"
            style={{
              left: `${mousePosition.x - 6}px`,
              top: `${mousePosition.y - 6}px`,
              background:
                "radial-gradient(circle, rgba(255, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%)",
              boxShadow: "0 0 15px 5px rgba(255, 0, 0, 0.3)",
            }}
          ></div>
          
        </div>

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
            className="w-[300px] sm:w-[275px] md:w-[325px] lg:w-[400px] h-auto"
            decoding="async"
            loading="lazy"
            data-nimg="1"
          />
        </motion.div>

        {/* Scroll down button */}
        <motion.button
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
        >
          <ChevronDown size={32} className="text-white opacity-80" />
        </motion.button>
      </section>

      {/* Testimonials Section */}
      <section ref={sectionRefs.current[1]}>
        <ScrollingText text="TESTIMONIALS" />
      </section>

      {/* Video Slider Section */}
      <section ref={sectionRefs.current[2]}>
        <FramerMotionVideoGallery />
      </section>

      {/* Philosophy Section */}
      <section>
        <ScrollingText text="PHILOSOPHY" />
      </section>

      {/* Pitch */}
      <section>
        <Pitch />
      </section>

      {/* Logos Section */}
      <section className="w-full bg-black py-10 flex justify-center items-center overflow-hidden">
        <div className="overflow-hidden w-11/12 max-w-screen-xl relative">
          <div className="flex whitespace-nowrap animate-marquee">
            <div className="flex-shrink-0 mx-5">
              <Image
                src="/client logos/logo1.png"
                alt="Logo 1"
                width={100}
                height={50}
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5 flex items-center justify-center">
              <Image
                src="/client logos/logo2.png"
                alt="Logo 2"
                width={100}
                height={50}
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5">
              <Image
                src="/client logos/logo3.png"
                alt="Logo 3"
                width={100}
                height={50}
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5 flex items-center justify-center">
              <Image
                src="/client logos/logo4.png"
                alt="Logo 4"
                width={100}
                height={50}
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5">
              <Image
                src="/client logos/logo5.png"
                alt="Logo 5"
                width={100}
                height={50}
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5 flex items-center justify-center">
              <Image
                src="/client logos/logo6.png"
                alt="Logo 6"
                width={100}
                height={50}
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5">
              <Image
                src="/client logos/logo7.png"
                alt="Logo 7"
                width={100}
                height={50}
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5">
              <Image
                src="/client logos/logo8.png"
                alt="Logo 8"
                width={100}
                height={50}
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5">
              <Image
                src="/client logos/logo9.png"
                alt="Logo 9"
                width={100}
                height={50}
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5">
              <Image
                src="/client logos/logo10.png"
                alt="Logo 10"
                width={100}
                height={50}
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5 flex items-center justify-center">
              <Image
                src="/client logos/logo11.png"
                alt="Logo 11"
                width={100}
                height={50}
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5">
              <Image
                src="/client logos/logo1.png"
                alt="Logo 1"
                width={100}
                height={50}
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5 flex items-center justify-center">
              <Image
                src="/client logos/logo2.png"
                alt="Logo 2"
                width={100}
                height={50}
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5">
              <Image
                src="/client logos/logo3.png"
                alt="Logo 3"
                width={100}
                height={50}
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5 flex items-center justify-center">
              <Image
                src="/client logos/logo4.png"
                alt="Logo 4"
                width={100}
                height={50}
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5">
              <Image
                src="/client logos/logo5.png"
                alt="Logo 5"
                width={100}
                height={50}
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5 flex items-center justify-center">
              <Image
                src="/client logos/logo6.png"
                alt="Logo 6"
                width={100}
                height={50}
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5">
              <Image
                src="/client logos/logo7.png"
                alt="Logo 7"
                width={100}
                height={50}
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5">
              <Image
                src="/client logos/logo8.png"
                alt="Logo 8"
                width={100}
                height={50}
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5">
              <Image
                src="/client logos/logo9.png"
                alt="Logo 9"
                width={100}
                height={50}
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5">
              <Image
                src="/client logos/logo10.png"
                alt="Logo 10"
                width={100}
                height={50}
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5 flex items-center justify-center">
              <Image
                src="/client logos/logo11.png"
                alt="Logo 11"
                width={100}
                height={50}
                className="h-auto object-contain"
              />
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-marquee {
            display: flex;
            animation: marquee 30s linear infinite;
            width: max-content;
          }
        `}</style>
      </section>
      <section>
        <YouTubeEmbed />
      </section>
    </div>
  );
}