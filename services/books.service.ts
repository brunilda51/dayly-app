// bookService.js

import axios from "axios";
import { API_URL } from "./urlHelper";

const URL = API_URL + "/books";

const getAllBooks = async (reader: string) => {
  try {
    let query = reader ? "?reader=" + reader : "";
    const response = await axios.get(URL + "/filter" + query);
    return response.data.books;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

const getBookStats = async () => {
  try {
    const response = await axios.get(URL + "/stats");
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

const addBook = async (bookForm: any) => {
  try {
    const response = await axios.post(URL, bookForm);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};
export default {
  getAllBooks,
  getBookStats,
  addBook,
};
