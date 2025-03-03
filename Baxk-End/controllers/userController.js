import User from "../models/User.js";
import Message from "../models/Message.js";
import { v4 as uuidv4 } from "uuid";  // Import UUID for unique ID generation

export const createUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, error: "Name is required" });
    }

    // Generate a unique ID
    const uniqueId = uuidv4();

    // Save user to database
    const newUser = new User({
      name,
      uniqueLink: uniqueId,  // Store the generated unique link
    });

    await newUser.save();

    res.json({ success: true, user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};


export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    // 🛠 Find User by uniqueLink
    const user = await User.findOne({ uniqueLink: userId });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // 🛠 Fetch messages for this user
    const messages = await Message.find({ user: user._id });

    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

