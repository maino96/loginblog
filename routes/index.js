const express = require("express");
const router = express.Router();
const postsRouter = require("./posts");
//const commentsRouter = require("./comments");
const usersRouter = require("./users")
// const Likes = require("./likes");




router.use("/posts", postsRouter);
//router.use("/comments", commentsRouter);
router.use("/users", usersRouter)
// router.use("/likes", Likes);


module.exports = router;