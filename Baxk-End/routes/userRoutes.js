import express from "express";
import { createUser, getMessages } from "../controllers/userController.js";

const router = express.Router();

router.post("/create", createUser); // Create new user link
router.get("/:userId/messages", getMessages); // Fetch messages for a user

export default router;
