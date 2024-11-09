import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFeedback, FeedbackResponse } from "../../misc/feedbacks";
import { baseUrl } from "../axiosConfig";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    // Define mutation to create feedback
    createFeedback: builder.mutation<FeedbackResponse, IFeedback>({
      query: ({ companyId, feedbackText, sentimentScore }) => ({
        url: `/feedback/${companyId}`,
        method: "POST",
        body: { feedbackText, sentimentScore },
      }),
    }),

    // Query to get all feedback for a specific company
    getAllFeedbacksForCompany: builder.query<FeedbackResponse[], string>({
      query: (companyId) => ({
        url: `/feedback/${companyId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateFeedbackMutation } = feedbackApi;
