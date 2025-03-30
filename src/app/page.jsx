"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { motion } from "framer-motion";
import { Outfit } from "next/font/google";
import FramerMotionVideoGallery from "@/components/FramerMotionVideoGallery";
import ScrollingText from "@/components/ScrollingTestimonials";
import SocialMediaTiles from "@/components/SocialMediaTiles";
import Pitch from "@/components/Pitch";


// Initialize Outfit font with weight 700
const outfit = Outfit({
  subsets: ["latin"],
  weight: "700",
});
export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });

      const handleResize = () => {
        setScreenSize({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderVideos.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + sliderVideos.length) % sliderVideos.length
    );
  };

  // Add this near the top of your component where other useRefs are defined
  const sectionRefs = useRef([
    useRef(null), // First section (hero)
    useRef(null), // Second section (testimonials)
    useRef(null), // Third section (video gallery)
  ]);

  // Then modify the scrollToNextSection function to:
  const scrollToNextSection = () => {
    // Scroll to the testimonials section (index 1)
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
            src="/grid.png" // Update this path to your actual grid image
            alt="Grid Background"
            fill
            className="object-cover"
            priority
          />

          {/* Black mask that reveals background on hover */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-black"
            style={{
              WebkitMaskImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, transparent 50px, rgba(0, 0, 0, 0.9) 30px)`,
              maskImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, transparent 50px, rgba(0, 0, 0, 0.9) 30px)`,
            }}
          ></div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div
            className="absolute bg-red-600/50 h-[1px] w-full flex items-center"
            style={{ top: `${mousePosition.y}px` }}
          >
            {Array.from({ length: screenSize.width / 50 }).map((_, i) => (
              <div
                key={`h-scale-${i}`}
                className="h-2 w-[1px] bg-red-600"
                style={{ marginLeft: "50px" }}
              ></div>
            ))}
          </div>
          <div
            className="absolute bg-red-600/50 w-[1px] h-full flex flex-col items-center"
            style={{ left: `${mousePosition.x}px` }}
          >
            {Array.from({ length: screenSize.height / 50 }).map((_, i) => (
              <div
                key={`v-scale-${i}`}
                className="w-2 h-[1px] bg-red-600"
                style={{ marginTop: "50px" }}
              ></div>
            ))}
          </div>
          <div
            className="absolute w-2 h-2 bg-red-600 rounded-full"
            style={{
              left: `${mousePosition.x - 1}px`,
              top: `${mousePosition.y - 1}px`,
            }}
          ></div>
          <div
            className="absolute bg-black text-white text-xs px-2 py-1 rounded-md"
            style={{
              left: `${mousePosition.x + 10}px`,
              top: `${mousePosition.y + 10}px`,
            }}
          >
            X: {mousePosition.x}, Y: {mousePosition.y}
          </div>
        </div>

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
          />
        </motion.div>

        <motion.button
          className="absolute bottom-10 flex flex-col items-center text-white z-10"
          onClick={scrollToNextSection}
          initial={{ opacity: 0, y: 20, scale: 0.8 }} // Start: hidden, below, and scaled down
          animate={{
            opacity: 1, // Fade in
            y: [0, 10, 0], // Bounce up and down
            scale: [1, 1.05, 1], // Subtle scale pulse
          }}
          transition={{
            opacity: { duration: 0.5, ease: "easeOut" }, // Fade-in on load
            y: { repeat: Infinity, duration: 1.2, ease: "easeInOut" }, // Bounce loop
            scale: { repeat: Infinity, duration: 1.2, ease: "easeInOut" }, // Scale loop
          }}
          whileHover={{
            scale: 1.1, // Scale up on hover (matches existing hover:scale-110)
            transition: { duration: 0.3, ease: "easeInOut" }, // Smooth hover transition
          }}
          whileTap={{ scale: 0.95 }} // Scale down slightly when clicked
        >
          <ChevronDown size={32} className="text-white opacity-80" />
        </motion.button>
      </section>

      {/* Testimonials Section - ADDED THIS SECTION AFTER HERO */}
      <section ref={sectionRefs.current[1]}>
      <ScrollingText text="TESTIMONIALS" />
      </section>

      {/* Video Slider Section */}
      <section ref={sectionRefs.current[2]}>
        <FramerMotionVideoGallery />
      </section>
      {/* Testimonials Section - ADDED THIS SECTION AFTER HERO */}
      <section ref={sectionRefs.current[1]}>
      <ScrollingText text="Philosophy" />
      </section>
      {/* Pitch */}
      <section>
        <Pitch/>
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
