import React from "react";
import finalLogo from "../../assets/logo-final.png";

interface FooterProps {
  children?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <div className="relative">
      {/* Render children above the footer */}
      <div className="mb-16">{children}</div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          {/* Footer Content Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Logo and Description Section */}
            <div className="flex flex-col items-start">
              <img
                src={`${finalLogo}`} // Replace with actual logo
                alt="Company Logo"
                className="w-32 h-32 object-cover mb-4"
              />
              <p className="text-sm text-gray-400">
                Our mission is to create a better world by helping communities
                and causes that matter.
              </p>
            </div>

            {/* Quick Links Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul>
                <li>
                  <a href="#" className="hover:text-green-500">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-500">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-500">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-500">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media Section with SVGs */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-6">
                {/* Facebook SVG */}
                <a href="#" className="text-xl hover:text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24H12.81v-9.294H9.692V11.24h3.118V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.465.099 2.796.144v3.24h-1.918c-1.507 0-1.799.717-1.799 1.767v2.318h3.594l-.468 3.465h-3.126V24h6.126c.732 0 1.325-.593 1.325-1.326V1.326C24 .593 23.406 0 22.675 0z" />
                  </svg>
                </a>

                {/* YouTube SVG */}
                <a href="#" className="text-xl hover:text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a2.956 2.956 0 00-2.08-2.086C19.378 3.586 12 3.586 12 3.586s-7.378 0-9.418.514a2.956 2.956 0 00-2.08 2.086A30.37 30.37 0 000 11.999a30.37 30.37 0 00.502 5.814 2.956 2.956 0 002.08 2.086c2.04.514 9.418.514 9.418.514s7.378 0 9.418-.514a2.956 2.956 0 002.08-2.086A30.37 30.37 0 0024 11.999a30.37 30.37 0 00-.502-5.813zM9.546 15.568V8.431L15.818 12l-6.272 3.568z" />
                  </svg>
                </a>

                {/* Instagram SVG */}
                <a href="#" className="text-xl hover:text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.09 10.09 0 01-3.184 1.213 4.92 4.92 0 00-8.384 4.482A13.97 13.97 0 011.671 3.149a4.822 4.822 0 001.523 6.573 4.902 4.902 0 01-2.229-.616v.061a4.936 4.936 0 003.946 4.827 4.996 4.996 0 01-2.224.085 4.937 4.937 0 004.604 3.419A9.867 9.867 0 010 21.542a13.936 13.936 0 007.548 2.212c9.05 0 14-7.496 14-13.986 0-.209 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
                  </svg>
                </a>

                {/* Twitter SVG */}
                <a href="#" className="text-xl hover:text-green-500">
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
          </div>

          {/* Copyright Section */}
          <div className="text-center mt-12 text-sm text-gray-400">
            <p>&copy; 2024 Nirdhan Seva Sansthan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
