import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<GetUsersApiResponse, GetUsersApiArg>({
      query: () => ({ url: `/users` }),
    }),
    postUsers: build.mutation<PostUsersApiResponse, PostUsersApiArg>({
      query: (queryArg) => ({
        url: `/users`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type GetUsersApiResponse = /** status 200 OK */ User[][];
export type GetUsersApiArg = void;
export type PostUsersApiResponse = /** status 200 OK */ User[];
export type PostUsersApiArg = {
  body: UserInput[];
};
export type User = {
  id?: string;
  username?: string;
  email?: string;
  date_of_birth?: string;
  profilePicture?: string;
  role?: string;
  status?: string;
  createdAt?: string;
  lastLoginAt?: string;
};
export type UserInput = {
  username?: string;
  email?: string;
  date_of_birth?: string;
  profilePicture?: string;
  role?: string;
  status?: string;
  createdAt?: string;
  lastLoginAt?: string;
};
export const { useGetUsersQuery, usePostUsersMutation } = injectedRtkApi;
