import { IFeedback } from '@/misc/feedbacks';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const feedbackSlice = createApi({
  reducerPath: 'feedbackSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllFeedbacksForCompany: builder.query<IFeedback[], string>({
      query: (companyId) => `/feedback/${companyId}`,
    }),
  }),
});

export const { useGetAllFeedbacksForCompanyQuery } = feedbackSlice;
