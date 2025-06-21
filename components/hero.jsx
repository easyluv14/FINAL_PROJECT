'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[450px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero.jpg"
        alt="New Collection"
        fill
        className="object-cover"
        priority
      />

      {/* Optional overlay */}
      <div className="absolute inset-0 bg-black/10 z-10" />

      {/* Content - centered with page layout */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-10 text-white">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              NEW<br />COLLECTION
            </h1>
            <p className="mt-2 text-sm md:text-base font-medium">
              SPRING/SUMMER 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
