const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: { type: String, minLength: 8 },
    profilePic: {
      type: String,
      default:
        "https://www.dc-hauswartungen.ch/wp-content/uploads/2018/01/dummy_profile.png",
    },
    social: {
      linkedin: String,
      github: String,
      instagram: String,
      twitter: String,

      facebook: String,
    },

    role: String,
    about: String,
    followers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    readingList: [{ type: mongoose.Types.ObjectId, ref: "Blog" }],
  },
  { timeStamps: true }
);

module.exports = new mongoose.model("User", UserSchema);
