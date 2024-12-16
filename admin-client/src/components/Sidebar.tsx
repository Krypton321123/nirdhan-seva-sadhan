import React, { useState } from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
      <div className="h-full w-screen flex flex-col lg:flex-row">
        {/* Desktop Sidebar */}
        <div className="sidebar hidden lg:block bg-slate-950 w-[20rem] h-screen">
          <div className="logo text-center w-[20rem] h-[8rem] mt-7 flex-col justify-between">
          <span className="text-white font-bold text-2xl block">
            Nirdhan Sewa Sansthan
          </span>
            <br />
            <span className="text-white font-bold text-xl block">Admin Panel</span>
          </div>
          <div className="linkcenter w-[20rem] h-[20rem]">
            <SidebarLink to="/dashboard" label="Home" />
            <SidebarLink to="/add-campaign" label="Add Campaign" />
            <SidebarLink to="/add-blog" label="Add Blog" />
            <SidebarLink to="/add-gallery-image" label="Add Gallery Image" />
            <SidebarLink
                to={'/get-forms'}
                label={'Approve ID Cards'}
            />
          </div>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="lg:hidden flex items-center p-4 bg-slate-950 text-white w-full">
          <span className="font-bold text-xl">Admin Panel</span>
          <button
              className="ml-auto"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-20"
                onClick={() => setIsMobileMenuOpen(false)}
            ></div>
        )}

        {/* Mobile Sidebar */}
        <div
            className={`fixed top-0 left-0 h-full bg-slate-950 z-30 transition-transform transform ${
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            } w-[16rem]`}
        >
          <div className="logo text-center w-full h-[8rem] mt-7 flex-col justify-between">
          <span className="text-white font-bold text-2xl block">
            Nirdhan Seva Sansthan
          </span>
            <br />
            <span className="text-white font-bold text-xl block">Admin Panel</span>
          </div>
          <div className="linkcenter mt-10 space-y-4">
            <SidebarLink
                to="/dashboard"
                label="Home"
                onClick={() => setIsMobileMenuOpen(false)}
            />
            <SidebarLink
                to="/add-campaign"
                label="Add Campaign"
                onClick={() => setIsMobileMenuOpen(false)}
            />
            <SidebarLink
                to="/add-blog"
                label="Add Blog"
                onClick={() => setIsMobileMenuOpen(false)}
            />
            <SidebarLink
                to="/add-gallery-image"
                label="Add Gallery Image"
                onClick={() => setIsMobileMenuOpen(false)}
            />
            <SidebarLink
                to={'/get-forms'}
                label={'Approve ID Cards'}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">{children}</div>
      </div>
  );
};

// Sidebar Link Component
const SidebarLink = ({
                       to,
                       label,
                       onClick,
                     }: {
  to: string;
  label: string;
  onClick?: () => void;
}) => (
    <div className="w-full flex justify-center items-center mt-4">
      <Link to={to} onClick={onClick}>
        <button className="cursor-pointer flex hover:opacity-50 rounded-lg items-center text-white border-2 p-2 w-[12rem] lg:w-[15rem] h-[3rem]">
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
                d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          &nbsp;&nbsp;{label}
        </button>
      </Link>
    </div>
);

export default Sidebar;