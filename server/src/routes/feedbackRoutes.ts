import { Router } from "express";
import {
  submitFeedback,
  getFeedbacks,
} from "../controllers/feedbackController";

const router = Router();

// POST /feedback/:companyId - Add feedback to a specific company
router.post("/:companyId", submitFeedback);
// GET /feedback/:companyId - Get all feedback for a specific company
router.get("/:companyId", getFeedbacks);

export default router;
