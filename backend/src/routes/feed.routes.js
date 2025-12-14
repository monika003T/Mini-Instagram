const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const Follow = require("../models/Follow");
const Post = require("../models/Post");
const Like = require("../models/Like");
const Comment = require("../models/Comment");

//create feed route
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user;
    const following = await Follow.find({ follower: userId }).select("following");
    const followingIds = following.map(f => f.following);
    const posts = await Post.find({ user: { $in: followingIds } })
      .populate("user", "username")
      .sort({ createdAt: -1 });
    const feed = await Promise.all(
      posts.map(async (post) => {
        const likeCount = await Like.countDocuments({ post: post._id });
        const commentCount = await Comment.countDocuments({ post: post._id });

        return {
          ...post.toObject(),
          likeCount,
          commentCount
        };
      })
    );
    res.json(feed);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch feed" });
  }
});

module.exports = router;
