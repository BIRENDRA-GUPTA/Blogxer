const User = require("../models/User");
const Blog = require("../models/Blog");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(422)
      .json({ status: "error", error: "Email and password are required" });
  try {
    const user = await User.findOne({ email });
    // .populate({
    // path: "readingList",
    // populate: {
    //   path: "postedBy",
    // },
    // });
    // .populate({
    //   path: "readingList",
    //   populate: {
    //     path: "comments",
    //     populate: {
    //       path: "postedBy",
    //     },
    //   },
    // });
    if (!user)
      return res.json({ status: "error", error: "Invalid Credentials" });
    const pass = await bcrypt.compare(password, user.password);

    if (pass) {
      const token = jsonwebtoken.sign({ _id: user._id }, JWT_SECRET);
      user.password = undefined;
      return res.json({
        success: true,
        token,
        user,
        message: "Logged in Successfully",
      });
    } else {
      res.json({ status: "error", error: "invalid credentials" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const register = async (req, res, next) => {
  // console.log("register");
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(422)
      .json({ status: "error", error: "All field are required" });
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(422)
        .json({ status: "error", error: "user already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });

      const token = jsonwebtoken.sign({ _id: user._id }, JWT_SECRET);

      const data = await user.save();
      data.password = undefined;
      if (data) {
        res.json({
          success: true,
          message: "Registered Successfully",
          token,
          user: data,
        });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

const updateUser = async (req, res, next) => {
  // console.log(req.body);
  const {
    profilePic,
    github,
    instagram,
    name,
    linkedin,
    twitter,

    about,
    role,
    facebook,
  } = req.body;
  try {
    const user = await User.findOne(req.user._id);
    user.about = about;
    user.profilePic = profilePic;
    user.name = name;
    user.role = role;
    user.social.github = github;
    user.social.instagram = instagram;
    user.social.twitter = twitter;
    user.social.linkedin = linkedin;

    user.social.facebook = facebook;

    const response = await user.save();
    // console.log(response);
    user.password = undefined;
    if (response)
      return res.status(200).json({
        user: response,
        success: true,
        message: "profile updated successfully",
      });
  } catch (error) {
    console.log(error);
  }
};

const getUserProfile = async (req, res) => {
  const { id } = req.params;
  // console.log(req.params);

  const user = await User.findOne({ _id: id }).populate({
    path: "readingList", // populate blogs
    populate: {
      path: "postedBy", // in blogs, populate comments
    },
  });

  user.password = undefined;

  const blogs = await Blog.find({ postedBy: id })
    .populate("postedBy")
    .populate({
      path: "comments",
      populate: { path: "postedBy" },
    });
  // console.log(blogs);

  user.readingList = undefined;
  // console.log(user);
  return res.status(200).json({ success: true, user, blogs });
};

const getUserReadingList = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);

  const user = await User.findOne({ _id: id }).populate({
    path: "readingList", // populate blogs
    populate: {
      path: "postedBy", // in blogs, populate comments
    },
  });

  user.password = undefined;
  const blogs = user.readingList;
  return res.status(200).json({ success: true, blogs });
};

module.exports = {
  login,
  register,
  updateUser,
  getUserProfile,
  getUserReadingList,
};
