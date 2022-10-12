const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
        userId: {
            type: String,
            unique: true,
        },

        nickname: { // 작성자명
            type: String,
            required: true,
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
        totallike: { // 토탈라이크
            type: Number,
        },
 
    });

module.exports = mongoose.model("Posts", postsSchema);