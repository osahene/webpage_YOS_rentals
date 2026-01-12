"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaStar, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

const cars = [
  {
    id: 1,
    name: "Corolla 2023",
    year: "2013",
    rating: 4.9,
    description: "Luxury sedan with premium features",
    price: "$299/day",
    image: "/image/corolla2013.png", // Changed from .glb to .png
    features: ["Premium Sound", "Heated Seats", "Panoramic Roof"],
  },
  {
    id: 2,
    name: "Honda Civic",
    year: "2017",
    rating: 4.8,
    description: "Sporty SUV with excellent handling",
    price: "$249/day",
    image: "/image/hondacivic.png",
    features: ["Sport Mode", "Premium Interior", "Advanced Safety"],
  },
  {
    id: 3,
    name: "Honda CRV",
    year: "2015",
    rating: 4.7,
    description: "Premium SUV for any terrain",
    price: "$349/day",
    image: "/image/hondacrv.png",
    features: ["All-Terrain", "Luxury Package", "Climate Control"],
  },
  {
    id: 4,
    name: "Toyota RAV4",
    year: "2017",
    rating: 4.6,
    description: "Reliable and fuel-efficient sedan",
    price: "$89/day",
    image: "/image/rav4.png",
    features: ["Fuel Efficient", "Spacious", "Safety Plus"],
  },
];

export default function CarsShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useLayoutEffect(() => {
    // Parallax effect on scroll
    carRefs.current.forEach((card) => {
      if (!card) return;

      gsap.fromTo(
        card,
        {
          y: 100,
          opacity: 0,
          rotationY: -15,
        },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Section title animation
    gsap.from(".section-title", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
    });
    ScrollTrigger.refresh();
  }, []);

  // Simple image hover animation
  useLayoutEffect(() => {
    if (hoveredCard !== null) {
      const imgElement = document.getElementById(`car-image-${hoveredCard}`);
      if (imgElement) {
        gsap.to(imgElement, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    } else {
      // Reset all images
      cars.forEach((car) => {
        const imgElement = document.getElementById(`car-image-${car.id}`);
        if (imgElement) {
          gsap.to(imgElement, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });
    }
  }, [hoveredCard]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-4 bg-linear-to-b from-gray-900 to-black"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-white">Premium</span> Collection
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Choose from our curated selection of premium vehicles, each
            meticulously maintained for your comfort and safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {cars.map((car, index) => (
            <div
              key={car.id}
              ref={(el) => {
                carRefs.current[index] = el;
              }}
              className="group perspective-1000 cursor-pointer"
              onMouseEnter={() => setHoveredCard(car.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:-translate-y-2 backface-hidden border border-gray-700">
                {/* Car Image Container */}
                <div className="h-48 mb-6 rounded-xl overflow-hidden bg-linear-to-br from-gray-800 to-gray-900 relative">
                  <div className="absolute inset-0 bg-linear-to-t from-gray-900/50 to-transparent z-10" />
                  <Image
                    id={`car-image-${car.id}`}
                    width={400}
                    height={400}
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-contain transform transition-transform duration-500"
                  />
                  {/* Shine effect overlay */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Car Info */}
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-white">{car.name}</h3>
                    <span className="text-gray-400 bg-gray-800 px-2 py-1 rounded text-sm">
                      {car.year}
                    </span>
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < Math.floor(car.rating)
                              ? "fill-current"
                              : "fill-gray-600"
                          }
                          size={14}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-400">
                      {car.rating}
                    </span>
                  </div>

                  <p className="text-gray-300 text-sm mb-4">
                    {car.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {car.features?.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <div>
                      <span className="font-bold text-2xl text-white">
                        {car.price}
                      </span>
                      <span className="text-gray-400 text-sm block">
                        per day
                      </span>
                    </div>
                    <button className="bg-linear-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2 group">
            <span>View More Vehicles</span>
            <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
