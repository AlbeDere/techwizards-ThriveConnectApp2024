import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fetchUserSlice = createApi({
  reducerPath: "fetchUserSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      console.log("PrepareHeaders is called");
      const token = (getState() as { auth: { token: string } }).auth.token;

      console.log("Token in prepareHeaders:", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        console.warn("No token found in state");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchCompanyUser: builder.query({
      query: () => "/companies",
    }),
    fetchJobseekerUser: builder.query({
      query: () => "/jobseekers",
    }),
  }),
});

export const { useFetchCompanyUserQuery, useFetchJobseekerUserQuery } =
  fetchUserSlice;
