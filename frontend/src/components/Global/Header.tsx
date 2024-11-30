import React, { useState } from "react";
import finalLogo from "../../assets/logo-final.png";
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
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/campaign/getLatestCampaign`
      );
      const { data } = response.data;
      console.log(response.data.data[0]);

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
      
      <div className="bg-black text-white py-2 px-4 flex items-center justify-between text-sm">
        <div className="flex space-x-4 items-center">
          
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
          <a href="#" className="hover:opacity-75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24H12.81v-9.294H9.692V11.24h3.118V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.465.099 2.796.144v3.24h-1.918c-1.507 0-1.799.717-1.799 1.767v2.318h3.594l-.468 3.465h-3.126V24h6.126c.732 0 1.325-.593 1.325-1.326V1.326C24 .593 23.406 0 22.675 0z" />
            </svg>
          </a>
          <a href="#" className="hover:opacity-75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a2.956 2.956 0 00-2.08-2.086C19.378 3.586 12 3.586 12 3.586s-7.378 0-9.418.514a2.956 2.956 0 00-2.08 2.086A30.37 30.37 0 000 11.999a30.37 30.37 0 00.502 5.814 2.956 2.956 0 002.08 2.086c2.04.514 9.418.514 9.418.514s7.378 0 9.418-.514a2.956 2.956 0 002.08-2.086A30.37 30.37 0 0024 11.999a30.37 30.37 0 00-.502-5.813zM9.546 15.568V8.431L15.818 12l-6.272 3.568z" />
            </svg>
          </a>
          <a href="#" className="hover:opacity-75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.09 10.09 0 01-3.184 1.213 4.92 4.92 0 00-8.384 4.482A13.97 13.97 0 011.671 3.149a4.822 4.822 0 001.523 6.573 4.902 4.902 0 01-2.229-.616v.061a4.936 4.936 0 003.946 4.827 4.996 4.996 0 01-2.224.085 4.937 4.937 0 004.604 3.419A9.867 9.867 0 010 21.542a13.936 13.936 0 007.548 2.212c9.05 0 14-7.496 14-13.986 0-.209 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
            </svg>
          </a>
          <a href="#" className="hover:opacity-75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-pink-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.337 3.608 1.311.975.975 1.249 2.242 1.31 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.337 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.31-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.337-3.608-1.311-.975-.975-1.249-2.242-1.31-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.337-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163M12 0C8.741 0 8.332.015 7.052.072 5.773.129 4.643.397 3.643 1.396 2.644 2.396 2.376 3.526 2.319 4.805 2.261 6.084 2.246 6.493 2.246 12c0 5.507.015 5.916.072 7.195.057 1.279.324 2.409 1.324 3.409 1 1 2.13 1.268 3.409 1.324 1.279.057 1.688.072 7.195.072s5.916-.015 7.195-.072c1.279-.057 2.409-.324 3.409-1.324 1-1 1.268-2.13 1.324-3.409.057-1.279.072-1.688.072-7.195s-.015-5.916-.072-7.195c-.057-1.279-.324-2.409-1.324-3.409-1-1-2.13-1.268-3.409-1.324C17.916.015 17.507 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.838 3.838 0 110-7.676 3.838 3.838 0 010 7.676zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
            </svg>
          </a>
        </div>
      </div>

     
      <nav className="bg-white shadow-md py-4 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <a href="/" className="flex items-center space-x-2">
            <img
              src={`${finalLogo}`} // Replace with your logo path
              alt="Logo"
              className="h-20 w-auto"
            />
            <span className="text-xl font-bold text-green-700">
              Nirdhan Sewa Sansthan
            </span>
          </a>

          
          <div className="hidden lg:flex space-x-6 text-sm font-medium text-gray-700">
            <a href="/" className="hover:text-green-700">
              Home
            </a>
            <a href="/aboutUs" className="hover:text-green-700">
              About Us
            </a>
            <a href="/campaigns" className="hover:text-green-700">
              Our Campaigns
            </a>
            <a href="/ourimpact" className="hover:text-green-700">
              Our Impact
            </a>
            <a href="/joinus" className="hover:text-green-700">
              Join Us
            </a>
            <a href="/gallery" className="hover:text-green-700">
              Gallery
            </a>
          </div>

         
          <button
            onClick={handleDonateNow}
            className="hidden lg:block bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded-full shadow-lg hover:from-green-600 hover:to-green-800 transition-all transform hover:scale-105"
          >
            Donate Now
          </button>

       
          <button
            className="lg:hidden text-gray-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open Menu</span>
            {isMobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

       
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 space-y-2 text-gray-700">
            <a href="/" className="block px-4 py-2 hover:bg-gray-100">
              Home
            </a>
            <a href="/aboutus" className="block px-4 py-2 hover:bg-gray-100">
              About Us
            </a>
            <a href="/campaigns" className="block px-4 py-2 hover:bg-gray-100">
              Our Campaigns
            </a>
            <a href="/ourimpact" className="block px-4 py-2 hover:bg-gray-100">
              Our Impact
            </a>
            <a href="/joinus" className="block px-4 py-2 hover:bg-gray-100">
              Join Us
            </a>
            <a href="/gallery" className="block px-4 py-2 hover:bg-gray-100">
              Gallery
            </a>
            <button
              onClick={handleDonateNow}
              className="block bg-gradient-to-r from-green-500 to-green-700 text-white text-center px-4 py-2 rounded-full shadow-lg hover:from-green-600 hover:to-green-800 transition-all transform hover:scale-105"
            >
              Donate Now
            </button>
          </div>
        )}
      </nav>

      
      <main>{children}</main>
    </header>
  );
};

export default Header;
