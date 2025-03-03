import Message from "../models/Message.js";
import User from "../models/User.js";

export const sendMessage = async (req, res) => {
  try {
    const { userId, content } = req.body;

    if (!userId || !content) {
      return res.status(400).json({ success: false, error: "User ID and message content are required" });
    }

    // 🛠️ ✅ Find User by uniqueLink instead of ObjectId
    const user = await User.findOne({ uniqueLink: userId });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // ✅ Save Message with Correct User `_id`
    const newMessage = new Message({
      user: user._id, // Corrected User ID
      content,
    });

    await newMessage.save();

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getMessages = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const messages = await Message.find({ user: userId }).populate("user", "name");
      res.json({ success: true, messages });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
