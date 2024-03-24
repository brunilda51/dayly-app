import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllBooks: build.query<GetAllBooksApiResponse, GetAllBooksApiArg>({
      query: () => ({ url: `/books` }),
    }),
    addBook: build.mutation<AddBookApiResponse, AddBookApiArg>({
      query: (queryArg) => ({
        url: `/books`,
        method: "POST",
        body: queryArg.bookInput,
      }),
    }),
    getBookStats: build.query<GetBookStatsApiResponse, GetBookStatsApiArg>({
      query: () => ({ url: `/books/stats` }),
    }),
    getFilteredBooks: build.query<
      GetFilteredBooksApiResponse,
      GetFilteredBooksApiArg
    >({
      query: (queryArg) => ({
        url: `/books/filter/${queryArg.page}`,
        params: { reader: queryArg.reader },
      }),
    }),
    updateBook: build.mutation<UpdateBookApiResponse, UpdateBookApiArg>({
      query: (queryArg) => ({
        url: `/books/${queryArg.id}`,
        method: "PUT",
        body: queryArg.bookInput,
      }),
    }),
    deleteBook: build.mutation<DeleteBookApiResponse, DeleteBookApiArg>({
      query: (queryArg) => ({ url: `/books/${queryArg.id}`, method: "DELETE" }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type GetAllBooksApiResponse = /** status 200 OK */ Book[];
export type GetAllBooksApiArg = void;
export type AddBookApiResponse = unknown;
export type AddBookApiArg = {
  bookInput: BookInput;
};
export type GetBookStatsApiResponse = /** status 200 OK */ object;
export type GetBookStatsApiArg = void;
export type GetFilteredBooksApiResponse = /** status 200 OK */ Book[];
export type GetFilteredBooksApiArg = {
  /** Page number */
  page: number;
  /** Filter books by reader username */
  reader?: string;
};
export type UpdateBookApiResponse = unknown;
export type UpdateBookApiArg = {
  /** ID of the book to update */
  id: string;
  bookInput: BookInput;
};
export type DeleteBookApiResponse = unknown;
export type DeleteBookApiArg = {
  /** ID of the book to delete */
  id: string;
};
export type Book = {
  id?: string;
  title?: string;
  author?: string;
  start_date?: string;
  finish_date?: string;
  rating?: string;
};
export type BookInput = {
  title?: string;
  author?: string;
  start_date?: string;
  finish_date?: string;
  rating?: string;
};
export const {
  useGetAllBooksQuery,
  useAddBookMutation,
  useGetBookStatsQuery,
  useGetFilteredBooksQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = injectedRtkApi;
