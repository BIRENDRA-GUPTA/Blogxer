const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    content: { type:String },
    blogId: { type: mongoose.Types.ObjectId, ref: "Blog" },
    postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: new Date() },
  },
  { timeStamps: true }
);

module.exports = new mongoose.model("Comment", commentSchema);
