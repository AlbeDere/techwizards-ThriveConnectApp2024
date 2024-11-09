import { Router } from "express";
import {
  createJobSeekerController,
  getAllJobSeekersController,
  getJobSeekerByIdController,
  updateJobSeekerByIdController,
  deleteJobSeekerByIdController,
} from "../controllers/jobSeekerControllers";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

// Public routes
router.post("/", createJobSeekerController);
router.get("/", getAllJobSeekersController);

// Protected routes
router.get("/:id", authenticateToken, getJobSeekerByIdController);
router.patch("/:id", authenticateToken, updateJobSeekerByIdController);
router.delete("/:id", authenticateToken, deleteJobSeekerByIdController);

export default router;
