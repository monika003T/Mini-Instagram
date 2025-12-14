const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const User = require("../models/User");
const Follow = require("../models/Follow");
const Post = require("../models/Post");

//follow user
router.post("/:id/follow", authMiddleware, async (req, res) => {
  try {
    if (req.user === req.params.id) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }
    await Follow.create({
      follower: req.user,
      following: req.params.id
    });
    res.json({ message: "User followed successfully" });
  } catch (error) {
    res.status(400).json({ message: "Already following or error occurred" });
  }
});

//unfollow user
router.post("/:id/unfollow", authMiddleware, async (req, res) => {
  try {
    await Follow.findOneAndDelete({
      follower: req.user,
      following: req.params.id
    });
    res.json({ message: "User unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to unfollow user" });
  }
});

//user profile
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("username email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const followersCount = await Follow.countDocuments({ following: req.params.id });
    const followingCount = await Follow.countDocuments({ follower: req.params.id });
    const postsCount = await Post.countDocuments({ user: req.params.id });
    res.json({
      user,
      followersCount,
      followingCount,
      postsCount
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

module.exports = router;
