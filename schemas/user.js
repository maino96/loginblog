const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  nickname: {
    type: String,
    required: true,
  },

  password: { 
    type: String,
    required: true,
  },

  confirm: { 
    type: String,
    required: true,
  },





});
UserSchema.virtual("userId").get(function () {
  return this._id.toHexString();
});
UserSchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("User", UserSchema);