const express = require("express");
const router = express.Router();
const postsRouter = require("./posts");
const commentsRouter = require("./comments");
const usersRouter = require("./users");
const likesRouter = require("./likes");




router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);
router.use("/users", usersRouter);
router.use(likesRouter);


module.exports = router;