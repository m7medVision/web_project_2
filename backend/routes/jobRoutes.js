import express from "express";
import { getAllJobs, createJob } from "../controllers/jobController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllJobs);
router.post("/", authenticateUser, createJob);

export { router as jobRoutes };
