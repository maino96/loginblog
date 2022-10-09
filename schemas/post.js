const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
        user: {
            type: String,
            required: true,
            unique: true
        },
        title: {
            type: String,
        },
        content: {
            type: String,
        },
        password: {
            type: Number && String,
            required: true
        },
        createAt: {
            type: Date,
        },
 
    });

module.exports = mongoose.model("Posts", postsSchema);