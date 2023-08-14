const Message = require("../models/Message"); // Importez votre modèle de message

const saveMessage = async (senderId, conversationId, content) => {
  try {
    // Créez une nouvelle instance du modèle de message avec les données du message
    const newMessage = new Message({
      sender: senderId,
      conversation: conversationId,
      content: content,
    });

    // Enregistrez le nouveau message dans la base de données
    const savedMessage = await newMessage.save();

    console.log("Message saved:", savedMessage);
    return savedMessage;
  } catch (error) {
    console.error("Error saving message:", error);
    throw error;
  }
};
