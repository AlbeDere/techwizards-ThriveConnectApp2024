import { JobSeeker } from "@/misc/jobseekers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobSeekerApi = createApi({
  reducerPath: "jobSeekerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:3003/api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["JobSeeker"],
  endpoints: (builder) => ({
    getAllJobSeekers: builder.query<JobSeeker[], void>({
      query: () => "/jobseekers",
      providesTags: ["JobSeeker"],
    }),
    getJobSeekerById: builder.query<JobSeeker, string>({
      query: (id) => `/jobseekers/${id}`,
      providesTags: (_result, _error, id) => [{ type: "JobSeeker", id }],
    }),
    createJobSeeker: builder.mutation<JobSeeker, Partial<JobSeeker>>({
      query: (newJobSeeker) => ({
        url: "/jobseekers",
        method: "POST",
        body: newJobSeeker,
      }),
      invalidatesTags: ["JobSeeker"],
    }),
    updateJobSeekerById: builder.mutation<
      JobSeeker,
      { id: string; data: Partial<JobSeeker> }
    >({
      query: ({ id, data }) => ({
        url: `/jobseekers/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "JobSeeker", id }],
    }),
    deleteJobSeekerById: builder.mutation<void, string>({
      query: (id) => ({
        url: `/jobseekers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "JobSeeker", id }],
    }),
  }),
});

export const {
  useGetAllJobSeekersQuery,
  useGetJobSeekerByIdQuery,
  useCreateJobSeekerMutation,
  useUpdateJobSeekerByIdMutation,
  useDeleteJobSeekerByIdMutation,
} = jobSeekerApi;
