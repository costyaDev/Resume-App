const express = require("express");
const router = express.Router();

// @route GET api/profile
// @dsec Test route
// @accsess Public
router.get("/", (req, res) => {
  res.send("Profile router");
});

module.exports = router;
