"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useLayoutEffect(() => {
    // Animate section entrance
    gsap.from(".contact-content", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    // Animated border for map
    const mapBorder = mapRef.current?.querySelector(".map-border");
    if (mapBorder) {
      gsap.to(mapBorder, {
        borderColor: "#3b82f6",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission to your backend API
    console.log("Contact form submitted:", formData);

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-10 bg-linear-to-r from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 contact-content">
            Lets{" "}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Start Your Journey
            </span>
          </h2>
          <p className="text-gray-900 max-w-2xl mx-auto text-lg contact-content">
            Got questions? We ve got answers! Reach out to us and let s create
            unforgettable memories together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Interactive Map */}
          <div className="contact-content">
            <div
              ref={mapRef}
              className="relative h-full min-h-100 rounded-3xl overflow-hidden bg-linear-to-br from-blue-50 to-purple-50"
            >
              {/* Map Container with Animated Border */}
              <div className="map-border absolute inset-0 border-4 border-transparent rounded-3xl"></div>

              {/* Map Placeholder with Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <FaMapMarkerAlt className="text-6xl text-blue-500 animate-bounce" />
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
                  </div>

                  <h3 className="text-2xl font-bold text-violet-400 mb-4">
                    Find Us Here
                  </h3>
                  <div className="space-y-3 text-gray-600">
                    <p className="flex items-center justify-center">
                      <FaMapMarkerAlt className="mr-2" />
                      Patasi, Kumasi
                    </p>
                    <p className="flex items-center justify-center">
                      <FaPhone className="mr-2" />
                      +233 546 213 027
                    </p>
                    <p className="flex items-center justify-center">
                      <FaEnvelope className="mr-2" />
                      info@yosrental.com
                    </p>
                  </div>

                  {/* Animated Route Visualization */}
                  <div className="mt-8">
                    <svg width="300" height="100" className="mx-auto">
                      <path
                        d="M0,50 Q75,10 150,50 T300,50"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="10,5"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          from="0"
                          to="15"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      </path>
                      <circle cx="0" cy="50" r="4" fill="#3b82f6">
                        <animate
                          attributeName="cx"
                          from="0"
                          to="300"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="contact-content">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 shadow-xl"
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Tell us about your rental needs..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-linear-to-r from-black to-gray-800 text-white py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2 group"
                  >
                    <span>Send Message</span>
                    <FaPaperPlane className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
