import { createSlice } from "@reduxjs/toolkit";

export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: JSON.parse(localStorage.getItem("blogs")) || [],
    currentBlog: JSON.parse(localStorage.getItem("currentBlog")) || {},
    userBlog: JSON.parse(localStorage.getItem("userBlogs")) || {},
  },

  reducers: {
    getBlog: (state, action) => {
      localStorage.setItem("blogs", JSON.stringify(action.payload));
      state.blogs = action.payload;
    },

    addBlog: (state, action) => {
      state.blogs.push(action.payload);
    },

    addComment: (state, action) => {
      localStorage.setItem("currentBlog", JSON.stringify(action.payload));
      state.currentBlog = action.payload;
    },
    addBookmark: (state, action) => {
      localStorage.setItem("currentBlog", JSON.stringify(action.payload));
      state.currentBlog = action.payload;
    },
    addLike: (state, action) => {
      localStorage.setItem("currentBlog", JSON.stringify(action.payload));
      state.currentBlog = action.payload;
    },
    addUnlike: (state, action) => {
      localStorage.setItem("currentBlog", JSON.stringify(action.payload));
      state.currentBlog = action.payload;
    },
    deleteCommentRed: (state, action) => {
      localStorage.setItem("currentBlog", JSON.stringify(action.payload));
      state.currentBlog = action.payload;
    },

    currentBlog: (state, action) => {
      localStorage.setItem("currentBlog", JSON.stringify(action.payload));
      state.currentBlog = action.payload;
    },
    updateBlog: () => {},
  },
});

export const {
  getBlog,
  updateBlog,
  addComment,
  addBookmark,
  addBlog,
  currentBlog,
  deleteCommentRed,
  addLike,
  addUnlike,
} = blogSlice.actions;

export default blogSlice.reducer;
