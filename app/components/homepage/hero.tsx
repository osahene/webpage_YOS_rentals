"use client";

import { useLayoutEffect, useRef, useState } from "react";
// import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaArrowDown,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCar,
} from "react-icons/fa";
import Typewriter from "../homepage/Typewriter";
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  // const [mounted, setMounted] = useState(false);
  const carRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    pickup: "",
    dropoff: "",
    startDate: "",
    endDate: "",
  });

  useLayoutEffect(() => {
    gsap.from(textRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.to(".scroll-indicator", {
      y: 10,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    gsap.to(carRef.current, {
      y: -120,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        scrub: true,
        start: "top top",
        end: "bottom top",
      },
    });
    ScrollTrigger.refresh();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-img flex flex-col items-center justify-center
                 bg-linear-to-b from-black to-neutral-900 overflow-hidden"
    >
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div ref={textRef} className="text-white space-y-6">
          <div className="text-center mb-10 hero-content">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
              YOS Car Rentals
            </h1>
            <div className="text-xl md:text-2xl text-gray-600 mb-2">
              We offer you{" "}
              <span className="inline-block min-w-75 h-8">
                <Typewriter
                  phrases={[
                    "affordable service",
                    "reliable service",
                    "unforgettable experience",
                  ]}
                />
              </span>
            </div>
          </div>
        </div>

        {/* Car Image */}
        {/* <div ref={carRef} className="relative w-full h-75 md:h-105">
          <Image
            src="/assets/range.png" // place in /public
            alt="Luxury car"
            fill
            sizes="100"
            className="object-contain"
            priority
          />
        </div> */}
      </div>
      {/* start form */}
      {/* Booking Form */}
      <div
        ref={formRef}
        className="bg-white/80 w-[80%] backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl hero-content"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Pickup Location */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Location
              </label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Where to pick you up?"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.pickup}
                  onChange={(e) =>
                    setFormData({ ...formData, pickup: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Dropoff Location */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dropoff Location
              </label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Where to drop you off?"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.dropoff}
                  onChange={(e) =>
                    setFormData({ ...formData, dropoff: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Start Date */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="datetime-local"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
              </div>
            </div>

            {/* End Date */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="datetime-local"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto space-x-2"
            >
              <FaCar />
              <span>Find Your Perfect Ride</span>
            </button>
          </div>
        </form>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hero-content">
        <div className="scroll-indicator flex flex-col items-center space-y-2">
          <span className="text-sm text-gray-500">Scroll to explore</span>
          <FaArrowDown className="text-gray-400 animate-bounce" />
        </div>
      </div>
      {/* end form */}
    </section>
  );
}
