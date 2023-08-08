import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { api } from "../../config.js";
import { currentBlog } from "../../features/blog/blogSlice";
import Navbar from "../Navbar/Navbar";
import Loader from "../Loader/Loader";
import moment from "moment/moment";
import Like from "../Icons/Like";
import Comment from "../Icons/Comment";

const endPoint = api.endPoint;

const Profile = () => {
  const dispatch = useDispatch();
  const avgWordsPM = 250;
  const [loading, setLoading] = useState(false);
  const Auth = useSelector((state1) => state1.auth);
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const userId = localStorage.getItem("userForProfile");


  useEffect(() => {
    (async () => {
      setLoading(true);
      const userData = await fetch(
        `${endPoint}/api/auth/getUserProfile/${userId}`,
        {
          method: "GET",
          headers: {
            authorization: "Bearer " + token,
            "content-Type": "application/json",
          },
        }
      );
      const resp = await userData.json();
      setUser(resp.user);
       
      setBlogs(resp.blogs);
      setLoading(false);
    })();
  }, []);

  const deleteBlog = async (id) => {
    setLoading(true);
    const deletedBlog = await fetch(`${endPoint}/api/blog/deleteBlog/${id}`, {
      method: "DELETE",
      headers: {
        authorization: "Bearer " + token,
        "content-Type": "application/json",
      },
    });
    const resp = await deletedBlog.json();
    if (resp.success === true) {
      const blogs1 = blogs;
      const res = blogs1.filter((blog) => blog._id !== id);
      setBlogs(res);
      setLoading(false);
    }

    setLoading(false);
  };

  if (!Auth.isAuthenticated) return <Navigate to="/login" replace />;
  else {
    return (
      <div>
        <Navbar page="profile" />

        {loading ? (
          <div className="flex align-middle justify-center my-5">
            {" "}
            <Loader />
          </div>
        ) : (
          <>
            <div className="max-w-3xl  flex items-center  flex-wrap mx-auto md:mt-13 mt-20 ">
              <div
                id="profile"
                className="w-full  rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl dark:bg-white opacity-1 text-black mx-6 mb-10 md:my-2 "
              >
                <div className=" px-12 pb-12 text-center  ">
                  <div
                    className="block  rounded-full shadow-xl mx-auto -mt-12 h-36 md:h-48 md:w-48 w-36 bg-contain bg-white bg-no-repeat bg-center"
                    style={{
                      backgroundImage: `url(${user?.profilePic})`,
                    }}
                  ></div>

                  <h1 className="text-xl md:text-3xl font-bold pt-3 md:pt-8 ">
                    {user?.name}
                  </h1>
                  <div className="mx-auto  w-2/5 pt-1 md:pt-3 border-b-2 border-green-500 opacity-25"></div>
                  {user?.role && (
                    <p className="pt-2 text-sm md:text-xl md:pt-3 w-full  font-bold flex justify-center align-middle ">
                      <svg
                        className="h-4 md:h-6 fill-current text-green-700"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                      </svg>{" "}
                      <span className="mx-2">{user?.role}</span>
                    </p>
                  )}

                  <p className="pt-3 md:pt-4 w-full text-center  text-sm">
                    Bio : {user?.about}
                  </p>

                  <div className="pt-6 md:pt-6 pb-3 md:pb-6">
                    <a
                      href={`mailto:${user?.email}`}
                      className="bg-green-700 hover:bg-green-900 text-white text-sm md:text-md font-bold py-1 px-2 md:py-2 md:px-4 rounded-full"
                    >
                      Get In Touch
                    </a>
                  </div>

                  <div className="mt-3 md:mt-6 w-4/5 md:w-3/5  mx-auto flex flex-wrap items-center justify-between">
                    <a
                      className="link"
                      href={`${user?.coding?.leetcode}`}
                      target="_blank"
                      rel="noreferrer"
                      data-tippy-content="@github_handle"
                    >
                      <svg
                        className="h-4 md:h-6 fill-current text-gray-600 hover:text-green-700"
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Leetcode</title>
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                    </a>
                    <a
                      className="link"
                      href={`${user?.social?.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                      data-tippy-content="@instagram_handle"
                    >
                      <svg
                        className="h-4 md:h-6 fill-current text-gray-600 hover:text-green-700"
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Instagram</title>
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                      </svg>
                    </a>
                    <a
                      className="link"
                      href={`${user?.social?.facebook}`}
                      target="_blank"
                      rel="noreferrer"
                      data-tippy-content="@facebook_handle"
                    >
                      <svg
                        className="h-4 md:h-6 fill-current text-gray-600 hover:text-green-700"
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Facebook</title>
                        <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0" />
                      </svg>
                    </a>
                    <a
                      className="link"
                      href={`${user?.social?.twitter}`}
                      target="_blank"
                      rel="noreferrer"
                      data-tippy-content="@twitter_handle"
                    >
                      <svg
                        className="h-4 md:h-6 fill-current text-gray-600 hover:text-green-700"
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Twitter</title>
                        <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                      </svg>
                    </a>
                    <a
                      className="link"
                      href={`${user?.social?.linkedin}`}
                      target="_blank"
                      rel="noreferrer"
                      data-tippy-content="@twitter_handle"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 md:h-6 fill-current text-gray-600 hover:text-green-700"
                        role="img"
                        viewBox="0 0 24 24"
                      >
                        {" "}
                        <title>LinkedIN</title>
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* <div className="w-full h-3/5  lg:w-2/5">
            <img
              src={user?.profilePic}
              className="rounded-none h-full  lg:rounded-lg bg-contain shadow-2xl hidden lg:block"
            />
          </div> */}
            </div>
            {blogs?.length > 0 && (
              <div className="w-5/6 mb-5 md:my-5 md:w-5/6 lg:w-3/6 mx-auto">
                <h3 className="font-bold text-xl md:text-2xl text-center">
                  User Blogs
                </h3>{" "}
                {!loading ? (
                  blogs?.map((blog) => (
                    <div
                      key={blog._id}
                      className="shadow mb-3 mt-3 bg-white border-bottom"
                    >
                      <div className="mb-10 block    rounded-lg p-4  shadow-3xl  shadow-gray-100">
                        <div className="mt-2">
                          <dl className="">
                            <div className="flex justify-between">
                              <div className="flex align-m  mb-2">
                                <dd className="mr-1">
                                  <img
                                    className="h-6 w-6 md:h-8 md:w-8 rounded-full  object-contain"
                                    src={blog?.postedBy.profilePic}
                                    alt=""
                                  />
                                </dd>
                                <dd className="text-sm text-gray-500 ml-1 flex flex-col">
                                  {" "}
                                  <span className="font-bold cursor-pointer hover:text-blue-600 hover:underline text-black">
                                    {blog.postedBy.name}
                                  </span>{" "}
                                  <span>
                                    {new Date(blog.createdAt).toDateString()}{" "}
                                    {`(${moment(blog.createdAt).fromNow()})`}
                                  </span>
                                </dd>
                              </div>
                              <div>
                                {" "}
                                {Auth?.user?._id === user?._id && (
                                  <span>
                                    <div className="justify-end mx-2">
                                      <button
                                        type="button"
                                        onClick={() => deleteBlog(blog._id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded-full"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke-width="1.5"
                                          stroke="currentColor"
                                          className="h-3 w-3 md:w-4 md:h-4"
                                        >
                                          <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </span>
                                )}
                              </div>
                            </div>
                            <div>
                              <Link
                                to={`/blog`}
                                onClick={() => dispatch(currentBlog(blog))}
                              >
                                <dt className="sr-only">Title</dt>

                                <dd className="text-md md:text-xl hover:underline font-bold  mb-2 ml-2">
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
                                        blog?.content?.split(" ")?.length /
                                          avgWordsPM
                                      )}{" "}
                                      min read
                                    </span>
                                    {/* <span
                              className={`${
                                blog?.postedBy?.readingList?.includes(blog._id) &&
                                "bg-gray-200 border  rounded-md border-gray-200"
                              } hover:bg-gray-100 hover:rounded-md   py-1 px-1 border border-white hover:border hover:border-gray-200`}
                            >
                              <BookMark />
                            </span> */}
                                  </span>
                                </dd>
                              </Link>
                            </div>
                            <div>
                              <dt className="sr-only">Date</dt>

                              <dd className="text-sm text-gray-500"> </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <Loader />
                )}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
};

export default Profile;
