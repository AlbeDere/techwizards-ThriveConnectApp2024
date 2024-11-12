import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Company } from "@/misc/companies";

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Company"],
  endpoints: (builder) => ({
    getAllCompanies: builder.query<Company[], void>({
      query: () => "/companies",
      providesTags: ["Company"],
    }),
    getCompanyById: builder.query<Company, string>({
      query: (id) => `/companies/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Company", id }],
    }),
    createCompany: builder.mutation<Company, Partial<Company>>({
      query: (newCompany) => ({
        url: "/companies",
        method: "POST",
        body: newCompany,
      }),
      invalidatesTags: ["Company"],
    }),
    updateCompanyById: builder.mutation<
      Company,
      { id: string; data: Partial<Company> }
    >({
      query: ({ id, data }) => ({
        url: `/companies/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Company", id }],
    }),
    deleteCompanyById: builder.mutation<void, string>({
      query: (id) => ({
        url: `/companies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Company", id }],
    }),
  }),
});

export const {
  useGetAllCompaniesQuery,
  useGetCompanyByIdQuery,
  useCreateCompanyMutation,
  useUpdateCompanyByIdMutation,
  useDeleteCompanyByIdMutation,
} = companyApi;
