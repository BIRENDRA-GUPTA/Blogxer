import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Blogs from "../Blogs/Blogs";
import Navbar from "../Navbar/Navbar";
import { Sidebar } from "../Sidebar/Sidebar";
import { RightSidebar } from "../Sidebar/RightSideBar";
import "./MainScreen.css";

const MainScreen = () => {
  return (
    <>
      <Navbar page="main" />
      <div className="main ">
        <section className="hidden md:block  w-0 mx-2  md:w-1/5">
          <Sidebar />
        </section>
        <section className="w-full md:w-4/5">
          <Blogs />
        </section>
        {/* <section className=" hidden md:block w-0 ml-5 md:w-1/5">
          <RightSidebar />
        </section> */}
      </div>
    </>
  );
};

export default MainScreen;
