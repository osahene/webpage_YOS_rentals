"use client";

import { useLayoutEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaRoute, FaGlassCheers, FaClock } from "react-icons/fa";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: "City Tours",
    description:
      "Explore the city in style with our guided tour services. Perfect for tourists and business travelers.",
    icon: FaRoute,
    image: "/services/car map.png",
    features: ["Guided tours", "Multi-language guides", "Custom routes"],
    alt: "City tour",
  },

  {
    id: 2,
    title: "Wedding Chauffeur",
    description:
      "Make your special day perfect with our luxury wedding car services. Elegance and reliability guaranteed.",
    icon: FaGlassCheers,
    image: "/services/wedding chauffeur.jpg",
    features: ["Luxury cars", "Professional chauffeurs", "Decorations"],
    alt: "chauffeur",
  },
  {
    id: 3,
    title: "24-Hour Town Ride",
    description:
      "Available round the clock for your transportation needs. Safety and comfort are our priorities.",
    icon: FaClock,
    image: "/services/24hour.jpg",
    features: ["24/7 availability", "Emergency support", "Comfortable rides"],
    alt: "town ride",
  },
];

export default function ServicesSection() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
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
            toggleActions: "play none none none",
            once: true,
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

  const handleLearnMore = (serviceId: number) => {
    router.push(`/services/${serviceId}`);
  };

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
                  <div className="relative h-35 md:h-80 rounded-3xl overflow-hidden bg-linear-to-br from-gray-100 to-gray-200">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      width={1000}
                      height={900}
                      content="fill"
                    />
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

                  <button
                    onClick={() => handleLearnMore(service.id)}
                    className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105"
                  >
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
