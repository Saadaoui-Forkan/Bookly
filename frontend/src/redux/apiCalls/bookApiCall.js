import axios from "axios";
import { toast } from "react-toastify";
import { bookActions } from "../slices/bookSlice";
import { BASE_URL, BOOK_URL } from "../../constantes";

// Get All Books
export function fetchBooks(page) {
    return async (dispatch) => {
      try {
        dispatch(bookActions.setLoading())
        const { data } = await axios.get(`${BASE_URL}/books?page=${page+1}`);
        dispatch(bookActions.getBooks(data));
        dispatch(bookActions.clearLoading())
      } catch (error) {
        toast.error(error.response?.data.msg);
        dispatch(bookActions.clearLoading());
      }
    };
  }