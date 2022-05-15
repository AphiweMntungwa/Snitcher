const Message = require("../models/messages")

module.exports.getMessage = async(req, res) => {
    const { sender, receiver } = req.params;
    const messages = await Message.find({ members: { $in: [sender, receiver] } });
    res.send({ messages });
}

module.exports.writeMessage = async(req, res) => {
    const { sender, receiver } = req.params;
    const { text } = req.body;
    if (!text) {
        return res.status(400).send('no message found');
    }
    const newMessage = new Message({ message: { text, sender }, members: [sender, receiver] });
    await newMessage.save().then(
        res.send(newMessage)
    )
}