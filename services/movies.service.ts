// movieService.js

import axios from "axios";
import { API_URL } from "./urlHelper";

const URL = API_URL + "/movie";

const getAllMovies = async (viewer: string) => {
  try {
    let query = viewer ? "?viewer=" + viewer : "";
    const response = await axios.get(URL + "/filter" + query);
    return response.data.movies;
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
    const response = await axios.post(URL);
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
};
