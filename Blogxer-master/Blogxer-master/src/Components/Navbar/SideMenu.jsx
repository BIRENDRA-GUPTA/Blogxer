import React from "react";
import { Sidebar } from "../Sidebar/Sidebar";

const SideMenu = (props) => {
  const toggleFun = () => {
    props.toggle(!props.toggleSideMenu);
  };

  return (
    <div className={`${props.toggleSideMenu ? "block" : "hidden"}`}>
      <nav
        id="sidenav-3"
        className="fixed left-0 top-0 z-[1035] h-screen w-60 -translate-x-full overflow-hidden bg-[#f4f4f4] shadow-[0_12px_12px_0_rgba(0,0,0,0.2),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0"
        data-te-sidenav-init
        data-te-sidenav-hidden="false"
        data-te-sidenav-color="white"
      >
        <ul className="relative m-0 list-none px-[0.2rem]" data-te-sidenav-menu-ref>
          <li className="relative">
            <a
              className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-300 outline-none transition duration-300 ease-linear hover:bg-white/10 hover:outline-none focus:bg-white/10 focus:outline-none active:bg-white/10 active:outline-none data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none"
              data-te-sidenav-link-ref
            >
              <span
                className="text-white flex justify-end w-full"
                onClick={toggleFun}
              >
                ❌
              </span>
            </a>
          </li>
          <div className="ml-2">
            <Sidebar />
          </div>
        </ul>
      </nav>

      <button
        className="mt-10 inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
        data-te-sidenav-toggle-ref
        data-te-target="#sidenav-3"
        aria-controls="#sidenav-3"
        aria-haspopup="true"
      >
        <span className="block [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fill-ule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default SideMenu;
