import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllMovies: build.query<GetAllMoviesApiResponse, GetAllMoviesApiArg>({
      query: () => ({ url: `/movies` }),
    }),
    addMovie: build.mutation<AddMovieApiResponse, AddMovieApiArg>({
      query: (queryArg) => ({
        url: `/movies`,
        method: "POST",
        body: queryArg.movieInput,
      }),
    }),
    getMovieStats: build.query<GetMovieStatsApiResponse, GetMovieStatsApiArg>({
      query: () => ({ url: `/movie/stats` }),
    }),
    getFilteredMovies: build.query<
      GetFilteredMoviesApiResponse,
      GetFilteredMoviesApiArg
    >({
      query: () => ({ url: `/movies/filter` }),
    }),
    updateMovie: build.mutation<UpdateMovieApiResponse, UpdateMovieApiArg>({
      query: (queryArg) => ({
        url: `/movies/${queryArg.id}`,
        method: "PUT",
        body: queryArg.movieInput,
      }),
    }),
    deleteMovie: build.mutation<DeleteMovieApiResponse, DeleteMovieApiArg>({
      query: (queryArg) => ({
        url: `/movies/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type GetAllMoviesApiResponse = /** status 200 OK */ Movie[];
export type GetAllMoviesApiArg = void;
export type AddMovieApiResponse = unknown;
export type AddMovieApiArg = {
  movieInput: MovieInput;
};
export type GetMovieStatsApiResponse = /** status 200 OK */ object;
export type GetMovieStatsApiArg = void;
export type GetFilteredMoviesApiResponse = /** status 200 OK */ Movie[];
export type GetFilteredMoviesApiArg = void;
export type UpdateMovieApiResponse = unknown;
export type UpdateMovieApiArg = {
  /** ID of the movie to update */
  id: string;
  movieInput: MovieInput;
};
export type DeleteMovieApiResponse = unknown;
export type DeleteMovieApiArg = {
  /** ID of the movie to delete */
  id: string;
};
export type Movie = {
  id?: string;
  title?: string;
  director?: string;
  watch_date?: string;
  rating?: string;
  viewer?: string;
};
export type MovieInput = {
  title?: string;
  director?: string;
  watch_date?: string;
  rating?: string;
  viewer?: string;
};
export const {
  useGetAllMoviesQuery,
  useAddMovieMutation,
  useGetMovieStatsQuery,
  useGetFilteredMoviesQuery,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} = injectedRtkApi;
