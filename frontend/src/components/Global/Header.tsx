import React, { useState } from "react";
import finalLogo from '../../assets/logo-final.png'
import { backendurl } from "../../constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
    const navigate = useNavigate(); 

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleDonateNow = async () => {
    try {
      const response = await axios.get(`${backendurl}/campaign/getLatestCampaign`);
      const { data } = response.data;
      console.log(response.data.data[0])

      if (data?._id) {
        navigate(`/detailedcampaign/${data._id}`);
      } else {
        alert("No campaigns available to donate.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch the latest campaign.");
    }
  };

  return (
    <header className="relative">
      {/* Top Black Bar */}
      <div className="bg-black text-white py-2 px-4 flex items-center justify-between text-sm">
        <div className="flex space-x-4 items-center">
          {/* Mobile Icon */}
          <span className="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
            <span>9675496999</span>
          </span>

          {/* Email Icon */}
          <span className="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <span>nirdhansewa@gmail.com</span>
          </span>
        </div>

        <div className="flex space-x-3">
          <a href="#" className="hover:opacity-75">🌐</a>
          <a href="#" className="hover:opacity-75">📘</a>
          <a href="#" className="hover:opacity-75">📷</a>
          <a href="#" className="hover:opacity-75">📧</a>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white shadow-md py-4 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <img
              src={`${finalLogo}`} // Replace with your logo path
              alt="Logo"
              className="h-20 w-auto"
            />
            <span className="text-xl font-bold text-green-700">
              Nirdhan Seva Sadhan
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 text-sm font-medium text-gray-700">
            <a href="/" className="hover:text-green-700">Home</a>
            <a href="/aboutUs" className="hover:text-green-700">About Us</a>
            <a href="/campaigns" className="hover:text-green-700">Our Campaigns</a>
            <a href="#impact" className="hover:text-green-700">Our Impact</a>
            <a href="#join" className="hover:text-green-700">Join Us</a>
            <a href="#gallery" className="hover:text-green-700">Gallery</a>
          </div>

          {/* Donate Now Button */}
          <button
            onClick={handleDonateNow}
            className="hidden lg:block bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded-full shadow-lg hover:from-green-600 hover:to-green-800 transition-all transform hover:scale-105"
          >
            Donate Now
          </button>

          {/* Hamburger Menu */}
          <button
            className="lg:hidden text-gray-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open Menu</span>
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 space-y-2 text-gray-700">
            <a href="#home" className="block px-4 py-2 hover:bg-gray-100">Home</a>
            <a href="#about" className="block px-4 py-2 hover:bg-gray-100">About Us</a>
            <a href="#campaigns" className="block px-4 py-2 hover:bg-gray-100">Our Campaigns</a>
            <a href="#impact" className="block px-4 py-2 hover:bg-gray-100">Our Impact</a>
            <a href="#join" className="block px-4 py-2 hover:bg-gray-100">Join Us</a>
            <a href="#gallery" className="block px-4 py-2 hover:bg-gray-100">Gallery</a>
            <button
              onClick={handleDonateNow}
              className="block bg-gradient-to-r from-green-500 to-green-700 text-white text-center px-4 py-2 rounded-full shadow-lg hover:from-green-600 hover:to-green-800 transition-all transform hover:scale-105"
            >
              Donate Now
            </button>
          </div>
        )}
      </nav>

      {/* Render Children Below */}
      <main>{children}</main>
    </header>
  );
};

export default Header