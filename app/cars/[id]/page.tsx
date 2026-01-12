"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import ContactModal from "@/app/components/services/contactModal";
import DetailPageNavbar from "../../components/cars/detailsPageNavbar";
import {
  FaStar,
  FaCheck,
  FaCar,
  FaGasPump,
  FaUsers,
  FaCogs,
  FaShieldAlt,
  FaSnowflake,
  FaMusic,
  FaWifi,
} from "react-icons/fa";
import { cars } from "../../utils/data/cars";

gsap.registerPlugin(ScrollTrigger);

export default function CarDetailPage() {
  const router = useRouter();
  const params = useParams();
  const carId = parseInt(params.id as string);
  const car = cars.find((c) => c.id === carId);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isButtonGlowing, setIsButtonGlowing] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Mock car images (you can replace with actual car images)
  const carImages = [
    car?.image || "/default-car.jpg",
    "/image/car-interior.jpg",
    "/image/car-side.jpg",
    "/image/car-back.jpg",
    "/image/car-engine.jpg",
  ];

  useEffect(() => {
    if (!car) {
      router.push("/vehicles");
      return;
    }

    // GSAP animations for sections
    gsap.utils.toArray<Element>(".detail-section").forEach((section, index) => {
      gsap.fromTo(
        section,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Image gallery animation
    if (galleryRef.current) {
      gsap.fromTo(
        galleryRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.7)",
        }
      );
    }

    // Glowing button effect
    const glowInterval = setInterval(() => {
      setIsButtonGlowing((prev) => !prev);
    }, 2000);

    return () => {
      clearInterval(glowInterval);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [car, router]);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-3xl text-white mb-4">Car not found</h1>
          <button
            onClick={() => router.push("/vehicles")}
            className="bg-blue-600 text-white px-6 py-3 rounded-full"
          >
            Browse Vehicles
          </button>
        </div>
      </div>
    );
  }

  const features = [
    { icon: <FaCar />, label: "Type", value: "Sedan" },
    { icon: <FaGasPump />, label: "Fuel", value: "Petrol" },
    { icon: <FaUsers />, label: "Seats", value: "5" },
    { icon: <FaCogs />, label: "Transmission", value: "Automatic" },
    { icon: <FaShieldAlt />, label: "Airbags", value: "6" },
    { icon: <FaSnowflake />, label: "AC", value: "Dual Zone" },
    { icon: <FaMusic />, label: "Audio", value: "Premium" },
    { icon: <FaWifi />, label: "Connectivity", value: "Apple CarPlay" },
  ];

  const terms = [
    "Minimum rental period: 24 hours",
    "Car(s) are to be returned to the garage by 8:00 AM on the due date that the car is to be returned. When the time exceeds by an hour, the receipient would pay an extra fee of full day rent.",
    "Car receipient must provide a valid Ghana Card or Passport, Ghana Driver's License and a guarantor. The guarantor must provide details of their Ghana Card or Passprt and other relevant information to the company.",
    "In case the receipient would need a driver from the company, they would pay an additional fee of two hundred Ghana Cedis (¢ 200.00) as service fee.",
    "The receipient would be responsible for the upkeep and accomodation of the driver.",
    "In case of any accident, the receipient would bear the full cost of the damages. In such a situation, the receipient would have not more than a month to put the car in it's original shape.",
    "In case of very serious damage, the receipient would have to replace the car with a new one.",
    "No smoking, eating or drinking of alcohol in vehicle. The receipient must ensure that the vehicle is well cleaned when returning it.",
    "Fuel policy: The receipient must return the vehicle with a full tank of fuel; specifically SHELL V-POWER.",
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black pb-32">
      {/* Sticky Navbar */}
      <DetailPageNavbar title="YOS Car Rentals" />

      {/* Main Content */}
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        {/* Car Name */}
        <div className="detail-section mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {car.name}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < Math.floor(car.rating)
                      ? "text-yellow-400"
                      : "text-gray-600"
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-300">{car.rating}</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300">{car.year} Model</span>
          </div>
        </div>

        {/* Image Gallery */}
        <div ref={galleryRef} className="detail-section mb-12">
          <div className="relative bg-gray-800 rounded-3xl overflow-hidden">
            {/* Main Image */}
            <div className="relative h-64 md:h-96 lg:h-125">
              <Image
                src={carImages[selectedImageIndex]}
                alt={`${car.name} - View ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
                priority
              />

              {/* Navigation Arrows */}
              <button
                onClick={() =>
                  setSelectedImageIndex((prev) =>
                    prev > 0 ? prev - 1 : carImages.length - 1
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
              >
                ←
              </button>
              <button
                onClick={() =>
                  setSelectedImageIndex((prev) =>
                    prev < carImages.length - 1 ? prev + 1 : 0
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
              >
                →
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="p-4 bg-gray-900/50">
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {carImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImageIndex === index
                        ? "border-blue-500 scale-105"
                        : "border-transparent hover:border-gray-500"
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div
          ref={(el) => {
            sectionRefs.current[0] = el;
          }}
          className="detail-section mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
          <div className="bg-gray-800/50 rounded-2xl p-6">
            <p className="text-gray-300 leading-relaxed">
              Experience luxury and performance with the {car.name}. This{" "}
              {car.year} model combines cutting-edge technology with premium
              comfort features. Perfect for business trips, family vacations, or
              special occasions.
              {car.description}
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <FaCheck className="text-green-400 mr-3" />
                <span className="text-gray-300">Free delivery & pickup</span>
              </div>
              <div className="flex items-center">
                <FaCheck className="text-green-400 mr-3" />
                <span className="text-gray-300">24/7 roadside assistance</span>
              </div>
              <div className="flex items-center">
                <FaCheck className="text-green-400 mr-3" />
                <span className="text-gray-300">Full insurance coverage</span>
              </div>
              <div className="flex items-center">
                <FaCheck className="text-green-400 mr-3" />
                <span className="text-gray-300">Unlimited mileage</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div
          ref={(el) => {
            sectionRefs.current[1] = el;
          }}
          className="detail-section mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            Features & Specifications
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-xl p-4 text-center hover:bg-gray-800 transition-colors duration-300"
              >
                <div className="text-blue-400 text-2xl mb-2 flex justify-center">
                  {feature.icon}
                </div>
                <div className="text-sm text-gray-400 mb-1">
                  {feature.label}
                </div>
                <div className="text-white font-semibold">{feature.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Terms & Conditions */}
        <div
          ref={(el) => {
            sectionRefs.current[2] = el;
          }}
          className="detail-section mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            Terms & Conditions
          </h2>
          <div className="bg-gray-800/50 rounded-2xl p-6">
            <ul className="space-y-3">
              {terms.map((term, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 shrink-0" />
                  <span className="text-gray-300">{term}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-blue-900/20 rounded-xl">
              <p className="text-blue-300">
                <strong>Note:</strong> Prices include all taxes and fees.
                Additional charges may apply for late returns, additional
                drivers, or optional extras.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Rent Now Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black to-transparent z-40">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setShowContactModal(true)}
            className={`w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-5 rounded-xl font-bold text-lg relative overflow-hidden transform transition-all duration-500 hover:scale-[1.02] ${
              isButtonGlowing
                ? "shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                : "shadow-2xl"
            }`}
          >
            {/* Animated glow effect */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            </div>

            <span className="relative z-10">Rent Now @ {car.price}</span>

            {/* Pulsing ring */}
            <div
              className={`absolute -inset-1 rounded-xl border-2 border-blue-400/50 ${
                isButtonGlowing ? "animate-pulse" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
}
