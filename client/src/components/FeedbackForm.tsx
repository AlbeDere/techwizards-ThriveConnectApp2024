// components/FeedbackForm.tsx
import React, { useState } from "react";
import { useCreateFeedbackMutation } from "../redux/api/feedbackSlice";

interface FeedbackFormProps {
  companyId: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ companyId }) => {
  const [feedbackText, setFeedbackText] = useState("");
  const [sentimentScore, setSentimentScore] = useState(1);

  const [createFeedback, { isLoading, isSuccess, isError }] =
    useCreateFeedbackMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createFeedback({ companyId, feedbackText, sentimentScore });
      if (isSuccess) {
        alert("Feedback submitted successfully!");
        setFeedbackText("");
        setSentimentScore(5);
      }
    } catch (error) {
      alert("Error submitting feedback" + error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Feedback Text:</label>
        <textarea
          title="Feedback Text"
          placeholder="Enter your feedback here"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Sentiment Score (1 to 5):</label>
        <input
          type="number"
          min={1}
          max={5}
          value={sentimentScore}
          onChange={(e) => setSentimentScore(Number(e.target.value))}
          required
          title="Sentiment Score"
          placeholder="Enter a score from 1 to 5"
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit Feedback"}
      </button>
      {isError && <p>Error submitting feedback.</p>}
    </form>
  );
};

export default FeedbackForm;