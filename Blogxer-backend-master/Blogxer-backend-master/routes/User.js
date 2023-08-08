const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  login,
  register,
  updateUser,
  getUserProfile,
  getUserReadingList,
} = require("../controllers/UserController");
const verifyToken = require("../middlewares/verifyToken");
const User = require("./../models/User");

router.post("/login", login);
router.post("/register", register);
router.patch("/updateUser", verifyToken, updateUser);
router.get("/getUserProfile/:id", verifyToken, getUserProfile);
router.get("/getUserReadingList/:id", verifyToken, getUserReadingList);

module.exports = router;
