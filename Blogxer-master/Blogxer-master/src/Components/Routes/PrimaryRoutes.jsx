import React from "react";
import { Route, Routes } from "react-router-dom";
import Blog from "../Blogs/Blog";
import Login from "../Auth/Login";
import MainScreen from "../MainScreen/MainScreen";
import Register from "../Auth/Register";
import WriteBlog from "../WriteBlog/WriteBlog";
import Profile from "../Profile/Profile";
import { Error404 } from "../Error404/Error404";
import About from "../About/About";
import EditProfile from "../Profile/EditProfile";
import Bookmarks from "../Bookmarks/Bookmarks";
import Tags from "../Tags/Tags";
import Faq from "../Faq/Faq";
import Contact from "../Contact/Contact";

const PrimaryRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/new-blog" element={<WriteBlog />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
};

export default PrimaryRoutes;
