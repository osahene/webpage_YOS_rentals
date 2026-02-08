"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { FaStar, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import { useCars } from "@/app/carContext";
gsap.registerPlugin(ScrollTrigger);

export default function CarsShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const router = useRouter();
  const {cars, loading, error} = useCars();

    useLayoutEffect(() => {
    if (!cars) return;
    carRefs.current.forEach((card) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { y: 100, opacity: 0, rotationY: -15 },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            end: "bottom top",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });

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
  }, [cars]);

  // Simple image hover animation
   useLayoutEffect(() => {
    if (hoveredCard !== null) {
      const imgElement = document.getElementById(`car-image-${hoveredCard}`);
      if (imgElement) {
        gsap.to(imgElement, { scale: 1.05, duration: 0.3, ease: "power2.out" });
      }
    } else if (cars) {
      cars.forEach((car) => {
        const imgElement = document.getElementById(`car-image-${car.id}`);
        if (imgElement) {
          gsap.to(imgElement, { scale: 1, duration: 0.3, ease: "power2.out" });
        }
      });
    }
  }, [hoveredCard, cars]);

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
          {cars?.map((car: any, index) => (
            <div
              key={car.id}
              ref={(el) => {carRefs.current[index] = el}}
              className="group perspective-1000 cursor-pointer"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:-translate-y-2 backface-hidden border border-gray-700">
                <div className="h-48 mb-6 rounded-xl overflow-hidden bg-linear-to-br from-gray-800 to-gray-900 relative">
                  <div className="absolute inset-0 bg-linear-to-t from-gray-900/50 to-transparent z-10" />
                  <Image
                    id={`car-image-${car.id}`}
                    width={400}
                    height={400}
                    src={(car.images && car.images[0]) || "/image/default-car.png"}
                    alt={car.make + " " + car.model}
                    unoptimized={true}
                    className="w-full h-full object-contain transform transition-transform duration-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-white">{car.make} {car.model}</h3>
                    <span className="text-gray-400 bg-gray-800 px-2 py-1 rounded text-sm">{car.year}</span>
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.floor(car.rating || 4) ? "fill-current" : "fill-gray-600"} size={14} />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-400">{car.rating ?? "4.5"}</span>
                  </div>

                  <p className="text-gray-300 text-sm mb-4">{car.description}</p>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <div></div>
                    <button onClick={() => router.push(`/cars/${car.id}`)} className="bg-linear-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full">
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => router.push("/cars")}
            className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2 group"
          >
            <span>View More Vehicles</span>
            <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
