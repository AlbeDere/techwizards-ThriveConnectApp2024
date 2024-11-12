import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../redux/api/authSlice";
import { feedbackSlice } from "../redux/api/feedbackSlice";
import { jobSeekerApi } from "./api/jobseekerSlice";
import { companyApi } from "./api/companySlice";
import { fetchUserSlice } from "./api/fetchUserSlice";

export const store = configureStore({
  reducer: {
    [feedbackSlice.reducerPath]: feedbackSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [jobSeekerApi.reducerPath]: jobSeekerApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [fetchUserSlice.reducerPath]: fetchUserSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      feedbackSlice.middleware,
      authApi.middleware,
      jobSeekerApi.middleware,
      companyApi.middleware,
      fetchUserSlice.middleware
    ),
});

// Export types for usage with hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
