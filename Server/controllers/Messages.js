
const mongoose = require("mongoose");
const Message = mongoose.model("Message");
const User = mongoose.model("User");


exports.getAllMessages = async (req, res) => {
    const chatID = req.params.id;
    const messages = await Message.find({chat:chatID});
    res.json(messages);
};
