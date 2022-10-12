const mongoose = require("mongoose");

const likesSchema = mongoose.Schema({
        postId: { // 포스트 아이디
            type: String,
        },

        userId: {
            type: String,
        },
 
    });

module.exports = mongoose.model("Likes", likesSchema);