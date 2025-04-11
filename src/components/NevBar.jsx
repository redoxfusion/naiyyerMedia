"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Outfit } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

// Load Outfit font
const outfit = Outfit({
  weight: ["200", "400", "600"],
  subsets: ["latin"],
  display: "swap",
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to detect when page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Initial check
    handleScroll();
    
    // Clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Navbar Animation (Appears from Above)
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Mobile Menu Animations
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className={`fixed w-full top-0 z-20 py-2 transition-colors duration-300 ${
        scrolled ? "bg-[#181818] shadow-md" : "bg-transparent"
      }`}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center h-14">
          {/* Logo */}
          <div className="mr-auto">
            <Link href="/">
              <Image
                src="/LogoV2.png"
                alt="Logo"
                width={40}
                height={40}
                priority
              />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-10 items-center mx-auto">
            {["Home", "Our Services", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={
                  item === "Home"
                    ? "/"
                    : item === "Our Services"
                    ? "/ourServices"
                    : `/${item.toLowerCase()}`
                }
                className={`text-lg text-gray-100 hover:text-gray-400 transition duration-300 font-extralight ${outfit.className}`}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Get in Touch Button */}
          <div className="hidden md:flex">
            <Link
              href="/contact"
              className={`text-lg ${scrolled ? "bg-gray-700" : "bg-gray-700 bg-opacity-60 backdrop-blur-sm"} text-gray-200 px-5 py-2 rounded-md transition duration-300 font-extralight hover:bg-gray-600 hover:text-white active:scale-95 shadow-md ${outfit.className}`}
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.div className="md:hidden ml-auto">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-200 hover:text-gray-400 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Menu with AnimatePresence for smooth mounting/unmounting */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div className={`px-2 pt-2 pb-3 space-y-2 ${scrolled ? "" : "bg-gray-900 bg-opacity-90 rounded-lg mt-2"}`}>
                {["Home", "Our Services", "About", "Contact"].map((item) => (
                  <motion.div key={item} variants={mobileItemVariants}>
                    <Link
                      href={
                        item === "Home"
                          ? "/"
                          : item === "Our Services"
                          ? "/ourServices"
                          : `/${item.toLowerCase()}`
                      }
                      className={`block py-1 text-lg text-gray-100 hover:text-gray-400 transition duration-300 font-extralight ${outfit.className}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={mobileItemVariants}>
                  <Link
                    href="/contact"
                    className={`block text-lg ${scrolled ? "bg-gray-700" : "bg-gray-700 bg-opacity-70"} text-gray-200 px-5 py-2 rounded-md hover:bg-gray-600 hover:text-white transition duration-300`}
                    onClick={() => setIsOpen(false)}
                  >
                    Get in Touch
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}