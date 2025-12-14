const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//app routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const feedRoutes = require("./routes/feed.routes");

//register routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/feed", feedRoutes);

//export
module.exports = app;
