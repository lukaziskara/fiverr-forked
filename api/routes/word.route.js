import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { createWord } from "../controllers/word.controller.js";

const router = express.Router();

router.post("/", verifyToken, createWord);

console.log("test");
// router.delete("/:id", verifyToken, deleteSentence);
// router.get("/single/:id", getSentence);
// router.get("/", getSentences);

export default router;
