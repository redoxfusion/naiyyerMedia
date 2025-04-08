"use client";
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <div className="w-full px-6 sm:px-10 py-10 bg-gray-900 text-gray-300 flex flex-col items-center gap-4 text-center">
      {/* Logo */}
      <div className="text-4xl sm:text-5xl font-bold text-white">
        <Image
          src="/logo.png"
          alt="Logo"
          width={400}
          height={100}
          priority
        />
      </div>
      
      {/* Copyright & Contact */}
      <div className="text-xs sm:text-sm font-medium">Copyright © 2025</div>
      <div className="text-xs sm:text-sm font-medium">Queries@naiyyerMedia.com</div>
      
      {/* Social Media Icons */}
      <div className="flex gap-4 mt-4">
        <a href="https://www.facebook.com/naiyyermedia" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
          <Facebook size={24} />
        </a>
        <a href="https://www.twitter.com/naiyyermedia" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
          <Twitter size={24} />
        </a>
        <a href="https://www.linkedin.com/company/naiyyermedia/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-700">
          <Linkedin size={24} />
        </a>
        <a href="https://www.instagram.com/naiyyer" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500">
          <Instagram size={24} />
        </a>
      </div>
    </div>
  );
}
