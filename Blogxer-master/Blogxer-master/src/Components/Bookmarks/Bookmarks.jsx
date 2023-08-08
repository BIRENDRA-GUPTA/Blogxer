import React, { useState, useEffect } from "react";
import { addUserData, getUserReadingList } from "../../features/Auth/authSlice";
import Navbar from "../Navbar/Navbar";
import { Navigate, Link } from "react-router-dom";
import { api } from "../../config.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { currentBlog, getBlog } from "../../features/blog/blogSlice";
import { getUser } from "../../features/Auth/authSlice.js";

import moment from "moment/moment";
import Like from "../Icons/Like";
import Comment from "../Icons/Comment";
import BookMark from "../Icons/BookMark";
import Button from "../Button/Button";
// const endPointF = api.frontend;
const endPoint = api.endPoint;

const Bookmarks = () => {
  const dispatch = useDispatch();
  const [readingList, setReadingList] = useState([]);
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const AuthState = useSelector((state) => state.auth);
  // const [userData, setUserData] = useState(AuthState?.user);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch(
        `${endPoint}/api/auth/getUserReadingList/${AuthState?.user?._id}`,
        {
          headers: {
            authorization: "Bearer " + token,
            "content-Type": "application/json",
          },
        }
      );
      const response = await res.json();
      console.log(response);
      if (response.success === true) {
        setReadingList(response.blogs);
        dispatch(getUserReadingList(response.blogs));
        setLoading(false);
      }
      setLoading(false);
    })();
  }, []);

  const setUserForProfile = (id) => {
    localStorage.setItem("userForProfile", id);
  };

  const avgWordsPM = 250;

  if (!AuthState.isAuthenticated) return <Navigate to="/login" replace />;
  else {
    return (
      <div className="">
        <Navbar />
        <div className="w-3/6 mx-auto">
          {!loading && readingList?.length === 0 && (
            <p className="text-center my-5 font-bold">
              {" "}
              OOPs! No Bookmarkeds blogs Found <br />{" "}
              <Link to="/" className="text-blue-600 underline">
                {" "}
                Read Blogs
              </Link>{" "}
            </p>
          )}
          {!loading ? (
            readingList?.map((blog) => (
              <div
                key={blog._id}
                className="shadow mb-3 mt-2 bg-white border-bottom"
              >
                <a className="mb-10 block    rounded-lg p-4  shadow-3xl  shadow-gray-100">
                  <div className="mt-2">
                    <dl>
                      <div className="flex align-m  mb-2">
                        <dd className="mr-1">
                          <img
                            className="h-8 w-8 rounded-full  object-contain"
                            src={blog?.postedBy?.profilePic}
                            alt=""
                          />
                        </dd>
                        <dd className="text-sm text-gray-500 ml-1 flex flex-col">
                          {" "}
                          <span className="font-bold text-black">
                            <Link
                              className="hover:text-blue-600 hover:underline"
                              to="/profile"
                              onClick={() =>
                                setUserForProfile(blog?.postedBy?._id)
                              }
                            >
                              {blog.postedBy.name}
                            </Link>
                          </span>{" "}
                          <span>
                            {new Date(blog?.createdAt).toDateString()}{" "}
                            {`(${moment(blog?.createdAt).fromNow()})`}
                          </span>
                        </dd>
                      </div>
                      <div>
                        <dt className="sr-only">Title</dt>

                        <Link
                          to={`/blog`}
                          onClick={() => dispatch(currentBlog(blog))}
                        >
                          {" "}
                          <dd className=" text-xl font-bold  mb-2 ml-2">
                            {" "}
                            {blog?.title}
                          </dd>
                        </Link>

                        <dd className=" text-sm flex  justify-between mb-2">
                          <span className="flex flex-col md:flex-row align-middle">
                            {" "}
                            <span className="flex justify-between mr-2 hover:bg-gray-100 hover:rounded-md px-2  py-1 border border-white hover:border hover:border-gray-200">
                              {" "}
                              <Like />{" "}
                              <span className="mx-1">
                                {blog?.like?.length} Reactions
                              </span>
                            </span>{" "}
                            <span className="flex hover:bg-gray-100 hover:rounded-md px-2  py-1 border border-white hover:border hover:border-gray-200 ">
                              <Comment />
                              <span className="mx-1">
                                {blog?.comments?.length} Comments
                              </span>
                            </span>
                          </span>
                          <span className="text-sm flex">
                            {" "}
                            <span className="mr-3 pt-1">
                              {Math.ceil(
                                blog?.content?.split(" ").length / avgWordsPM
                              )}{" "}
                              min read
                            </span>
                          </span>
                        </dd>
                      </div>
                      <div>
                        <dt className="sr-only">Date</dt>

                        <dd className="text-sm text-gray-500"> </dd>
                      </div>
                    </dl>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    );
  }
};

export default Bookmarks;
