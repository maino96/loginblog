const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  postId: {
    type: Number,
  },
  commentsId: {
    type: Number,
    unique: true,
  },

  userId: {
    type: String,
},
  nickname: { // 작성자명
    type: String,

},
  password: {
    type: Number,

  },
  content: {
    type: String,
  },
  createAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Comments", commentSchema);
