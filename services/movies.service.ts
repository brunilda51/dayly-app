// movieService.js

import axios from "axios";
import { API_URL } from "./urlHelper";

const URL = API_URL + "/movie";

const getAllMovies = async (
  page: number,
  filter: string,
  limit: number = 10
) => {
  try {
    let query =
      (filter ? "?viewer=" + filter : "") +
      (page != null ? "?page=" + page + "&&" : "") +
      (limit ? "limit=" + limit : "");

    const response = await axios.get(URL + "/filter" + query);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

const getMovieStats = async () => {
  try {
    const response = await axios.get(URL + "/stats");
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

const addMovie = async (movieForm: any) => {
  try {
    const response = await axios.post(URL, movieForm);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

const updateMovie = async (movieForm: any, movieId: string) => {
  try {
    const response = await axios.put(URL + "/" + movieId, movieForm);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

const deleteMovie = async (movieId: string) => {
  try {
    const response = await axios.delete(URL + "/" + movieId);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
export default {
  getAllMovies,
  getMovieStats,
  addMovie,
  updateMovie,
  deleteMovie,
};
