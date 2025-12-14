const express = require("express");
const router = express.Router();

//import auth
const authMiddleware = require("../middleware/auth.middleware");

//import models
const Post = require("../models/Post");
const Like = require("../models/Like");
const Comment = require("../models/Comment");

//create post
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { imageUrl, caption } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL is required" });
    }
    const post = new Post({
      user: req.user,
      imageUrl,
      caption
    });
    await post.save();
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Failed to create post" });
  }
});

//like post
router.post("/:id/like", authMiddleware, async (req, res) => {
  try {
    await Like.create({
      user: req.user,
      post: req.params.id
    });
    res.json({ message: "Post liked" });
  } catch (error) {
    res.status(400).json({ message: "Already liked or error occurred" });
  }
});

//unlike post
router.post("/:id/unlike", authMiddleware, async (req, res) => {
  try {
    await Like.findOneAndDelete({
      user: req.user,
      post: req.params.id
    });
    res.json({ message: "Post unliked" });
  } catch (error) {
    res.status(500).json({ message: "Failed to unlike post" });
  }
});

//add comment
router.post("/:id/comments", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }
    const comment = new Comment({
      user: req.user,
      post: req.params.id,
      text
    });
    await comment.save();
    res.status(201).json({ message: "Comment added", comment });
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment" });
  }
});
router.get("/:id/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.id })
      .populate("user", "username")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments" });
  }
});
module.exports = router;
