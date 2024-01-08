import express from "express";
// import { verifyToken } from "../middleware/jwt.js";
import { createWord, getWords } from "../controllers/word.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// router.post("/", verifyToken, createWord);

// console.log("test");
router.get("/get", verifyToken, getWords);
router.post("/", verifyToken, createWord);

// router.delete("/:id", verifyToken, deleteSentence);
// router.get("/single/:id", getSentence);
// router.get("/", getSentences);

export default router;
