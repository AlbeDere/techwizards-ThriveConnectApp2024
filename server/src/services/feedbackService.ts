import { FeedbackModel } from "../models/feedbackModel";
import { CompanyModel } from "../models/companyModel";
import { IFeedback } from "../interfaces/IFeedback";
import { NotFoundError, InternalServerError } from "../errors/ApiError";

// Service to add feedback for a company
export const addFeedback = async (
  companyId: string,
  feedbackData: Partial<IFeedback>
): Promise<IFeedback> => {
  try {
    const company = await CompanyModel.findById(companyId);
    if (!company) {
      throw new NotFoundError("Company not found");
    }

    // Create feedback
    const feedback = new FeedbackModel({
      companyId,
      feedbackText: feedbackData.feedbackText,
      sentimentScore: feedbackData.sentimentScore,
    });
    await feedback.save();

    // Update company's feedback list
    company.feedback.push(feedback._id);
    await company.save();

    return feedback;
  } catch (error) {
    throw new InternalServerError("Failed to add feedback");
  }
};

// Service to get all feedback for a specific company
export const getAllFeedbacksForCompany = async (
  companyId: string
): Promise<IFeedback[]> => {
  try {
    // Check if the company exists
    const company = await CompanyModel.findById(companyId);
    if (!company) {
      throw new NotFoundError("Company not found");
    }

    // Find all feedback entries associated with the companyId
    const feedbacks = await FeedbackModel.find({ companyId });
    return feedbacks;
  } catch (error) {
    throw new InternalServerError("Failed to retrieve feedbacks");
  }
};
