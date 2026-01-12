"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaBars,
  FaTimes,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  //   const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!navRef.current) return;
    // 1. Initial State: Hidden and moved up
    gsap.set(navRef.current, { y: -100, opacity: 0, xPercent: -50 });

    // 2. Animation: Appear when hero is scrolled past
    const tl = gsap.to(navRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#hero",
        start: "bottom top", // Starts when bottom of hero hits top of viewport
        toggleActions: "play none none reverse", // Plays when going down, reverses when going back up
      },
    });

    return () => {
      // ScrollTrigger.getAll().forEach((t) => t.kill());
      ScrollTrigger.refresh();
      tl.kill();
    };
  }, []);

  const socialLinks = [
    { icon: FaWhatsapp, href: "https://wa.me/yournumber", color: "#25D366" },
    {
      icon: FaFacebookF,
      href: "https://facebook.com/yourpage",
      color: "#1877F2",
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com/yourprofile",
      color: "#E4405F",
    },
    {
      icon: FaTiktok,
      href: "https://tiktok.com/@yourprofile",
      color: "#000000",
    },
  ];

  return (
    <>
      <div
        ref={navRef}
        /* Centering Logic: left-1/2 and fixed width or whitespace handling */
        className="fixed top-6 left-1/2 -translate-x-1/2
        z-50 transform-gpu"
      >
        <div className="backdrop-blur-xl bg-white/90 border border-gray-200 rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center justify-between space-x-8">
            {/* Logo */}
            <div className="hidden md:block">
              <span className="font-bold text-xl text-gradient">
                YOS Car Rentals
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6">
              {["Home", "Cars", "Services", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-black font-medium transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              {socialLinks.map(({ icon: Icon, href, color }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="text-white text-sm" />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-2xl text-gray-700" />
              ) : (
                <FaBars className="text-2xl text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute right-4 top-20 bg-white rounded-2xl p-6 shadow-xl w-64">
            <div className="flex flex-col space-y-4">
              {["Home", "Cars", "Services", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-black font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="pt-4 border-t">
                <span className="text-sm text-gray-500">Follow us</span>
                <div className="flex space-x-3 mt-2">
                  {socialLinks.map(({ icon: Icon, href }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-black"
                    >
                      <Icon className="text-xl" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
