import { toast } from "react-toastify";
import { authActions } from "../slices/authSlice";
import axios from "axios";
import { USER_URL } from "../../constantes";

// Login User
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${USER_URL}/login`, user);
      dispatch(authActions.login(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        toast.error(error.response?.data.errors[0]?.msg);
    }
  };
}
