"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import DetailPageNavbar from "../components/cars/detailsPageNavbar";
import {
  FaArrowRight,
  FaStar,
  FaCar,
  FaGasPump,
  FaUsers,
} from "react-icons/fa";
import { cars } from "../utils/data/cars";

gsap.registerPlugin(ScrollTrigger);

export default function VehiclesPage() {
  const router = useRouter();
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate cards on scroll
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        {
          y: 100,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleViewDetails = (carId: number) => {
    router.push(`/cars/${carId}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black">
      {/* Sticky Navbar */}
      <DetailPageNavbar title="YOS Car Rentals" />

      <div className="pt-24 px-4 pb-12 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Complete <span className="text-blue-400">Fleet</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Browse through our extensive collection of premium vehicles for
            every need and occasion.
          </p>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cars.map((car, index) => (
            <div
              key={car.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="bg-linear-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="p-8">
                {/* Top Row */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {car.name}
                    </h2>
                    <div className="flex items-center mt-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < Math.floor(car.rating)
                                ? "fill-current"
                                : "fill-gray-600"
                            }
                            size={16}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-gray-300">{car.rating}</span>
                    </div>
                  </div>
                  <div className="bg-blue-900/30 text-blue-300 px-4 py-2 rounded-full font-semibold">
                    {car.price}
                  </div>
                </div>

                {/* Car Image */}
                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6 bg-linear-to-r from-gray-800 to-gray-900">
                  <div className="absolute inset-0 bg-linear-to-t from-gray-900/70 to-transparent z-10" />
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="bg-blue-900/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <FaCar className="text-blue-400 text-xl" />
                    </div>
                    <span className="text-gray-300 text-sm">Sedan</span>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-900/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <FaGasPump className="text-blue-400 text-xl" />
                    </div>
                    <span className="text-gray-300 text-sm">Petrol</span>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-900/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <FaUsers className="text-blue-400 text-xl" />
                    </div>
                    <span className="text-gray-300 text-sm">5 Seats</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-6 line-clamp-2">
                  {car.description}
                </p>

                {/* Quick Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {car.features?.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-sm bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-400 text-sm block">
                      Daily Rate
                    </span>
                    <span className="text-2xl font-bold text-white">
                      {car.price}
                    </span>
                  </div>
                  <button
                    onClick={() => handleViewDetails(car.id)}
                    className="group bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold flex items-center space-x-2 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <span>View Details</span>
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Section */}
        {/* <div className="mt-12 bg-gray-800/50 rounded-3xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            Filter by Category
          </h3>
          <div className="flex flex-wrap gap-4">
            {["All", "Sedan", "SUV", "Luxury", "Economy", "Convertible"].map(
              (category) => (
                <button
                  key={category}
                  className="bg-gray-700 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors duration-300"
                >
                  {category}
                </button>
              )
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
}
