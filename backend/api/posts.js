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

// @route put api/posts/like/:id
// @desc like a post
// @acsess private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check if the post already liked !!!

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "post already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route put api/posts/unlike/:id
// @desc remove like a post
// @acsess private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check if the post already liked !!!

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "post has not yet been liked" });
    }

    // get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route Post api/posts/comment/:id
// @dsec comment on post
// @accsess Private
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-passwword");

      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route delete api/posts/comment/:id/:comment_id
// @dsec delete comment on post
// @accsess Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // get comment

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // make sure comment exist

    if (!comment) {
      return res.status(404).json({ msg: "comment not exist" });
    }

    // check user

    if (comment.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: "user not autorized" });
    }

    // get remove index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
