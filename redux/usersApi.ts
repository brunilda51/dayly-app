import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<GetAllUsersApiResponse, GetAllUsersApiArg>({
      query: () => ({ url: `/users` }),
    }),
    createNewUser: build.mutation<
      CreateNewUserApiResponse,
      CreateNewUserApiArg
    >({
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
export type GetAllUsersApiResponse = /** status 200 OK */ User[][];
export type GetAllUsersApiArg = void;
export type CreateNewUserApiResponse = /** status 200 OK */ User[];
export type CreateNewUserApiArg = {
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
  password?: string;
};
export const { useGetAllUsersQuery, useCreateNewUserMutation } = injectedRtkApi;
