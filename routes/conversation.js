const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation");

// Create a new conversation
router.post("/", async (req, res) => {
  try {
    const { members, messages } = req.body;
    const conversation = new Conversation({ members, messages });
    const savedConversation = await conversation.save();
    res.status(201).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all conversations
router.get("/", async (req, res) => {
  try {
    const conversations = await Conversation.find();
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a specific conversation by ID
router.get("/:id", async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    if (!conversation) {
      res.status(404).json({ message: "Conversation not found" });
    } else {
      res.status(200).json(conversation);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update a conversation by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedConversation = await Conversation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedConversation) {
      res.status(404).json({ message: "Conversation not found" });
    } else {
      res.status(200).json(updatedConversation);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a conversation by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedConversation = await Conversation.findByIdAndDelete(
      req.params.id
    );
    if (!deletedConversation) {
      res.status(404).json({ message: "Conversation not found" });
    } else {
      res.status(200).json({ message: "Conversation deleted" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
