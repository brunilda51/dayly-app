// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import {
  RootState,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://trust-balancer-1606046615.eu-west-3.elb.amazonaws.com/",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as any;
      const token = state.auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
