const express = require("express");
const router = express.Router();

// @route GET api/posts
// @dsec Test route
// @accsess Public
router.get("/", (req, res) => {
  res.send("Posts router");
});

module.exports = router;
