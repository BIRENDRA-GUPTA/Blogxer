import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./WriteBlog.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { api } from "../../config.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { addBlog } from "../../features/blog/blogSlice";
import { Navigate, useNavigate } from "react-router-dom";

const endPoint = api.endPoint;

let data;
const WriteBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const token = localStorage.getItem("token");
  // const [tagValue, setTagValue] = useState("");
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    imageUrl: "",
    tags: [],
  });
  // const [tagCount, setTagCount] = useState(0);

  // const addTags = (e) => {
  //   if (e.keyCode === 13 && tagValue) {
  //     const data = { ...blog };
  //     blog.tags.push(tagValue);
  //     setBlog(data);
  //     setTagValue("");
  //     setTagCount(tagCount + 1);
  //   }
  // };

  const handleImageUpload = async (e, files) => {
    setLoading1(true);
    // console.log(e.target.name);
    // console.log(files[0]);
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "blogxer");
    const resp = await fetch(
      "https://api.Cloudinary.com/v1_1/dt8ivto0k/image/upload",
      { method: "POST", body: formData }
    );
    const response = await resp.json();
    setBlog({ ...blog, imageUrl: response.url });

    setLoading1(false);
  };

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    if (e.keyCode === 13) {
      return e.preventDefault();
    }

    setLoading(true);
    if (blog.title === "" || blog.content === "") {
      toast.error("All fields are required", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const res = await fetch(`${endPoint}/api/blog/addBlog`, {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
          "content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      });
      const resP = await res.json();

      // console.log(resP);
      if (resP.success === true) {
        toast.success(`${resP.message}`, {
          position: toast.POSITION.TOP_CENTER,
        });
        dispatch(addBlog(resP.blog));
        setBlog({ title: "", content: "" });
        navigate("/");
      } else {
        toast.error(`${resP.error}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
    setLoading(false);
  };

  // const removeTag = (e, item) => {

  //   const blog1 = { ...blog };
  //   blog1.tags = blog1.tags.filter((tag) => tag !== item);
  //   setBlog(blog1);
  //   setTagCount(tagCount - 1);
  // };

  if (!token) {
    return <Navigate to="/login" replace />;
  } else {
    return (
      <div>
        {" "}
        <Navbar page="write" />
        <div className="lg:w-3/4 lg:mx-auto px-10 ">
          <main className="mt-10">
            <form className="bg-white px-5 py-5 shadow-md rounded-md">
              <div className="mb-5 text-center">
                {blog?.imageUrl && (
                  <div className="mx-auto w-full h-full mb-2 border  bg-gray-100 mb-4">
                    <img
                      src={blog?.imageUrl}
                      id="image"
                      alt="blog_image"
                      className="object-contain w-full h-40 rounded-full"
                    />
                  </div>
                )}

                <div className="upload-btn-wrapper">
                  <button className="btn">Upload a file</button>
                  <input
                    type="file"
                    name="profilePic"
                    onChange={(e) => handleImageUpload(e, e.target.files)}
                  />

                  {loading1 ? (
                    <>
                      <Loader />
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <input
                type="text"
                placeholder="Enter Title"
                className=" appearance-none  w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline     mb-2 text-2xl  border-b border-black  "
                autoFocus
                name="title"
                value={blog.title}
                onChange={handleChange}
                id="yourName"
                // required
              />
              {/* <p className="my-2">
              {blog?.tags.map((item) => (
                <button
                  type="button"
                  onClick={(e) => removeTag(e, item)}
                  className="text-black text-sm font-bold  m-1 rounded-md px-2 py-1 hover:bg-gray-200"
                >
                  <span className="flex justify-between">
                    {" "}
                    <span className="mr-1">#{item}</span>
                    <span>
                      {" "}
                      <Trash />
                    </span>
                  </span>
                </button>
              ))}
            </p>
            <input
              type="text"
              placeholder="Add upto 3 Tags only"
              className="w-full border-b disabled:bg-gray-200 border-black mb-4 text-md px-3 py-2"
              name="tags"
              value={tagValue}
              onChange={(e) => setTagValue(e.target.value)}
              onKeyDown={addTags}
              disabled={tagCount == 3 ? true : false}
              id="yourName"
              // required
            /> */}

              <div className="form-group">
                <CKEditor
                  editor={ClassicEditor}
                  onChange={(event, editor) => {
                    data = editor.getData();
                    setBlog({ ...blog, content: data });
                  }}
                  name="content"
                  value={blog.content}
                />
              </div>
              <div className="col-12 text-center">
                {loading ? (
                  <Loader />
                ) : (
                  <button
                    type="button"
                    className="my-3  border border-black  text-black  hover:bg-gray-200 shadow-md rounded-full"
                    style={{ padding: "6px 40px" }}
                    onClick={submit}
                  >
                    Submit Blog
                  </button>
                )}
              </div>
            </form>
          </main>
        </div>
      </div>
    );
  }
};

export default WriteBlog;
