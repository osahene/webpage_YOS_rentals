"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { FaPhone, FaEnvelope, FaTimes, FaCopy } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const ContactModal = ({
  isOpen,
  onClose,
  title = "Get in Touch",
}: ContactModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  // Company contact details (replace with actual details)
  const contactDetails = {
    phone: "+233546213027",
    whatsapp: "+233546213027",
    email: "info@yosrentals.com",
  };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Animate modal in
      gsap.fromTo(
        ".contact-modal",
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
      );
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handlePhoneClick = () => {
    window.location.href = `tel:${contactDetails.phone}`;
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hello, I'm interested in renting a car from DriveRent."
    );
    window.open(
      `https://wa.me/${contactDetails.whatsapp}?text=${message}`,
      "_blank"
    );
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${contactDetails.email}`;
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="contact-modal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6">
        <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold text-white">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            <p className="text-gray-300">
              Choose your preferred way to contact us
            </p>
          </div>

          {/* Contact Options */}
          <div className="p-6 space-y-4">
            {/* Phone */}
            <div className="group relative">
              <button
                onClick={handlePhoneClick}
                className="w-full bg-linear-to-r from-blue-900/30 to-blue-800/20 hover:from-blue-800/40 hover:to-blue-700/30 p-4 rounded-xl flex items-center justify-between transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                    <FaPhone className="text-white text-xl" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-white">Phone Call</h3>
                    <p className="text-sm text-gray-300">
                      Talk directly with our agents
                    </p>
                  </div>
                </div>
                <span className="text-blue-400 font-semibold">
                  {contactDetails.phone}
                </span>
              </button>
              <button
                onClick={() => handleCopy(contactDetails.phone, "phone")}
                className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300 opacity-0 group-hover:opacity-100"
                title="Copy number"
              >
                <FaCopy />
              </button>
              {copied === "phone" && (
                <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-green-500 text-white px-2 py-1 rounded text-xs animate-pulse">
                  Copied!
                </div>
              )}
            </div>

            {/* WhatsApp */}
            <div className="group relative">
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-linear-to-r from-green-900/30 to-green-800/20 hover:from-green-800/40 hover:to-green-700/30 p-4 rounded-xl flex items-center justify-between transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <IoLogoWhatsapp className="text-white text-2xl" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-white">WhatsApp</h3>
                    <p className="text-sm text-gray-300">
                      Chat instantly with our team
                    </p>
                  </div>
                </div>
                <span className="text-green-400 font-semibold">Chat Now</span>
              </button>
              <button
                onClick={() => handleCopy(contactDetails.whatsapp, "whatsapp")}
                className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300 opacity-0 group-hover:opacity-100"
                title="Copy number"
              >
                <FaCopy />
              </button>
              {copied === "whatsapp" && (
                <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-green-500 text-white px-2 py-1 rounded text-xs animate-pulse">
                  Copied!
                </div>
              )}
            </div>

            {/* Email */}
            <div className="group relative">
              <button
                onClick={handleEmailClick}
                className="w-full bg-linear-to-r from-purple-900/30 to-purple-800/20 hover:from-purple-800/40 hover:to-purple-700/30 p-4 rounded-xl flex items-center justify-between transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-white">Email</h3>
                    <p className="text-sm text-gray-300">
                      Send us an email inquiry
                    </p>
                  </div>
                </div>
                <span className="text-purple-400 font-semibold text-sm">
                  Send Email
                </span>
              </button>
              <button
                onClick={() => handleCopy(contactDetails.email, "email")}
                className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300 opacity-0 group-hover:opacity-100"
                title="Copy email"
              >
                <FaCopy />
              </button>
              {copied === "email" && (
                <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-green-500 text-white px-2 py-1 rounded text-xs animate-pulse">
                  Copied!
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-700 bg-gray-900/50">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">
                Business Hours: Mon-Sun, 24/7
              </p>
              <p className="text-gray-300">
                We typically respond within 15 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ContactModal;
