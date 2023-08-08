import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./features/blog/blogSlice";
import authReducer from "./features/Auth/authSlice";

export default configureStore({
  reducer: {
    blog: blogReducer,
    auth: authReducer,
  },
});
