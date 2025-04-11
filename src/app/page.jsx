"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { motion } from "framer-motion";
import { Outfit } from "next/font/google";
import FramerMotionVideoGallery from "@/components/FramerMotionVideoGallery";
import ScrollingText from "@/components/ScrollingTestimonials";
import Pitch from "@/components/Pitch";
import VideoSlider from '@/components/VideoSlider';
import HeroSection from '@/components/HeroSection';

// Initialize Outfit font
const outfit = Outfit({
  subsets: ["latin"],
  weight: "700",
});

const defaultVideos = [
  {
    src: "/videos/video3.mp4",
    logo: "",
    title: "Professor Dr Javed Iqbal",
  },
  {
    src: "/videos/video1.mp4",
    logo: "/client logos/logo8.png", 
    title: "Imtiaz Rastgar",
  },
  {
    src: "/videos/video2.mp4",
    logo: "/client logos/logo11.png",
    title: "Value Engineering",
  },
];

export default function Home() {
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
      <HeroSection 
        scrollToNextSection={scrollToNextSection} 
        forwardedRef={sectionRefs.current[0]} 
      />

      {/* Testimonials Section */}
      <section ref={sectionRefs.current[1]}>
        <ScrollingText text="TESTIMONIALS" />
      </section>

      {/* Video Slider Section */}
      <VideoSlider videos={defaultVideos} autoSlide={true} />

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
                decoding="async"
                loading="lazy"
                data-nimg="1"
              />
            </div>
            <div className="flex-shrink-0 mx-5 flex items-center justify-center">
              <Image
                src="/client logos/logo2.png"
                alt="Logo 2"
                width={100}
                height={50}
                className="h-auto object-contain"
                decoding="async"
                loading="lazy"
                data-nimg="1"
              />
            </div>
            <div className="flex-shrink-0 mx-5">
              <Image
                src="/client logos/logo3.png"
                alt="Logo 3"
                width={100}
                height={50}
                className="h-auto object-contain"
                decoding="async"
                loading="lazy"
                data-nimg="1"
              />
            </div>
            <div className="flex-shrink-0 mx-5 flex items-center justify-center">
              <Image
                src="/client logos/logo4.png"
                alt="Logo 4"
                width={100}
                height={50}
                className="h-auto object-contain"
                decoding="async"
                loading="lazy"
                data-nimg="1"
              />
            </div>
            <div className="flex-shrink-0 mx-5">
              <Image
                src="/client logos/logo5.png"
                alt="Logo 5"
                width={100}
                height={50}
                decoding="async"
                loading="lazy"
                data-nimg="1"
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5 flex items-center justify-center">
              <Image
                src="/client logos/logo6.png"
                alt="Logo 6"
                width={100}
                height={50}
                decoding="async"
                loading="lazy"
                data-nimg="1"
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5">
              <Image
                src="/client logos/logo7.png"
                alt="Logo 7"
                width={100}
                height={50}
                decoding="async"
                loading="lazy"
                data-nimg="1"
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5">
              <Image
                src="/client logos/logo8.png"
                alt="Logo 8"
                width={100}
                height={50}
                decoding="async"
                loading="lazy"
                data-nimg="1"
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5">
              <Image
                src="/client logos/logo9.png"
                alt="Logo 9"
                width={100}
                height={50}
                decoding="async"
                loading="lazy"
                data-nimg="1"
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5">
              <Image
                src="/client logos/logo10.png"
                alt="Logo 10"
                width={100}
                height={50}
                decoding="async"
                loading="lazy"
                data-nimg="1"
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5 flex items-center justify-center">
              <Image
                src="/client logos/logo11.png"
                alt="Logo 11"
                width={100}
                height={50}
                decoding="async"
                loading="lazy"
                data-nimg="1"
                className="h-auto object-contain"
              />
            </div>
            <div className="flex-shrink-0 mx-5">
              <Image
                src="/client logos/logo1.png"
                alt="Logo 1"
                width={100}
                height={50}
                decoding="async"
                loading="lazy"
                data-nimg="1"
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