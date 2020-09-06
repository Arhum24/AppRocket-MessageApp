const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    required: "Chatroom ID is required!",
    ref: "chat",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: "User ID is required!",
    ref: "user",
  },
  message: {
    type: String,
    required: "Message is required!",
  }
});

module.exports = mongoose.model("message", MessageSchema);