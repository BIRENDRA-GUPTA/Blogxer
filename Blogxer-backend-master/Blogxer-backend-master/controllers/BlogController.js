const Blog = require("../models/Blog");
const User = require("../models/User");
const Comment = require("../models/Comment");

// Get All Blog
const getAllBlogs = async (req, res) => {
  try {
    const Blogs = await Blog.find()
      .populate("postedBy", "-password")
      .populate({
        path: "comments",
        populate: { path: "postedBy" },
      });
    return res
      .status(200)
      .json({ Blogs, success: true, message: "Fetched Successfully" });
  } catch (error) {
    console.log(`${error.message}`);
  }
};

// Get Blog of Particular user
const getBlogsOfUser = async (req, res) => {
  try {
    const Blogs = await Blog.find({ updatedBy: req.user._id })
      .populate("postedBy", "email name")
      .populate({
        path: "comments",
        populate: { path: "postedBy" },
      });
    return res
      .status(200)
      .json({ Blogs, status: "ok", message: "Fetched Successfully" });
  } catch (error) {
    console.log(`${error.message}`);
  }
};

// Add Blog
const addBlog = async (req, res) => {
  const { title, content, imageUrl } = req.body;
  if (title != "" || content != "" || imageUrl != "") {
    try {
      req.user.readingList = undefined;
      const data = { title, content, imageUrl, postedBy: req.user };
      const blog = Blog(data);
      const response = await blog.save();
      blog.postedBy.password = undefined;
      if (response)
        return res.status(200).json({
          blog: response,
          success: true,
          message: "Blog added successfully",
        });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    return res
      .status(422)
      .json({ success: false, error: "All fields are required" });
  }
};

// update Blog
const updateBlog = async (req, res) => {
  // console.log(req.body);
  const { id } = req.params;
  // console.log(id);
};

// like blog
const likeBlog = async (req, res) => {
  const id = req.body.blogId;
  try {
    const likedBlog = await Blog.findOne({ _id: id })
      .populate("postedBy")
      // .populate("comments")
      .populate({
        path: "comments",
        populate: {
          path: "postedBy",
        },
      });
    // likedBlog
    likedBlog.like.push(req.user._id);
    const res1 = await likedBlog.save();

    if (res1) {
      return res.status(200).json({ success: true, blog: likedBlog });
    }
  } catch (error) {
    console.log(error.message);
  }
  // console.log(likedBlog);
};

// unlike blog
const unlikeBlog = async (req, res) => {
  const id = req.body.blogId;
  try {
    const likedBlog = await Blog.findOne({ _id: id })
      .populate("postedBy")
      .populate({
        path: "comments",
        populate: { path: "postedBy" },
      });
    likedBlog.like = likedBlog.like.filter(
      (item) => String(item) != String(req.user._id)
    );
    const res1 = await likedBlog.save();
    if (res1) {
      return res.status(200).json({ success: true, blog: likedBlog });
    }
  } catch (error) {
    console.log(error.message);
  }
  // console.log(likedBlog);
};

// delete Blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.deleteOne({ _id: id });
    // console.log(blog);
    if (blog) {
      return res.json({ success: true, message: "Blog Deleted Successfully" });
    }
    // console.log(blog);
  } catch (error) {
    console.log(error.message);
  }
};

const addBookmark = async (req, res) => {
  const id = req.body.blogId;
  try {
    const bookmark = await Blog.findOne({ _id: id })
      .populate("postedBy")
      .populate({
        path: "comments",
        populate: {
          path: "postedBy",
        },
      });
    bookmark.bookmarks.push(req.user._id);
    const user1 = await User.findOne({ _id: req.user._id });
    user1.readingList.push(id);

    const res1 = await bookmark.save();
    const res2 = await user1.save();
    const user = await User.findOne({ _id: req.user._id });

    if (res1 && res2) {
      return res.status(200).json({ success: true, blog: bookmark, user });
    }
  } catch (error) {
    console.log(error.message);
  }
  // console.log(likedBlog);
};

const deleteBookmark = async (req, res) => {
  const id = req.body.blogId;
  try {
    const bookmark = await Blog.findOne({ _id: id })
      .populate("postedBy")
      .populate({
        path: "comments",
        populate: {
          path: "postedBy",
        },
      });
    bookmark.bookmarks.push(req.user._id);
    bookmark = bookmark.bookmarks.filter((b) => req.user._id != b._id);
    console.log(bookmark);
    const user1 = await User.findOne({ _id: req.user._id });
    user1 = user1.readingList.filter((bok) => id != bok._id);

    const res1 = await bookmark.save();
    const res2 = await user1.save();
    const user = await User.findOne({ _id: req.user._id });

    if (res1 && res2) {
      return res.status(200).json({ success: true, blog: bookmark, user });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const addComment = async (req, res) => {
  const { content, blogId } = req.body;
  const userId = req.user._id;
  try {
    const userData = await User.find({ _id: userId });

    const data = { blogId: blogId, postedBy: userId, content: content };
    const blog = await Blog.findOne({ _id: blogId });
    const response = await Comment(data);

    const data1 = await response.save();

    blog.comments.push(data1._id);
    const x = await blog.save();
    const blog1 = await Blog.findOne({ _id: blogId })
      .populate({
        path: "comments",
        populate: {
          path: "postedBy",
        },
      })
      .populate("postedBy");
    // console.log(blog1);
    if (x) {
      return res.status(200).json({ success: true, blog1 });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deleteComment = async (req, res) => {
  const { blogId, commentId } = req.params;
  try {
    const resp = await Comment.findByIdAndDelete({ _id: commentId });
    const blog = await Blog.find({ blogId: blogId });
    const data = blog?.comments?.filter(
      (item) => String(item._id) != String(commentId)
    );
    // console.log(data);

    if (resp) {
      return res.status(200).json({ success: true, blog });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllBlogs,
  getBlogsOfUser,
  addBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  unlikeBlog,
  addBookmark,
  addComment,
  deleteComment,
  deleteBookmark,
};
