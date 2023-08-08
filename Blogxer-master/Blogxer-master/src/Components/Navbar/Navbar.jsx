import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/OIP.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../../features/Auth/authSlice";
import { toast } from "react-toastify";
import Button from "../Button/Button";
import SideMenu from "./SideMenu";

const Navbar = () => {
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.auth);
  // console.log(Auth);
  const isAuthenticated = Auth.isAuthenticated;
  const [mode, setMode] = useState(false);
  const [toggleSideMenu, setToggleSideMenu] = useState(false);
  const [links, setLinks] = useState([
    // {
    //   path: "/dashboard",
    //   content: "DashBoard",
    // },
    {
      path: "/new-blog",
      content: "Create Blog",
    },
    {
      path: "/edit-profile",
      content: "Edit Profile",
    },
    {
      path: "/bookmarks",
      content: "Bookmarks",
    },
    {
      path: "/setting",
      content: "Settings",
    },
  ]);

  const toggleFun = (eleme) => {
    // console.log(eleme);
    setToggleSideMenu(eleme);
  };

  const setUserForProfile = () => {
    localStorage.setItem("userForProfile", Auth?.user?._id);
  };

  return (
    <>
      <nav className=" sticky z-30 top-0 bg-white border navbar">
        <div className="mx-auto  max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                onClick={() => setToggleSideMenu(!toggleSideMenu)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <SideMenu
              toggleSideMenu={toggleSideMenu}
              toggle={(eleme) => toggleFun(eleme)}
            />
            <div className="flex align-middle flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Link className="flex" to="/">
                  <a className=" logo-design">Blogxer</a>
                </Link>
                {/* <div className="hidden md:flex  justify-center">
                  <div className="mx-4 xl:w-90">
                    <div className="relative flex w-full flex-wrap items-stretch">
                      <input
                        type="search"
                        className="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-addon3"
                      />
                      <button
                        className="relative z-[2] rounded-r border-2 border-blue-800 px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                        type="button"
                        id="button-addon3"
                        data-te-ripple-init
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {isAuthenticated && (
                <Link to="/new-blog" className="hidden md:block px-2">
                  <Button className="border text-blue-700 hover:bg-blue-700 hover:text-white border-blue-700">
                    Create Blog
                  </Button>
                </Link>
              )}

              {!isAuthenticated && (
                <Link to="/login" className=" block px-2">
                  <Button className="border text-blue-700 hover:bg-blue-700 hover:text-white border-blue-700">
                    Login
                  </Button>
                </Link>
              )}

              {isAuthenticated && (
                <div className="relative ml-3">
                  <div>
                    <button
                      type="button"
                      className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        onClick={() => setMode(!mode)}
                        className="h-8 w-8 rounded-full  object-contain"
                        src={Auth.user?.profilePic}
                        alt=""
                      />
                    </button>
                  </div>

                  <div
                    className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                      mode ? "block" : "hidden"
                    }`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabindex="-1"
                  >
                    <Link
                      to="/profile"
                      onClick={setUserForProfile}
                      className=" flex flex-col align-middle  hover:text-blue-500  justify-start pb-2 px-4    text-gray-700"
                    >
                      <span className="text-lg font-bold">
                        {Auth.user.name}
                      </span>
                    </Link>
                    <hr className="border-b-1 mx-3" />
                    {links?.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="flex align-middle hover:text-blue-500 justify-start  px-3 py-2 text-md text-gray-700"
                        role="menuitem"
                        tabindex="-1"
                        id="user-menu-item-0"
                      >
                        <span className="mr-1"></span>

                        <span className="">{link.content}</span>
                      </Link>
                    ))}
                    <hr className="border-b-1 mx-3" />
                    <a
                      onClick={() => {
                        dispatch(logout());
                        toast.warn("Logout Successfull ✅", {
                          position: toast.POSITION.TOP_CENTER,
                        });
                      }}
                      // href="#"
                      className="flex cursor-pointer justify-start px-3 py-2 text-md text-gray-700"
                      role="menuitem"
                      tabindex="-1"
                      id="user-menu-item-2"
                    >
                      <span className="mr-1"></span>
                      <span> Sign out</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
