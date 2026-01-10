"use client";
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaArrowUp,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-linear-to-b from-gray-900 to-black text-white pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gradient">
              YOS Rental
            </h3>
            <p className="text-gray-400 mb-6">
              Delivering premium car rental experiences with unmatched service
              and reliability.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FaWhatsapp, color: "#25D366" },
                { icon: FaFacebookF, color: "#1877F2" },
                { icon: FaInstagram, color: "#E4405F" },
                { icon: FaTiktok, color: "#000000" },
              ].map(({ icon: Icon, color }) => (
                <a
                  key={color}
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Cars", "Services", "About Us", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                "City Tours",
                "Airport Transfer",
                "Wedding Services",
                "24/7 Rental",
                "Corporate Rental",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4 text-gray-400">
              <p>123 Luxury Drive, Premium City</p>
              <p>+1 (555) 123-4567</p>
              <p>hello@yosrental.com</p>
              <p>24/7 Customer Support</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} YOS Rental. All rights reserved.
            </p>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </a>
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-2 hover:text-white transition-colors duration-300"
              >
                <span>Back to Top</span>
                <FaArrowUp />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
