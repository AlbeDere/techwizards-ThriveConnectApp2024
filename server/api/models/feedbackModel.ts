import mongoose, { Schema } from "mongoose";
import { IFeedback } from "../interfaces/IFeedback";

const feedbackSchema = new Schema<IFeedback>({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  feedbackText: {
    type: String,
    required: true,
  },
  sentimentScore: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

export const FeedbackModel = mongoose.model<IFeedback>(
  "Feedback",
  feedbackSchema
);
