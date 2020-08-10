const express = require("express");
const connectDB = require("./config/db");

const users = require("./api/users");
const profile = require("./api/profile");
const posts = require("./api/posts");
const auth = require("./api/auth");

const app = express();

// connect Databaase

connectDB();

//Init Middleware
app.use(
  express.json({
    extended: false,
  })
);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("api running");
});

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/auth", auth);
app.use("/api/posts", posts);

app.listen(PORT, () => {
  console.log(`server start on port ${PORT}`);
});
