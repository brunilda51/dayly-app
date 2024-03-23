// bookService.js

import axios from "axios";
import { API_URL } from "./urlHelper";

const URL = API_URL + "/books";

const getAllBooks = async (reader: string, page: number) => {
  try {
    let query = reader ? "?reader=" + reader : "";
    const response = await axios.get(URL + "/filter/" + page + query);
    return response.data.books;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

const getBookStats = async () => {
  try {
    const response = await axios.get(URL + "/stats");
    console.log(response.data);
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
const updateBook = async (bookForm: any, userId: string) => {
  try {
    const response = await axios.put(URL + "/" + userId, bookForm);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

const deleteBook = async (bookId: string) => {
  try {
    const response = await axios.delete(URL + "/" + bookId);
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
  updateBook,
  deleteBook,
};
