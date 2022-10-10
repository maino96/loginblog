const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
        postId: { // 포스트 아이디
            type: Number,
            required: true,
            unique: true,
        },

        nickname: { // 작성자명
            type: String,
  
        },

        title: { // 게시글 제목
            type: String,
            required: true,
        },

        content: { // 작성글
            type: String,
        },
        
        createdAt: { // 작성일자
            type: Date,
        },
        likes: {
            type: Number,
        },
 
    });

module.exports = mongoose.model("Posts", postsSchema);