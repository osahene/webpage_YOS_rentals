"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaBars,
  FaTimes,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { gsap } from "gsap";
import Link from "next/link";

interface DetailPageNavbarProps {
  title: string;
  carName?: string;
  serviceName?: string;
  showBackArrow?: boolean;
}

const DetailPageNavbar = ({
  title,
  carName,
  serviceName,
  showBackArrow = true,
}: DetailPageNavbarProps) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(".mobile-menu", {
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      document.body.style.overflow = "unset";
      gsap.to(".mobile-menu", {
        x: "100%",
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isMenuOpen]);

  const socialIcons = [
    { icon: <FaWhatsapp />, href: "https://wa.me/+233546213027" },
    { icon: <FaFacebook />, href: "#" },
    { icon: <FaInstagram />, href: "#" },
    { icon: <FaTiktok />, href: "https://vt.tiktok.com/ZSaHWCSGM/" },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gray-900/95 backdrop-blur-md shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Back Arrow */}
            {showBackArrow && (
              <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors duration-300"
              >
                <FaArrowLeft className="text-xl" />
                <span className="hidden md:inline font-medium">Back</span>
              </button>
            )}
            {!showBackArrow && <div className="w-20" />} {/* Spacer */}
            {/* Center: Title */}
            <div className="text-center">
              <h1 className="text-xl md:text-2xl font-bold text-white">
                {serviceName
                  ? `${title} • ${serviceName}`
                  : carName
                  ? `${title} • ${carName}`
                  : title}
              </h1>
            </div>
            {/* Right: Social Icons (Desktop) / Menu (Mobile) */}
            <div className="flex items-center space-x-4">
              {/* Desktop Social Icons */}
              <div className="hidden md:flex items-center space-x-4">
                {socialIcons.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-gray-300 hover:text-white text-xl transition-colors duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white text-2xl"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className="mobile-menu fixed top-0 right-0 w-64 h-full bg-gray-900 shadow-2xl z-50 transform translate-x-full md:hidden">
        <div className="p-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-2xl"
            >
              <FaTimes />
            </button>
          </div>

          <div className="mb-8">
            <h3 className="text-gray-400 text-sm uppercase mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors duration-300 text-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Link
              href="/"
              className="block text-white text-lg hover:text-blue-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/vehicles"
              className="block text-white text-lg hover:text-blue-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              All Vehicles
            </Link>
            <Link
              href="#"
              className="block text-white text-lg hover:text-blue-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="#"
              className="block text-white text-lg hover:text-blue-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPageNavbar;
