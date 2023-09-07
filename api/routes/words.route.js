import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { createWords } from "../controllers/words.controller.js";

const router = express.Router();

router.post("/", verifyToken, createWords);

console.log("test");
// router.delete("/:id", verifyToken, deleteSentence);
// router.get("/single/:id", getSentence);
// router.get("/", getSentences);

export default router;
