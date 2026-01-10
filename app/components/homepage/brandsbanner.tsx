"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  SiToyota,
  SiMercedes,
  SiLandrover,
  SiHonda,
  SiKia,
  SiBmw,
  SiHyundai,
  SiBentley,
} from "react-icons/si";

const brands = [
  { name: "Mercedes-Benz", logo: SiMercedes },
  { name: "Toyota", logo: SiToyota },
  { name: "Range Rover", logo: SiLandrover },
  { name: "Hyundai", logo: SiHyundai },
  { name: "Honda", logo: SiHonda },
  { name: "KIA", logo: SiKia },
  { name: "BMW", logo: SiBmw },
  { name: "Bentley", logo: SiBentley },
];

export default function BrandsBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    let animation: gsap.core.Tween;
    const startAnimation = () => {
      animation = gsap.to(banner, {
        x: "-50%",
        duration: 30 / scrollSpeed,
        repeat: -1,
        ease: "none",
      });
    };

    startAnimation();

    return () => {
      animation?.kill();
    };
  }, [scrollSpeed]);

  const handleWheel = (e: React.WheelEvent) => {
    if (!isHovered) return;

    e.preventDefault();
    const speed = e.deltaY > 0 ? 0.5 : 2;
    setScrollSpeed(speed);
  };

  return (
    <section className="py-16 bg-linear-to-r from-gray-900 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-4">
            Trusted by Premium Brands
          </h3>
          <p className="text-gray-400">
            We partner with the worlds leading automotive manufacturers
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setScrollSpeed(1);
          }}
          onWheel={handleWheel}
        >
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 w-32 h-full bg-linear-to-r from-gray-900 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-linear-to-l from-gray-900 to-transparent z-10"></div>

          <div
            ref={bannerRef}
            className="flex space-x-16 whitespace-nowrap"
            style={{ width: "max-content" }}
          >
            {/* Double the brands for seamless loop */}
            {[...brands, ...brands].map((brand, index) => {
              const BrandLogo = brand.logo;
              return (
                <div
                  key={`${brand.name}-${index}`}
                  className="inline-flex flex-col items-center justify-center group"
                >
                  <div className="w-32 h-32 rounded-2xl bg-gray-800/50 p-6 flex items-center justify-center group-hover:bg-gray-800/80 transition-all duration-300 transform group-hover:scale-110">
                    {/* Placeholder for brand logos */}
                    <BrandLogo className="text-white text-4xl font-bold" />
                  </div>
                  <span className="mt-4 text-gray-300 font-medium group-hover:text-white transition-colors duration-300">
                    {brand.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {isHovered && (
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm animate-pulse">
              Scroll up/down to control scroll speed
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
