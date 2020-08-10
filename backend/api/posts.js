const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../middleware/auth");
const Post = require("../models/Posts");
const Profile = require("../models/Profile");
const User = require("../models/User");

// @route Post api/posts
// @dsec create a post
// @accsess Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-passwword");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route Get api/posts
// @desc get all posts
// @acsess private

router.get("/", auth, async (req, res) => {
  try {
    const post = await Post.find().sort({
      date: -1,
    });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route Get api/posts/:id
// @desc get post by id
// @acsess private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json("post not found");

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (!err.kind === "ObjectId") return res.status(404).json("post not found");
    res.status(500).send("Server error");
  }
});

// @route Delete api/posts/:id
// @desc delte post by id
// @acsess private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json("post not found");

    //check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not autorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (!err.kind === "ObjectId") return res.status(404).json("post not found");
  }
  res.status(500).send("Server error");
});

module.exports = router;
