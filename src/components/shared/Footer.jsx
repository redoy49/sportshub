import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative mt-24 overflow-hidden bg-[#0f172a] text-gray-300">
      {/* Gradient Glow Background */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-green-500/20 blur-[180px] rounded-full"></div>

      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 py-16 lg:px-8 xl:px-[8%]">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[32%_18%_25%_25%]">
            {/* About */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">
                SportsClub
              </h2>

              <p className="text-sm text-gray-400 leading-relaxed">
                A modern sports club platform where members can easily book
                courts, manage tournaments, and connect with a growing sports
                community.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">
                Quick Links
              </h2>

              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/courts"
                    className="hover:text-green-400 transition duration-300"
                  >
                    Courts
                  </Link>
                </li>

                <li>
                  <Link
                    to="/booking"
                    className="hover:text-green-400 transition duration-300"
                  >
                    Book Court
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-green-400 transition duration-300"
                  >
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link
                    to="/support"
                    className="hover:text-green-400 transition duration-300"
                  >
                    Support
                  </Link>
                </li>

                <li>
                  <Link
                    to="/faq"
                    className="hover:text-green-400 transition duration-300"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Contact</h2>

              <p className="text-sm text-gray-400">Dhaka Sports City</p>

              <p className="text-sm text-gray-400 mt-2">
                Email: info@sportsclub.com
              </p>

              <p className="text-sm text-gray-400">Phone: +880 1234 567 890</p>
            </div>

            {/* Social */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">
                Follow Us
              </h2>

              <div className="flex gap-4">
                {/* Facebook */}
                <a
                  href="#"
                  className="group relative w-10 h-10 flex items-center justify-center rounded-lg 
                  bg-white/5 backdrop-blur border border-white/10 
                  hover:border-green-400 transition-all duration-300
                  hover:shadow-[0_0_8px_rgba(34,197,94,0.35)]"
                >
                  <FaFacebookF className="text-gray-400 group-hover:text-green-400 transition" />
                </a>

                {/* Twitter */}
                <a
                  href="#"
                  className="group relative w-10 h-10 flex items-center justify-center rounded-lg 
                  bg-white/5 backdrop-blur border border-white/10 
                  hover:border-green-400 transition-all duration-300
                  hover:shadow-[0_0_8px_rgba(34,197,94,0.35)]"
                >
                  <FaTwitter className="text-gray-400 group-hover:text-green-400 transition" />
                </a>

                {/* Instagram */}
                <a
                  href="#"
                  className="group relative w-10 h-10 flex items-center justify-center rounded-lg 
                  bg-white/5 backdrop-blur border border-white/10 
                  hover:border-green-400 transition-all duration-300
                  hover:shadow-[0_0_8px_rgba(34,197,94,0.35)]"
                >
                  <FaInstagram className="text-gray-400 group-hover:text-green-400 transition" />
                </a>

                {/* Github */}
                <a
                  href="#"
                  className="group relative w-10 h-10 flex items-center justify-center rounded-lg 
                  bg-white/5 backdrop-blur border border-white/10 
                  hover:border-green-400 transition-all duration-300
                  hover:shadow-[0_0_8px_rgba(34,197,94,0.35)]"
                >
                  <FaGithub className="text-gray-400 group-hover:text-green-400 transition" />
                </a>
              </div>

              <p className="text-sm text-gray-400 mt-4">
                Stay connected with our latest sports events and updates.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10">
          <div className="max-w-[1600px] mx-auto px-6 py-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} SportsClub. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
