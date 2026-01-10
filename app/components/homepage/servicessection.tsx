"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaRoute, FaCarSide, FaGlassCheers, FaClock } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: "City Tours",
    description:
      "Explore the city in style with our guided tour services. Perfect for tourists and business travelers.",
    icon: FaRoute,
    image: "/services/tour.jpg",
    features: ["Guided tours", "Multi-language guides", "Custom routes"],
  },
  {
    id: 2,
    title: "Pick & Drop",
    description:
      "Reliable airport and hotel transfers. We ensure you reach your destination safely and on time.",
    icon: FaCarSide,
    image: "/services/pick-drop.jpg",
    features: ["24/7 Service", "Flight tracking", "Meet & greet"],
  },
  {
    id: 3,
    title: "Wedding Chauffeur",
    description:
      "Make your special day perfect with our luxury wedding car services. Elegance and reliability guaranteed.",
    icon: FaGlassCheers,
    image: "/services/wedding.jpg",
    features: ["Luxury cars", "Professional chauffeurs", "Decorations"],
  },
  {
    id: 4,
    title: "24-Hour Town Ride",
    description:
      "Available round the clock for your transportation needs. Safety and comfort are our priorities.",
    icon: FaClock,
    image: "/services/24-hour.jpg",
    features: ["24/7 availability", "Emergency support", "Comfortable rides"],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate each service card
    serviceRefs.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        {
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          scale: 0.9,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Hover effect
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a wide range of services tailored to meet your
            transportation needs
          </p>
        </div>

        <div className="space-y-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                ref={(el) => {
                  serviceRefs.current[index] = el;
                }}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-12`}
              >
                {/* Image/Animation Container */}
                <div className="lg:w-1/2">
                  <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden bg-linear-to-br from-gray-100 to-gray-200">
                    {/* Animated SVG Path */}
                    <svg className="absolute inset-0 w-full h-full">
                      <path
                        d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
                        className="fill-blue-500/10"
                      />
                      <path
                        d="M0,200 C150,100 350,300 500,200 L500,00 L0,0 Z"
                        className="fill-purple-500/10"
                      />
                    </svg>

                    {/* Icon Animation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          <Icon className="text-white text-5xl" />
                        </div>
                        <div className="absolute inset-0 rounded-full border-4 border-blue-500/30 animate-ping"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-1/2">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-4">
                      <Icon className="text-white text-xl" />
                    </div>
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                  </div>

                  <p className="text-gray-600 mb-6 text-lg">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105">
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
