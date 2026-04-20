import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faGithub,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        
        <div>
          <h2 className="text-xl font-bold text-white">
            Job<span className="text-[#F83002]">Portal</span>
          </h2>
          <p className="mt-3 text-sm">
            Find your dream job easily. Explore thousands of opportunities with us.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/jobs" className="hover:text-white">Jobs</Link></li>
            <li><Link to="/browse" className="hover:text-white">Browse</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="#">Help Center</Link></li>
            <li><Link to="#">Terms & Conditions</Link></li>
            <li><Link to="#">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-lg">
            <FontAwesomeIcon icon={faFacebook} className="cursor-pointer hover:text-white" />
            <FontAwesomeIcon icon={faTwitter} className="cursor-pointer hover:text-white" />
            <FontAwesomeIcon icon={faGithub} className="cursor-pointer hover:text-white" />
            <FontAwesomeIcon icon={faLinkedinIn} className="cursor-pointer hover:text-white" />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;