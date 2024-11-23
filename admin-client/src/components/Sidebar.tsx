import React from "react";
import { Link } from "react-router-dom";

interface sidebar {
  children: React.ReactNode;
}

const Sidebar = ({ children }: sidebar) => {
  return (
    <div className="h-screen w-screen flex">
      <div className="sidebar hidden lg:block bg-slate-950 w-[20rem] h-screen">
        <div className="logo text-center w-[20rem] h-[8rem] mt-7 flex-col justify-between ">
          <span className="text-white font-bold text-2xl block">
            Nirdhan Seva Sansthan
          </span>
          <br />
          <span className="text-white font-bold text-xl block">
            Admin Panel
          </span>
        </div>
        <div className="linkcenter w-[20rem] h-[20rem]">
          <div className="w-[20rem] h-[4rem] flex justify-center items-center">
            <Link to={"/dashboard"}>
              <button className="cursor-pointer flex hover:opacity-50 rounded-lg items-center text-white border-2 p-2 w-[15rem] h-[3rem]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                &nbsp;&nbsp;Home
              </button>
            </Link>
          </div>
          <div className="w-[20rem] h-[4rem] flex justify-center items-center">
            <Link to={"/add-campaign"}>
            <button className="cursor-pointer flex hover:opacity-50 rounded-lg items-center text-white border-2 p-2 w-[15rem] h-[3rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              &nbsp;&nbsp;Add Campaign
            </button>
            </Link>
          </div>
          <div className="w-[20rem] h-[4rem] flex justify-center items-center">
            <Link to={"/add-blog"}>
            <button className="cursor-pointer flex hover:opacity-50 rounded-lg items-center text-white border-2 p-2 w-[15rem] h-[3rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              &nbsp;&nbsp;Add blog
            </button>
            </Link>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
