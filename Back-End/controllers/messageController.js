import Message from "../models/Message.js";
import User from "../models/User.js";

export const sendMessage = async (req, res) => {
  try {
    const { userId, content } = req.body;

    if (!userId || !content) {
      return res.status(400).json({ success: false, error: "User ID and message content are required" });
    }

    // Use the authenticated user from middleware if available, otherwise find by uniqueLink
    const user = req.user || await User.findOne({ uniqueLink: userId });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Create new message - content will be automatically encrypted by the model
    const newMessage = new Message({
      user: user._id,
      content, // Will be encrypted by the model's setter
    });

    await newMessage.save();

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    // Use the authenticated user from middleware if available
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ success: false, error: "Authentication required" });
    }

    // Find messages for this user - they will be automatically decrypted by the model's toJSON
    const messages = await Message.find({ user: user._id }).populate("user", "name");
    
    res.json({ 
      success: true, 
      messages,
      user: {
        name: user.name,
        uniqueLink: user.uniqueLink
      }
    });
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
  
