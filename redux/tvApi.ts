import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllTvShows: build.query<GetAllTvShowsApiResponse, GetAllTvShowsApiArg>({
      query: () => ({ url: `/tv` }),
    }),
    getFilteredTvShows: build.query<
      GetFilteredTvShowsApiResponse,
      GetFilteredTvShowsApiArg
    >({
      query: () => ({ url: `/tv/filter` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type GetAllTvShowsApiResponse = /** status 200 OK */ TvShow[];
export type GetAllTvShowsApiArg = void;
export type GetFilteredTvShowsApiResponse = /** status 200 OK */ TvShow[];
export type GetFilteredTvShowsApiArg = void;
export type TvShow = {
  id?: string;
  title?: string;
  start_date?: string;
  finish_date?: string;
  rating?: string;
  viewer?: string;
};
export const { useGetAllTvShowsQuery, useGetFilteredTvShowsQuery } =
  injectedRtkApi;
