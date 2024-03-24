import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "./openapi.yaml",
  apiFile: "./redux/emptyApi.ts",
  apiImport: "emptySplitApi",
  outputFiles: {
    "./redux/authApi.ts": {
      filterEndpoints: [/auth/i],
    },
    "./redux/tvApi.ts": {
      filterEndpoints: [/tvshows/i],
    },
    "./redux/booksApi.ts": {
      filterEndpoints: [/book/i],
    },
    "./redux/moviesApi.ts": {
      filterEndpoints: [/movie/i],
    },
    "./redux/usersApi.ts": {
      filterEndpoints: [/user/i],
    },
  },
  hooks: true,
};

export default config;
