import React from "react";
import { Outfit } from "next/font/google";
import { FaWhatsapp } from "react-icons/fa"
const outfit = Outfit({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
});

export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-black text-white pt-20">
      {/* Contact Title */}
      <h1
        className={`text-3xl md:text-4xl font-bold text-center mt-16 md:mt-20 ${outfit.className}`}
      >
        Get in Touch
      </h1>
      <a
        href="https://wa.me/+923006163603" // Replace with your WhatsApp number
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

      {/* Description */}
      <p
        className={`text-base md:text-lg text-gray-300 text-center max-w-2xl mt-4 ${outfit.className}`}
      >
        We’d love to hear from you! Whether you have questions, want to
        collaborate, or just want to say hello, feel free to fill out the form
        below.
      </p>

      {/* Google Form in a Styled Card */}
      <div className="w-full max-w-3xl bg-gray-800 bg-opacity-80 p-6 rounded-2xl shadow-lg mt-10">
        <iframe
          className="w-full h-96 rounded-lg"
          src="https://docs.google.com/forms/d/e/1FAIpQLSfze28o72THvotxPWc_Wqkb6J98VtprsiI9f7Xh6WhmLhQIpA/viewform?embedded=true"
          width="640"
          height="850"
        >
          Loading…
        </iframe>
      </div>

      {/* Optional Footer */}
      <p className="text-sm text-gray-500 mt-6 mb-4">
        © 2025 Naiyyer Media. All rights reserved.
      </p>
    </div>
  );
}
