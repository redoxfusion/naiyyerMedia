import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

// Sample data as fallback if no props are provided
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

const FramerMotionVideoGallery = ({ sliderVideos = defaultVideos }) => {
  // Progress bar animation using framer-motion scroll
  const { scrollYProgress } = useScroll();
  
  return (
    <section id="framer-motion-video-gallery" className="relative">
      {sliderVideos.map((video, index) => (
        <section key={index} className="video-container">
          <div className="video-wrapper">
            <video
              src={video.src}
              autoPlay
              loop
              muted
              playsInline
              className="video-element"
            />
            
            {/* Video overlay content */}
            <div className="content-overlay">
              {/* Logo */}
              {video.logo && video.logo.trim() !== "" && (
                <div className="logo-container">
                  <Image
                    src={video.logo.trim()}
                    alt={`${video.title} Logo`}
                    width={150}
                    height={150}
                    className="logo-image"
                    priority
                  />
                </div>
              )}
              
              {/* Title with animation */}
              <VideoTitleAnimation title={video.title} number={index + 1} />
            </div>
          </div>
        </section>
      ))}
      
      <style jsx global>{`
        html {
          scroll-snap-type: y mandatory;
        }
        .video-container {
          height: 100vh;
          scroll-snap-align: start;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .video-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        .video-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .content-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
        }
        .logo-container {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 20;
          max-width: 150px;
        }
        @media (min-width: 640px) {
          .logo-container {
            top: 1.5rem;
            left: 1.5rem;
          }
        }
        .logo-image {
          width: 4rem;
          height: auto;
          object-fit: contain;
        }
        @media (min-width: 640px) {
          .logo-image {
            width: 5rem;
          }
        }
        @media (min-width: 768px) {
          .logo-image {
            width: 6rem;
          }
        }
        .progress {
          position: fixed;
          left: 0;
          right: 0;
          height: 5px;
          background: var(--accent, #ff0080);
          bottom: 50px;
          z-index: 50;
        }
      `}</style>
    </section>
  );
};

// Separate component for title animation
const VideoTitleAnimation = ({ title, number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  
  return (
    <div ref={ref} className="absolute bottom-16 left-6 right-6 sm:left-10 sm:right-10 md:left-16 md:right-16">
      <motion.h1 
        style={{ y }}
        className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
      >
        {title}
      </motion.h1>
    </div>
  );
};

export default FramerMotionVideoGallery;