import express from "express";
import {
  createSentence,
  deleteSentence,
  getSentence,
  getSentences,
} from "../controllers/sentence.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createSentence);
router.delete("/:id", verifyToken, deleteSentence);
router.get("/single/:id", getSentence);
router.get("/", getSentences);

export default router;
