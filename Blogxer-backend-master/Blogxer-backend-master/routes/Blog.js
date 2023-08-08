const express = require("express");
const {
  getAllBlogs,
  addBlog,
  getBlogsOfUser,
  updateBlog,
  deleteBlog,
  likeBlog,
  unlikeBlog,
  addBookmark,
  addComment,
  deleteComment,
} = require("../controllers/BlogController");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

router.get("/getAllBlogs", getAllBlogs);
router.get("/getAllBlogsOfUser", verifyToken, getBlogsOfUser);
router.post("/addBlog", verifyToken, addBlog);
router.put("/updateBlog/:id", verifyToken, updateBlog);
router.delete("/deleteBlog/:id", verifyToken, deleteBlog);
router.post("/likeBlog", verifyToken, likeBlog);
router.post("/unlikeBlog", verifyToken, unlikeBlog);
router.post("/bookmarkBlog", verifyToken, addBookmark);
router.post("/deleteBookmarkBlog", verifyToken, addBookmark);
router.post("/addComment", verifyToken, addComment);
router.delete("/deleteComment/:blogId/:commentId", verifyToken, deleteComment);
router.delete("/trendingBlog", verifyToken, deleteComment);

module.exports = router;
