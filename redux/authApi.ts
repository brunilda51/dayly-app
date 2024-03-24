import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postAuthLogin: build.mutation<
      PostAuthLoginApiResponse,
      PostAuthLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/login`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postAuthSignup: build.mutation<
      PostAuthSignupApiResponse,
      PostAuthSignupApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/signup`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postAuthForgotPassword: build.mutation<
      PostAuthForgotPasswordApiResponse,
      PostAuthForgotPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postAuthResetPassword: build.mutation<
      PostAuthResetPasswordApiResponse,
      PostAuthResetPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: queryArg.body,
        params: { token: queryArg.token },
      }),
    }),
    postAuthLogout: build.mutation<
      PostAuthLogoutApiResponse,
      PostAuthLogoutApiArg
    >({
      query: () => ({ url: `/auth/logout`, method: "POST" }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type PostAuthLoginApiResponse = /** status 200 OK */ {
  /** JWT token for authentication */
  token?: string;
};
export type PostAuthLoginApiArg = {
  body: {
    username?: string;
    password?: string;
  };
};
export type PostAuthSignupApiResponse = /** status 200 OK */ {
  message?: string;
};
export type PostAuthSignupApiArg = {
  body: {
    username?: string;
    email?: string;
    password?: string;
  };
};
export type PostAuthForgotPasswordApiResponse = /** status 200 OK */ {
  message?: string;
};
export type PostAuthForgotPasswordApiArg = {
  body: {
    email?: string;
  };
};
export type PostAuthResetPasswordApiResponse = /** status 200 OK */ {
  message?: string;
};
export type PostAuthResetPasswordApiArg = {
  /** JWT token received via email */
  token: string;
  body: {
    newPassword?: string;
  };
};
export type PostAuthLogoutApiResponse = /** status 200 OK */ {
  message?: string;
};
export type PostAuthLogoutApiArg = void;
export const {
  usePostAuthLoginMutation,
  usePostAuthSignupMutation,
  usePostAuthForgotPasswordMutation,
  usePostAuthResetPasswordMutation,
  usePostAuthLogoutMutation,
} = injectedRtkApi;
