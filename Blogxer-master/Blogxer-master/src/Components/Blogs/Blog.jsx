import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Blog.css";
import {
  addBookmark,
  addComment,
  addLike,
  addUnlike,
} from "../../features/blog/blogSlice";
import { api } from "../../config.js";
import ReactHtmlParser from "html-react-parser";
import { useEffect } from "react";
import { deleteCommentRed } from "../../features/blog/blogSlice";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import { Sidebar } from "../Sidebar/Sidebar";
import Like from "../Icons/Like";
import Comment from "../Icons/Comment";
import BookMark from "../Icons/BookMark";
import Button from "../Button/Button";
import User from "../Icons/User";
import ToolTip from "../ToolTip/ToolTip";
import moment from "moment";
import UnLike from "../Icons/UnLike";
import { addBlogToUser, updateUser } from "../../features/Auth/authSlice";
import RemoveBookmark from "../Icons/RemoveBookmark";
const endPointF = api.frontend;
const endPoint = api.endPoint;

const Blog = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const state = useSelector((state) => state.auth.user);
  // console.log(state);
  const token = localStorage.getItem("token");
  // console.log(params);
  const avgWordsPM = 250;
  const [time, setTime] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const blog = useSelector((state) => state.blog.currentBlog);
  const [blogData, setBlogData] = useState(blog);
  const user = useSelector((state) => state.auth.user);
  const [userBookmarked, setUserBookmarked] = useState();
  // console.log(blogData);

  console.log(user);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const data = blogData?.content.split(" ");
    const res = Math.ceil(data.length / avgWordsPM);
    setTime(res);
    setBlogData(blog);
    const result = user?.readingList?.includes(blog?._id);
    setUserBookmarked(result);
  }, [blogData, blog]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addComment1 = async (e) => {
    if (comment === "")
      return toast.error("Please enter some text in comment box!", {
        position: toast.POSITION.TOP_CENTER,
      });
    setLoading(true);
    const data1 = {
      content: comment,
      blogId: blogData?._id,
    };
    const response = await fetch(`${endPoint}/api/blog/addComment`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + token,
        "content-Type": "application/json",
      },
      body: JSON.stringify(data1),
    });
    const data = await response.json();
    // console.log(data);
    if (data.success === true) {
      // console.log("data.blog    " + data.blog1);
      setBlogData(data.blog1);
      dispatch(addComment(data.blog1));
      toast.success("Comment Added 🚀🚀", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setComment("");
    setLoading(false);
  };

  const likeBlog = async (e) => {
    const data1 = { blogId: blogData?._id };
    const response = await fetch(`${endPoint}/api/blog/likeBlog`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + token,
        "content-Type": "application/json",
      },
      body: JSON.stringify(data1),
    });
    const data = await response.json();

    if (data.success == true) {
      setBlogData(data.blog);
      dispatch(addLike(data.blog));
    }
  };

  const bookmarkBlog = async (e) => {
    const data1 = { blogId: blogData?._id };
    const response = await fetch(`${endPoint}/api/blog/bookmarkBlog`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + token,
        "content-Type": "application/json",
      },
      body: JSON.stringify(data1),
    });
    const data = await response.json();

    if (data.success === true) {
      setBlogData(data.blog);
      console.log(data);
      console.log(data.user);
      dispatch(updateUser(data.user));
      dispatch(addBookmark(data.blog));
    }
  };
  const RemoveBookMarkBlog = async (e) => {
    const data1 = { blogId: blogData?._id };
    const response = await fetch(`${endPoint}/api/blog/bookmarkBlog`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + token,
        "content-Type": "application/json",
      },
      body: JSON.stringify(data1),
    });
    const data = await response.json();

    if (data.success === true) {
      setBlogData(data.blog);

      dispatch(updateUser(data.user));
      dispatch(addBookmark(data.blog));
    }
  };

  const UnLikeBlog = async (e) => {
    const data1 = { blogId: blogData?._id };
    const response = await fetch(`${endPoint}/api/blog/unlikeBlog`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + token,
        "content-Type": "application/json",
      },
      body: JSON.stringify(data1),
    });
    const data = await response.json();

    if (data.success === true) {
      setBlogData(data.blog);
      dispatch(addUnlike(data.blog));
    }
  };

  const deleteComment = async (e, id) => {
    // console.log(e, id);
    try {
      const res = await fetch(
        `${endPoint}/api/blog/deleteComment/${blogData?._id}/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: "Bearer " + token,
            "content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.success === true) {
        dispatch(deleteCommentRed(data.blog));
        setBlogData(data.blog);
        toast.warn("Comment Deleted 🚀🚀", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {}
  };

  const shareFunction = () => {
    navigator.share({
      title: `${blogData.title}`,
      text: `${blogData.content}`,
      url: `${endPointF}/blog`,
    });
  };

  const textToSpeech = () => {
    const text = blog.title + blog.content;
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };
  console.log("user reading,list", user.readingList);
  const setUserForProfile = (id) => {
    localStorage.setItem("userForProfile", id);
  };

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  else {
    return (
      <>
        <Navbar page="blog" />
        <div className="max-w-screen-xl flex mx-auto">
          <section className="  w-0 mx-2 mt-10 md:w-1/6 ">
            <div className="sticky top-20 flex  justify-end">
              <div className="flex flex-col mr-10">
                <span className="my-3 flex flex-col   text-md ">
                  <span>
                    {blog?.like?.includes(user?._id) ? (
                      <button onClick={UnLikeBlog}>
                        {" "}
                        <UnLike />
                      </button>
                    ) : (
                      <button onClick={likeBlog}>
                        <Like />
                      </button>
                    )}
                  </span>
                  <span className="mx-auto">{blog?.like?.length}</span>
                </span>
                <span className="my-3 flex flex-col    text-md">
                  <span>
                    <a href="#comments" className="scroll-smooth">
                      <Comment />
                    </a>
                  </span>
                  <span className="mx-auto">{blog?.comments?.length}</span>
                </span>
                <span className="my-3 flex flex-col text-md">
                  <span>
                    {userBookmarked ? (
                      <button onClick={RemoveBookMarkBlog}>
                        {" "}
                        <RemoveBookmark />
                      </button>
                    ) : (
                      <button onClick={bookmarkBlog}>
                        <BookMark />
                        {/* <RemoveBookmark /> */}
                      </button>
                    )}
                  </span>
                  <span className="mx-auto">{blog?.bookmarks.length}</span>
                </span>
              </div>
            </div>
          </section>
          <main className="mt-10 w-full mx-10 md:mx-5 md:w-3/6 bg-white shadow  ">
            <div>
              <>
                <div className="p-4  bottom-0 z-20">
                  <div className="flex align-middle justify-between ">
                    <div className="flex mt-3">
                      <img
                        src={blog?.postedBy?.profilePic}
                        className="h-10 w-10 rounded-full mr-2 object-contain bg-gray-800"
                      />
                      <div>
                        <p className="font-semibold text-black text-sm">
                          {" "}
                          <Link
                            className="hover:text-blue-600 hover:underline"
                            to="/profile"
                            onClick={() =>
                              setUserForProfile(blog?.postedBy?._id)
                            }
                          >
                            {blogData.postedBy.name}
                          </Link>
                        </p>
                        <p className="font-semibold text-gray-400 text-xs">
                          {" "}
                          {new Date(blogData.createdAt).toDateString()} · {time}{" "}
                          min read
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-2xl mt-3  text-black leding-tight">
                    {blogData.title}
                  </p>
                </div>

                {blog?.imageUrl && (
                  <img
                    src={blog?.imageUrl}
                    className=" w-full h-full z-0 object-contain"
                  />
                )}
              </>
            </div>
            <div className="px-10">
              <div className=" px-4 lg:px-0 mt-3 text-justify text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
                <p className="pb-6">{ReactHtmlParser(blogData.content)}</p>
              </div>
            </div>
            <div className="px-10 ">
              <div className="antialiased mx-auto max-w-screen-md">
                <h3
                  id="comments"
                  className="mb-4 text-lg font-semibold text-gray-900"
                >
                  Comments
                </h3>

                <div className="space-y-4">
                  {blogData?.comments?.map((comment) => (
                    <div key={comment?._id} className="flex">
                      <div className="flex-shrink-0 mr-3">
                        <img
                          className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                          src={comment?.postedBy?.profilePic}
                          alt=""
                        />
                      </div>
                      <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                        <div className="flex justify-between">
                          <div>
                            {" "}
                            <Link
                              className="hover:text-blue-600 hover:underline"
                              to="/profile"
                              onClick={() =>
                                setUserForProfile(comment?.postedBy?._id)
                              }
                            >
                              <strong>{comment?.postedBy?.name}</strong>{" "}
                            </Link>
                            <p className="text-sm">{comment?.content}</p>
                          </div>
                          {state?._id === blogData?.postedBy?._id && (
                            <div>
                              <button
                                onClick={(e) => deleteComment(e, comment?._id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded-full"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <textarea
                    id="message"
                    rows="4"
                    autoFocus
                    onChange={(e) => setComment(e.target.value)}
                    name="comment"
                    value={comment}
                    className="block  outline-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border "
                    placeholder="Your message..."
                  ></textarea>
                  <div className="col-12 text-center">
                    <button
                      onClick={addComment1}
                      className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full my-2"
                      style={{ padding: "8px 70px" }}
                    >
                      {loading ? <Loader /> : "Add comment"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <section className="mt-10 hidden md:block  w-0 ml-10   md:w-2/6">
            <div className=" bg-gray-200   w-4/6 sticky top-20 flex flex-wrap items-center  justify-center  ">
              <div className="container  bg-white  shadow-lg    transform   duration-200 easy-in-out">
                <div className=" h-20 overflow-hidden">
                  <img
                    className="w-full"
                    src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    alt=""
                  />
                </div>
                <div className="flex justify-center px-5  -mt-6">
                  <img
                    className="h-12 w-12 bg-white p-2 rounded-full   "
                    src={blogData?.postedBy?.profilePic}
                    alt=""
                  />
                </div>
                <div className=" ">
                  <div className="text-center px-10">
                    <h2 className="text-gray-800 text-xl font-bold">
                      <Link
                        to="/profile"
                        onClick={() =>
                          setUserForProfile(blogData?.postedBy?._id)
                        }
                        className="  hover:text-blue-500 hover:underline text-gray-700"
                      >
                        {" "}
                        {blogData?.postedBy?.name}
                      </Link>
                    </h2>

                    <br />
                    <Button className="bg-blue-800 text-white my-0">
                      Follow
                    </Button>
                    <p className="mt-2 text-gray-500 text-sm">
                      Lorem Ipsum is simply
                    </p>
                  </div>
                  <hr className="mt-6" />
                 
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
};

export default Blog;
