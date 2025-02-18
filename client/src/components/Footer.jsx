import React from "react";
import BjjVoyageurLogo from "../assets/BjjVoyageurLogo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-12 h-12 mr-3">
              <BjjVoyageurLogo />
            </div>
            <div>
              <p className="text-xl font-semibold">BjjVoyageur</p>
              <p className="text-sm text-gray-400">Find Your Next Roll</p>
            </div>
          </div>

          <div className="text-sm text-gray-400">
            <p>© {currentYear} BjjVoyageur. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
