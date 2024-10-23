import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-gray-200 body-font bg-gray-900">
      <div className="container px-5  py-16 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          {/* Dynamic sections for links */}
          {["Shop", "Information", "Company", "Support"].map((section, index) => (
            <div key={index} className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-xl mb-3">{section}</h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-400 hover:text-gray-300 text-lg sm:text-sm">About Us</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-gray-300 text-lg sm:text-sm">Careers</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-gray-300 text-lg sm:text-sm">Privacy Policy</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-gray-300 text-lg sm:text-sm">Contact</a>
                </li>
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom section with copyright and social links */}
      <div className="bg-gray-800 bg-opacity-75">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-400 text-sm text-center sm:text-left">
            © 2024 CraftCrove —
            <a href="https://twitter.com/knyttneve" className="text-gray-300 ml-1" target="_blank" rel="noopener noreferrer">
              @CraftCrove
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a href="#" className="text-gray-400 hover:text-gray-300 ml-3">
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300 ml-3">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300 ml-3">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300 ml-3">
              <FaLinkedinIn className="w-5 h-5" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
