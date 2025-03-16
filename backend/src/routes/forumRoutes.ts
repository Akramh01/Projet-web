import express from "express";
import {
  createDiscussion,
  getDiscussions,
  updateDiscussion,
  deleteDiscussion,
  createMessage,
  getMessages,
  deleteMessage,
} from "../controllers/forumController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/discussions", authenticateUser, createDiscussion);
router.get("/discussions", getDiscussions);
router.put("/discussions/:id", authenticateUser, updateDiscussion);
router.delete("/discussions/:id", authenticateUser, deleteDiscussion);

router.post("/discussions/:id/messages", authenticateUser, createMessage);
router.get("/discussions/:id/messages", getMessages);
router.delete("/messages/:id", authenticateUser, deleteMessage);

export default router;
