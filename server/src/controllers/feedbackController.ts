import { Request, Response, NextFunction } from "express";
import { addFeedback, getAllFeedbacksForCompany  } from "../services/feedbackService";

// Controller to handle feedback submission
export const submitFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { companyId } = req.params;
    const { feedbackText, sentimentScore } = req.body;

    if (!feedbackText || sentimentScore === undefined) {
      return res.status(400).json({ error: "Feedback text and sentiment score are required" });
    }

    const feedback = await addFeedback(companyId, { feedbackText, sentimentScore });
    return res.status(201).json(feedback);
  } catch (error) {
    next(error);
  }
};

// Controller to handle retrieving all feedback for a specific company
export const getFeedbacks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { companyId } = req.params;

    // Call the service to get all feedback for the company
    const feedbacks = await getAllFeedbacksForCompany(companyId);

    return res.status(200).json(feedbacks);
  } catch (error) {
    next(error);
  }
};
