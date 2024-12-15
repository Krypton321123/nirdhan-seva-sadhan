import React, { useState } from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
      <div className="h-screen w-screen flex">
        {/* Sidebar */}
        <div
            className={`bg-slate-950 h-screen lg:block ${
                isSidebarOpen ? "block" : "hidden"
            } absolute lg:relative z-20 lg:w-[20rem] w-[16rem]`}
        >
          <div className="logo text-center mt-7 flex-col justify-between ">
          <span className="text-white font-bold text-2xl block">
            Nirdhan Seva Sansthan
          </span>
            <br />
            <span className="text-white font-bold text-xl block">
            Admin Panel
          </span>
          </div>
          <div className="linkcenter mt-10">
            <div className="w-full h-[4rem] flex justify-center items-center">
              <Link to={"/dashboard"}>
                <button className="cursor-pointer flex hover:opacity-50 rounded-lg items-center text-white border-2 p-2 w-[12rem] lg:w-[15rem] h-[3rem]">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                  &nbsp;&nbsp;Home
                </button>
              </Link>
            </div>
            <div className="w-full h-[4rem] flex justify-center items-center">
              <Link to={"/add-campaign"}>
                <button className="cursor-pointer flex hover:opacity-50 rounded-lg items-center text-white border-2 p-2 w-[12rem] lg:w-[15rem] h-[3rem]">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  &nbsp;&nbsp;Add Campaign
                </button>
              </Link>
            </div>
            <div className="w-full h-[4rem] flex justify-center items-center">
              <Link to={"/add-blog"}>
                <button className="cursor-pointer flex hover:opacity-50 rounded-lg items-center text-white border-2 p-2 w-[12rem] lg:w-[15rem] h-[3rem]">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  &nbsp;&nbsp;Add Blog
                </button>
              </Link>
            </div>
            <div className="w-full h-[4rem] flex justify-center items-center">
              <Link to={"/add-gallery-image"}>
                <button className="cursor-pointer flex hover:opacity-50 rounded-lg items-center text-white border-2 p-2 w-[12rem] lg:w-[15rem] h-[3rem]">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  &nbsp;&nbsp;Add Gallery Image
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative flex-grow">
          {/* Mobile Toggle Button */}
          <div className="lg:hidden flex items-center justify-between bg-slate-950 p-4">
            <span className="text-white font-bold">Admin Panel</span>
            <button
                className="text-white"
                onClick={() => setIsSidebarOpen((prev) => !prev)}
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Main Content */}
          <div className="p-4">{children}</div>
        </div>
      </div>
  );
};

export default Sidebar;