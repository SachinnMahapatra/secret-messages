import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

// Route to get messages for a specific user
router.get("/:userId", getMessages);

// Route to send a new secret message
router.post("/send", sendMessage);

export default router;
