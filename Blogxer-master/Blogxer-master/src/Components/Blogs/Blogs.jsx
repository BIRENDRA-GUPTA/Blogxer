import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { currentBlog, getBlog } from "../../features/blog/blogSlice";
import { api } from "../../config.js";
import ReactHtmlParser from "html-react-parser";
import Loader from "../Loader/Loader";
import moment from "moment/moment";
import Like from "../Icons/Like";
import Comment from "../Icons/Comment";
import BookMark from "../Icons/BookMark";
import Button from "../Button/Button";
import UnLike from "../Icons/UnLike";

const endPoint = api.endPoint;

const Blogs = () => {
  const blogs1 = useSelector((state) => state.blog.blogs);
  const [state, setState] = useState(blogs1);
  const dispatch = useDispatch();
  const avgWordsPM = 250;
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(`${endPoint}/api/blog/getAllBlogs`);
      const data = await response.json();
      // console.log(data);
      setState(data.Blogs);
      dispatch(getBlog(data.Blogs));
      setLoading(false);
    })();
  }, []);

  const blogs = useSelector((state) => state.blog.blogs);

  const setUserForProfile = (id) => {
    localStorage.setItem("userForProfile", id);
  };

  return (
    <div>
      {!loading && state?.length === 0 && (
        <p className="text-center my-2 font-bold">
          {" "}
          OOPs! No blogs Found <br />{" "}
          <Link to="/new-blog" className="text-blue-600 underline">
            Create New Blog
          </Link>
        </p>
      )}
      {/* {state?.length > 1 && (
        <span>
          <Button>Latest</Button> <Button>Top</Button>{" "}
        </span>
      )} */}
      {!loading ? (
        state?.map((blog) => (
          <div
            key={blog._id}
            className="shadow mb-3 mt-2 bg-white border-bottom"
          >
            {blog?.imageUrl?.indexOf("http") >= 0 && (
              <img
                alt="Home"
                src={blog?.imageUrl}
                className="h-56 md:h-80 w-full    mr-5 rounded-md object-contain bg-gray-200"
              />
            )}
            {/* {console.log(blog)} */}
            <div className="mt-2">
              <dl>
                <div className="flex align-m px-4 pt-4  mb-2">
                  <dd className="mr-1">
                    <img
                      className="h-8 w-8 rounded-full  object-contain"
                      src={blog?.postedBy.profilePic}
                      alt=""
                    />
                  </dd>
                  <dd className="text-sm text-gray-500 ml-1 flex flex-col">
                    {" "}
                    <span className="font-bold text-black">
                      <Link
                        to="/profile"
                        onClick={() => setUserForProfile(blog?.postedBy?._id)}
                        className="hover:text-blue-600 hover:underline"
                      >
                        {blog.postedBy.name}
                      </Link>
                    </span>{" "}
                    <span>
                      {new Date(blog.createdAt).toDateString()}{" "}
                      {`(${moment(blog.createdAt).fromNow()})`}
                    </span>
                  </dd>
                </div>
                <Link
                  to={`/blog`}
                  onClick={() => dispatch(currentBlog(blog))}
                  className="mb-10 block    rounded-lg p-4  shadow-3xl  shadow-gray-100"
                >
                  <div>
                    <dt className="sr-only">Title</dt>

                    <dd className=" text-xl font-bold  mb-2 ml-2 hover:underline">
                      {" "}
                      {blog.title}
                    </dd>
                    {/* <dd className=" text-sm  mb-2 ">
                        {blog?.tags?.map((tag) => (
                          <span className=" hover:bg-gray-100 hover:rounded-md px-2  py-1 border border-white hover:border hover:border-gray-200">
                            #{tag}
                          </span>
                        ))}
                      </dd> */}
                    <dd className=" text-sm flex  justify-between mb-2">
                      <span className="flex flex-col md:flex-row align-middle">
                        {" "}
                        <span className="flex justify-between mr-2 hover:bg-gray-100 hover:rounded-md px-2  py-1 border border-white hover:border hover:border-gray-200">
                          {blog?.like?.includes(user?._id) ? (
                            <button>
                              {" "}
                              <UnLike />
                            </button>
                          ) : (
                            <button>
                              <Like />
                            </button>
                          )}
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
                            blog?.content.split(" ").length / avgWordsPM
                          )}{" "}
                          min read
                        </span>
                        <span
                          className={`${
                            blog?.bookmarks?.includes(user._id) &&
                            "bg-gray-200 border  rounded-md border-gray-200"
                          } hover:bg-gray-100 hover:rounded-md   py-1 px-1 border border-white hover:border hover:border-gray-200`}
                        >
                          <BookMark />
                        </span>
                      </span>
                    </dd>
                  </div>
                </Link>
                <div>
                  <dt className="sr-only">Date</dt>

                  <dd className="text-sm text-gray-500"> </dd>
                </div>
              </dl>
            </div>
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Blogs;
