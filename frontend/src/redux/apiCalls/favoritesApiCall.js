import axios from "axios";
import { favoritesActions } from "../slices/favoriteSlice";
import { FAVORITES_URL } from "../../constantes";
import { toast } from "react-toastify";

// Get Favorites Books
export function getFavorites() {
  return async (dispatch, getState) => {
    try {
      dispatch(favoritesActions.setLoading());
      const { data } = await axios.get(`${FAVORITES_URL}`, {
        headers: {
          authorization: getState().auth.user.accessToken,
        },
      });
      dispatch(favoritesActions.setFavorites(data.data));
      dispatch(favoritesActions.clearLoading());
    } catch (error) {
      toast.error(error.response?.data.msg);
      dispatch(favoritesActions.clearLoading());
    }
  };
}

// Add To Favorites
export function postToFavorites(bookId) {
  return async (dispatch, getState) => {
    try {
      dispatch(favoritesActions.setLoading());
      const { data } = await axios.post(`${FAVORITES_URL}`, { book:bookId, favorite:true }, {
        headers: {
          authorization: getState().auth.user.accessToken,
        },
      });
      toast.success(data?.message)
      dispatch(favoritesActions.setFavorites(bookId));
      dispatch(favoritesActions.clearLoading());
    } catch (error) {
      toast.error(error.response?.data.msg);
      dispatch(favoritesActions.clearLoading());
    }
  };
}

// Remove From Favorites
export function removeFromFavorites(bookId) {
  return async (dispatch, getState) => {
    try {
      dispatch(favoritesActions.setLoading());
      await axios.delete(`${FAVORITES_URL}/${bookId}`, {
        headers: {
          authorization: getState().auth.user.accessToken,
        },
      });
      dispatch(favoritesActions.removeFromFavorites(bookId));
      dispatch(favoritesActions.clearLoading());
    } catch (error) {
      toast.error(error.response?.data.msg);
      dispatch(favoritesActions.clearLoading());
    }
  };
}
