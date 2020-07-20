const express = require("express");
const router = express.Router();

// @route GET api/users
// @dsec Test route
// @accsess Public
router.get("/", (req, res) => {
  res.send("Users router");
});

module.exports = router;
