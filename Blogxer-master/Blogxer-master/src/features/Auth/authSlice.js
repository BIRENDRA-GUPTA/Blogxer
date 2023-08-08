import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    readingList: localStorage.getItem("readingList") || [],
    isAuthenticated: localStorage.getItem("token") ? true : false,
  },
  reducers: {
    getUser: (state, action) => {
      state.user = JSON.parse(localStorage.getItem("user")) || "";
      state.token = localStorage.getItem("token") || "";

      state.isAuthenticated = localStorage.getItem("token") ? true : false;
    },
    loginUser: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.token ? true : false;
      state.token = action.payload.token;
    },
    registerUser: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));

      state.user = action.payload.user;

      state.isAuthenticated = action.payload.token ? true : false;
      state.token = action.payload.token;
    },
    updateUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));

      state.user = action.payload;
    },
    addBlogToUser: (state, action) => {
      state.user.readingList.push(action.payload);
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    getUserReadingList: (state, action) => {
      localStorage.setItem("readingList", JSON.stringify(action.payload.blogs));
      state.readingList = action.payload.blogs;
    },

    logout: (state, action) => {
      localStorage.clear();
      state.user = {};
      state.token = "";
      state.isAuthenticated = "";
    },
  },
});

export const {
  getUser,
  loginUser,
  getUserReadingList,
  registerUser,
  logout,
  updateUser,

  addBlogToUser,
} = authSlice.actions;

export default authSlice.reducer;
