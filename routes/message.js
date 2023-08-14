const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
 


// Create a new message
router.post("/", async (req, res) => {
  try {

    const {conversationId, senderId, content } = req.body;
   
    const message = new Message({ conversation: conversationId , sender: senderId, content });
    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().populate("sender");
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a specific message by ID
router.get("/:id", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).populate("sender");
    if (!message) {
      res.status(404).json({ message: "Message not found" });
    } else {
      res.status(200).json(message);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update a message by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content },
      { new: true }
    );
    if (!updatedMessage) {
      res.status(404).json({ message: "Message not found" });
    } else {
      res.status(200).json(updatedMessage);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a message by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    if (!deletedMessage) {
      res.status(404).json({ message: "Message not found" });
    } else {
      res.status(200).json({ message: "Message deleted" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
