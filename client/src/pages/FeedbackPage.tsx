import { useGetAllFeedbacksForCompanyQuery } from '@/redux/api/feedbackSlice';
import React from 'react';
import { useParams } from 'react-router-dom';

const FeedbackPage = () => {
  const { id } = useParams<{ id: string }>();  // Extract companyId from the URL
  const { data, error, isLoading } = useGetAllFeedbacksForCompanyQuery(id!);

  // Handle loading state
  if (isLoading) return <p>Loading feedbacks...</p>;

  // Handle error state
  if (error) return <p>Error: {error.message}</p>;

  // Handle case when no feedbacks are found
  if (!data || data.length === 0) return <p>No feedbacks found.</p>;

  return (
    <div>
      <h1>Feedbacks for Company {id}</h1>
      <ul>
        {data.map((feedback) => (
          <li key={feedback.id}>
            <p><strong>Sentiment:</strong> {feedback.sentimentScore}</p>
            <p><strong>Feedback:</strong> {feedback.feedbackText}</p>
            <p><strong>Author:</strong> {feedback.author}</p>
            {/* You can also add other fields here based on your feedback response model */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackPage;
