export interface IFeedback {
  companyId: string; // Company ID the feedback is associated with
  feedbackText: string; // Feedback content
  sentimentScore: number; // Sentiment score, ranging from 1 to 5
}

export interface FeedbackResponse {
  companyId: string;
  feedbackText: string;
  sentimentScore: number;
  _id: string;
}
