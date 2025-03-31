"use client";

import Link from "next/link";
import { useState } from "react";
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

  // Animation variants
  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * custom,
        duration: 0.4,
      },
    }),
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        duration: 0.3,
        type: "spring",
        stiffness: 200,
      },
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#4B5563", // gray-600
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

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
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="bg-gray-900 bg-opacity-90 shadow-md fixed w-full top-0 z-20 py-2">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center h-14">
          {/* Logo - positioned on extreme left */}
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="mr-auto" // This pushes everything else to the right
          >
            <Link href="/" className="text-xl font-bold text-gray-100">
              <Image
                src="/LogoV2.png"
                alt="Logo"
                width={40}
                height={40}
                className="h-auto w-auto"
              />
            </Link>
          </motion.div>

          {/* Desktop Links (Now centered in the remaining space) */}
          <div className="hidden md:flex space-x-10 items-center mx-auto">
            {["Home", "Services", "About", "Contact"].map((item, index) => (
              <motion.div
                key={item}
                custom={index + 1}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -2 }}
              >
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className={`text-lg text-gray-100 hover:text-gray-400 transition duration-300 font-extralight ${outfit.className}`}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Blended "Get in Touch" Button */}
          <motion.div
            className="hidden md:flex"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              href="/contact"
              className={`relative text-lg bg-gray-700 text-gray-200 px-5 py-2 rounded-md transition duration-300 font-extralight ${outfit.className} hover:bg-gray-600 hover:text-white active:scale-95 shadow-md`}
            >
              Get in Touch
            </Link>
          </motion.div>

          {/* Hamburger Button (Mobile) */}
          <motion.div
            className="md:hidden ml-auto" // This pushes it to the right on mobile
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
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
              <motion.div className="px-2 pt-2 pb-3 space-y-2">
                {["Home", "Services", "About", "Contact"].map((item) => (
                  <motion.div key={item} variants={mobileItemVariants}>
                    <Link
                      href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className={`block text-lg text-gray-100 hover:text-gray-300 px-3 py-2 font-extralight transition duration-300 ${outfit.className}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={mobileItemVariants}>
                  <Link
                    href="/contact"
                    className="block text-lg bg-gray-700 text-gray-200 px-5 py-2 rounded-md hover:bg-gray-600 hover:text-white transition duration-300"
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
    </div>
  );
}

