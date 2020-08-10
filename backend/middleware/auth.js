const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  // get token from header

  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({
      msg: "no token , auth denied",
    });
  }

  // verifay toke
  try {
    const decoder = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoder.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "token not valid" });
  }
};
