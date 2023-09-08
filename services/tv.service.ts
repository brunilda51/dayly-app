// tvShowService.js

import axios from "axios";
import { API_URL } from "./urlHelper";

const URL = API_URL + "/tv";

const getAllTvShows = async (viewer: string) => {
  try {
    let query = viewer ? "?viewer=" + viewer : "";
    const response = await axios.get(URL + "/filter" + query);
    return response.data.tvs;
  } catch (error) {
    console.error("Error fetching tvShows:", error);
    throw error;
  }
};

const getTvShowStats = async () => {
  try {
    const response = await axios.get(URL + "/stats");
    return response.data;
  } catch (error) {
    console.error("Error fetching tvShows:", error);
    throw error;
  }
};
export default {
  getAllTvShows,
  getTvShowStats,
};
