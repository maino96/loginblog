const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  _postId: {
    type: String,
    required: true,
  },
  commentsId: {
    type: Number,
    unique: true,
  },

  password: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
  },
  createAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Comments", commentSchema);
