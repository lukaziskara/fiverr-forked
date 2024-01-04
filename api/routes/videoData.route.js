import express from "express";
import {
  createVideoData,
  deleteVideoData,
  getVideoData,
  getVideoDatas
} from "../controllers/videoData.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createVideoData);
router.delete("/:id", verifyToken, deleteVideoData);
router.get("/single/:id", getVideoData);
router.get("/", getVideoDatas);

export default router;
