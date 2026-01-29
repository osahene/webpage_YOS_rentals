"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import DetailPageNavbar from "../../components/cars/detailsPageNavbar";
import ContactModal from "../../components/services/contactModal";
import {
  FaStar,
  FaCheck,
  FaArrowRight,
  FaCalendar,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";

// Service data (you can move this to a separate data file)
const services = [
  {
    id: 1,
    title: "City Tours",
    description:
      "Explore the city in style with our guided tour services. Perfect for tourists and business travelers.",
    longDescription: `Experience the best of the city with our premium guided tour services. Our professional drivers know all the hidden gems and iconic landmarks. Whether you're a tourist wanting to see the sights or a business traveler needing efficient transportation between meetings, we've got you covered.

We offer customizable routes that can be tailored to your interests and schedule. From historical landmarks to modern attractions, food tours to shopping sprees - create your perfect city adventure.`,
    icon: "🗺️",
    image: "/services/car map.png",
    heroImage: "/services/city-tour-hero.jpg",
    features: [
      "Guided tours",
      "Multi-language guides",
      "Custom routes",
      "Flexible scheduling",
      "Photo stops",
    ],
    offers: [
      "Book 3+ hours, get 1 hour free",
      "Group discounts available",
      "Free hotel pickup/dropoff",
      "Complimentary water bottles",
    ],
    availableCars: [
      {
        name: "Toyota Corolla",
        seats: 5,
        price: "¢650/day",
        image: "/image/corolla2013.png",
      },
      {
        name: "Honda Civic",
        seats: 5,
        price: "¢720/day",
        image: "/image/hondacivic.png",
      },
      {
        name: "Toyota RAV4",
        seats: 5,
        price: "¢79/hr",
        image: "/image/rav4.png",
      },
      {
        name: "Honda CRV",
        seats: 5,
        price: "¢800/day",
        image: "/image/hondacrv.png",
      },
    ],
    pricing: "Starting from ¢500/day",
  },
  {
    id: 2,
    title: "Wedding Chauffeur",
    description:
      "Make your special day perfect with our luxury wedding car services.",
    longDescription: `Your wedding day deserves nothing but the best. Our luxury wedding chauffeur service ensures you arrive in style and on time for every moment of your special day. We provide elegant, pristine vehicles driven by professional chauffeurs trained in discretion and excellence.

From the ceremony to the reception, we'll coordinate with your wedding planner to ensure seamless transportation. We can decorate the vehicle to match your wedding theme and provide complementary amenities to make your ride comfortable and memorable.`,
    icon: "💍",
    image: "/services/wedding chauffeur.jpg",
    heroImage: "/services/wedding-hero.jpg",
    features: [
      "Luxury cars",
      "Professional chauffeurs",
      "Decorations",
      "Red carpet service",
      "Champagne on arrival",
    ],
    offers: [
      "Free bridal bouquet preservation",
      "Complimentary champagne",
      "6+ hour packages include free limo",
      "Early booking discount (15% off)",
    ],
    availableCars: [
      {
        name: "White Limousine",
        seats: 8,
        price: "¢299/day",
        image: "/services/limo.jpg",
      },
      {
        name: "Rolls Royce Phantom",
        seats: 4,
        price: "¢499/day",
        image: "/services/rolls.jpg",
      },
      {
        name: "Mercedes Maybach",
        seats: 4,
        price: "¢399/day",
        image: "/services/maybach.jpg",
      },
      {
        name: "Vintage Convertible",
        seats: 2,
        price: "¢349/day",
        image: "/services/vintage.jpg",
      },
    ],
    pricing: "Packages from ¢999",
  },
  {
    id: 3,
    title: "24-Hour Town Ride",
    description: "Available round the clock for your transportation needs.",
    longDescription: `Need a ride at 2 AM? Heading to the airport for an early flight? Our 24-hour town ride service ensures you have reliable transportation whenever you need it. Our drivers are available 24/7, 365 days a year, providing safe and comfortable rides throughout the city.

We're perfect for late-night events, early morning flights, emergency transportation, or anytime you need a reliable ride. All vehicles are equipped with GPS tracking, and our drivers undergo thorough background checks for your safety and peace of mind.`,
    icon: "⏰",
    image: "/services/24hour.jpg",
    heroImage: "/services/24hour-hero.jpg",
    features: [
      "24/7 availability",
      "Emergency support",
      "Comfortable rides",
      "GPS tracking",
      "Safety features",
    ],
    offers: [
      "10% discount for night rides (10 PM - 6 AM)",
      "Free cancellation up to 1 hour before",
      "Loyalty program: 10 rides = 1 free",
      "Airport transfer special rates",
    ],
    availableCars: [
      {
        name: "Toyota Corolla",
        seats: 5,
        price: "¢650/day",
        image: "/image/corolla2013.png",
      },
      {
        name: "Honda CRV",
        seats: 5,
        price: "¢800/day",
        image: "/image/hondacrv.png",
      },
      {
        name: "Toyota RAV4",
        seats: 5,
        price: "¢700/day",
        image: "/image/rav4.png",
      },
      {
        name: "Honda Civic",
        seats: 5,
        price: "¢650/day",
        image: "/image/hondacivic.png"
      },
    ],
    pricing: "Starting from ¢500/day",
  },
];

export default function ServiceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const serviceId = parseInt(params.id as string);
  const service = services.find((s) => s.id === serviceId);

  const [showContactModal, setShowContactModal] = useState(false);
  const [isButtonGlowing, setIsButtonGlowing] = useState(true);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!service) {
      router.push("/services");
      return;
    }

    // GSAP animations for sections
    gsap.utils
      .toArray<Element>(".service-section")
      .forEach((section, index) => {
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
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

    // Glowing button effect
    const glowInterval = setInterval(() => {
      setIsButtonGlowing((prev) => !prev);
    }, 2000);

    return () => {
      clearInterval(glowInterval);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [service, router]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-3xl text-white mb-4">Service not found</h1>
          <button
            onClick={() => router.push("/services")}
            className="bg-blue-600 text-white px-6 py-3 rounded-full"
          >
            Browse Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black pb-32">
      {/* Sticky Navbar */}
      <DetailPageNavbar title="YOS Car Rentals" />

      {/* Hero Section with Header Image */}
      <div className="pt-24 relative">
        {/* Hero Image */}
        <div className="relative h-64 md:h-96 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/80 to-transparent z-10" />
          <div className="absolute inset-0">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative z-20 h-full flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-4xl">{service.icon}</div>
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                    {service.title}
                  </h1>
                  <p className="text-gray-300 text-lg mt-2">
                    {service.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-white">
                  <FaCalendar className="mr-2" />
                  <span>Flexible Booking</span>
                </div>
                <div className="flex items-center text-white">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>City-wide Coverage</span>
                </div>
                <div className="flex items-center text-white">
                  <FaUsers className="mr-2" />
                  <span>Professional Drivers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Description Section */}
          <div
            ref={(el) => {
              sectionRefs.current[0] = el;
            }}
            className="service-section mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              About This Service
            </h2>
            <div className="bg-gray-800/50 rounded-2xl p-8">
              <div className="prose prose-lg text-gray-300">
                {service.longDescription
                  .split("\n\n")
                  .map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 bg-linear-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4 shrink-0">
                      <FaCheck className="text-white" />
                    </div>
                    <span className="text-gray-300 text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Available Cars Section */}
          <div
            ref={(el) => {
              sectionRefs.current[1] = el;
            }}
            className="service-section mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Available Vehicles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.availableCars.map((car, index) => (
                <div
                  key={index}
                  className="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-6 hover:transform hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="relative h-40 rounded-xl overflow-hidden mb-4 bg-gray-700">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {car.name}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-300">
                      <FaUsers className="mr-2" />
                      <span>{car.seats} seats</span>
                    </div>
                    {/* <div className="text-blue-400 font-bold">{car.price}</div> */}
                  </div>
                  <button className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:shadow-lg transition-all duration-300">
                    Select This Vehicle
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Amazing Offers Section */}
          <div
            ref={(el) => {
              sectionRefs.current[2] = el;
            }}
            className="service-section mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              <span className="bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Amazing Offers
              </span>
            </h2>
            <div className="bg-linear-to-r from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.offers.map((offer, index) => (
                  <div
                    key={index}
                    className="bg-linear-to-br from-gray-700/50 to-gray-800/50 rounded-xl p-6 border border-gray-600"
                  >
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-linear-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-4 shrink-0">
                        <span className="font-bold">%</span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-2">
                          Special Offer
                        </h3>
                        <p className="text-gray-300">{offer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="mt-8 p-6 bg-linear-to-r from-blue-900/30 to-purple-900/30 rounded-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    {/* <h3 className="text-2xl font-bold text-white">
                      {service.pricing}
                    </h3> */}
                    <p className="text-gray-300">
                      All inclusive - no hidden fees
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="text-yellow-400 flex items-center">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <span className="ml-2 text-white">
                        4.9/5 from 500+ reviews
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div
            ref={(el) => {
              sectionRefs.current[3] = el;
            }}
            className="service-section"
          >
            <div className="bg-gray-800/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                How It Works
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-linear-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">1</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">Book Online</h4>
                  <p className="text-gray-300">
                    Select your service, date, and vehicle preference
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-linear-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">2</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">
                    Confirmation
                  </h4>
                  <p className="text-gray-300">
                    Get instant confirmation and driver details
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-linear-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">3</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">
                    Enjoy Your Ride
                  </h4>
                  <p className="text-gray-300">
                    Relax while we take care of everything
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky "Let's help you" Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black to-transparent z-40">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setShowContactModal(true)}
            className={`w-full bg-linear-to-r from-green-600 to-blue-600 text-white py-5 rounded-xl font-bold text-lg relative overflow-hidden transform transition-all duration-500 hover:scale-[1.02] ${
              isButtonGlowing
                ? "shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                : "shadow-2xl"
            }`}
          >
            {/* Animated glow effect */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            </div>

            <span className="relative z-10 flex items-center justify-center">
              Let{"'"}s help you
              <FaArrowRight className="ml-2" />
            </span>

            {/* Pulsing ring */}
            <div
              className={`absolute -inset-1 rounded-xl border-2 border-green-400/50 ${
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
        title={`Book ${service.title}`}
      />
    </div>
  );
}
