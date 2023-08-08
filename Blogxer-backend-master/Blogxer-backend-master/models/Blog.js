const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: String,
    // tags: [String],
    imageUrl: String,
    content: String,
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    like: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    bookmarks: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: new Date() },
  },
  { timeStamps: true }
);

module.exports = new mongoose.model("Blog", blogSchema);
