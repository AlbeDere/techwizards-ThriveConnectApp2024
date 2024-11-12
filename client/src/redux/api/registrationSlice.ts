import { AuthRoles } from "@/misc/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RegistrationResponse {
  token: string;
}

interface RegistrationRequest {
  email: string;
  password: string;
  role: AuthRoles;
}

export const registerApi = createApi({
  reducerPath: "registrationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/companies`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<RegistrationResponse, RegistrationRequest>({
      query: (credentials) => ({
        url: "/registration",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerApi;
