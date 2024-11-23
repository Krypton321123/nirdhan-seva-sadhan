import React from 'react';
import finalLogo from '../../assets/logo-final.png'

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
                Our mission is to create a better world by helping communities and causes that matter.
              </p>
            </div>

            {/* Quick Links Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul>
                <li><a href="#" className="hover:text-green-500">About Us</a></li>
                <li><a href="#" className="hover:text-green-500">Contact</a></li>
                <li><a href="#" className="hover:text-green-500">Terms of Service</a></li>
                <li><a href="#" className="hover:text-green-500">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Social Media Section with SVGs */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-6">
                {/* Facebook SVG */}
                <a href="#" className="text-xl hover:text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" id="facebook">
                    <path fill="#1877f2" d="M1024,512C1024,229.23016,794.76978,0,512,0S0,229.23016,0,512c0,255.554,187.231,467.37012,432,505.77777V660H302V512H432V399.2C432,270.87982,508.43854,200,625.38922,200,681.40765,200,740,210,740,210V336H675.43713C611.83508,336,592,375.46667,592,415.95728V512H734L711.3,660H592v357.77777C836.769,979.37012,1024,767.554,1024,512Z"></path>
                    <path fill="#fff" d="M711.3,660,734,512H592V415.95728C592,375.46667,611.83508,336,675.43713,336H740V210s-58.59235-10-114.61078-10C508.43854,200,432,270.87982,432,399.2V512H302V660H432v357.77777a517.39619,517.39619,0,0,0,160,0V660Z"></path>
                </svg>
                </a>

                {/* YouTube SVG */}
                <a href="#" className="text-xl hover:text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.995 2.908 7.34 6.747 7.832V10H4v-2h2.747V6.65c0-2.66 1.537-4.15 4.026-4.15 1.181 0 2.384.087 2.637.126v2.69h-1.82c-1.426 0-1.857.689-1.857 1.716v2.253h3.375l-.44 2h-2.935V15.83C13.092 15.34 16 11.995 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                </a>

                {/* Instagram SVG */}
                <a href="#" className="text-xl hover:text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.995 2.908 7.34 6.747 7.832V10H4v-2h2.747V6.65c0-2.66 1.537-4.15 4.026-4.15 1.181 0 2.384.087 2.637.126v2.69h-1.82c-1.426 0-1.857.689-1.857 1.716v2.253h3.375l-.44 2h-2.935V15.83C13.092 15.34 16 11.995 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                </a>

                {/* Twitter SVG */}
                <a href="#" className="text-xl hover:text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.03 0 9.335-5 9.335-9.335 0-.14 0-.28-.009-.42A6.693 6.693 0 0 0 16 3.539a6.566 6.566 0 0 1-1.889.516A3.333 3.333 0 0 0 15.557 2a6.608 6.608 0 0 1-2.097.799A3.3 3.3 0 0 0 11.392.4a3.39 3.39 0 0 0-2.487 1.082A3.336 3.336 0 0 0 6.75 3.292a9.447 9.447 0 0 1-6.857-3.475A3.317 3.317 0 0 0 2.9 5.352a3.3 3.3 0 0 0 1.457-.402A3.336 3.336 0 0 0 1.24 7.9a3.332 3.332 0 0 0 1.66 2.866A6.64 6.64 0 0 1 .8 10.69a9.497 9.497 0 0 0 5.226 1.524z"/>
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
