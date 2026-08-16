import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-5">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Job Connect</h3>
            <p className="text-gray-400">
              Your trusted platform to find and connect with the best job opportunities and skilled professionals. Let's make your career dreams come true.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <a href="/jobs" className="text-gray-400 hover:text-white">
                  Browse Jobs
                </a>
              </li>
              <li className="mb-2">
                <a href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-2">
              Email: <a href="mailto:support@jobconnect.com" className="hover:text-white">support@jobconnect.com</a>
            </p>
            <p className="text-gray-400 mb-2">
              Phone: <a href="tel:+1234567890" className="hover:text-white">+1 234 567 890</a>
            </p>
            <p className="text-gray-400 mb-2">
              Address: 123 Job Connect Ave, Career City, USA
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-6" />

        {/* Social Media & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Social Media Links */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Job Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
