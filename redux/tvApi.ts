import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllTvShows: build.query<GetAllTvShowsApiResponse, GetAllTvShowsApiArg>({
      query: () => ({ url: `/tv` }),
    }),
    addTvShows: build.mutation<AddTvShowsApiResponse, AddTvShowsApiArg>({
      query: (queryArg) => ({
        url: `/tv`,
        method: "POST",
        body: queryArg.tvShowInput,
      }),
    }),
    getTvShowStats: build.query<
      GetTvShowStatsApiResponse,
      GetTvShowStatsApiArg
    >({
      query: () => ({ url: `/tv/stats` }),
    }),
    getFilteredTvShows: build.query<
      GetFilteredTvShowsApiResponse,
      GetFilteredTvShowsApiArg
    >({
      query: () => ({ url: `/tv/filter` }),
    }),
    updateTvShows: build.mutation<
      UpdateTvShowsApiResponse,
      UpdateTvShowsApiArg
    >({
      query: (queryArg) => ({
        url: `/tv/${queryArg.id}`,
        method: "PUT",
        body: queryArg.tvShowInput,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type GetAllTvShowsApiResponse = /** status 200 OK */ TvShow[];
export type GetAllTvShowsApiArg = void;
export type AddTvShowsApiResponse = unknown;
export type AddTvShowsApiArg = {
  tvShowInput: TvShowInput;
};
export type GetTvShowStatsApiResponse = /** status 200 OK */ object;
export type GetTvShowStatsApiArg = void;
export type GetFilteredTvShowsApiResponse = /** status 200 OK */ TvShow[];
export type GetFilteredTvShowsApiArg = void;
export type UpdateTvShowsApiResponse = unknown;
export type UpdateTvShowsApiArg = {
  /** ID of the TV show to update */
  id: string;
  tvShowInput: TvShowInput;
};
export type TvShow = {
  id?: string;
  title?: string;
  start_date?: string;
  finish_date?: string;
  rating?: string;
  viewer?: string;
};
export type TvShowInput = {
  title?: string;
  start_date?: string;
  finish_date?: string;
  rating?: string;
  viewer?: string;
};
export const {
  useGetAllTvShowsQuery,
  useAddTvShowsMutation,
  useGetTvShowStatsQuery,
  useGetFilteredTvShowsQuery,
  useUpdateTvShowsMutation,
} = injectedRtkApi;
