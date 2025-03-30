"use client";
import Image from 'next/image';

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
    </div>
  );
}