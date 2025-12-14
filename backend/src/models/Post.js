const mongoose = require("mongoose");

//create ost schema
const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

// create, export model
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
