import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to get messages for a specific user - protected by authentication
router.get("/:userId", verifyUser, getMessages);

// Route to send a new secret message
router.post("/send", sendMessage);

export default router;
