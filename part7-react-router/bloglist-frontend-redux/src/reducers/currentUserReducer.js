import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { setNotification } from "./notificationReducer";

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: null,
  reducers: {
    setCurrentUser(state, action) {
      return action.payload;
    },
    clearCurrentUser() {
      return null;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;

export const initializeCurrentUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setCurrentUser(user));
      blogService.setToken(user.token);
    }
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem(
        "loggedBloglistAppUser",
        JSON.stringify(user),
      );
      dispatch(setCurrentUser(user));
      blogService.setToken(user.token);
      dispatch(
        setNotification({
          status: "success",
          message: `Logged in as ${user.name}`,
        }),
      );
    // eslint-disable-next-line no-unused-vars
    } catch (exception) {
      dispatch(
        setNotification({
          status: "error",
          message: "Invalid username or password",
        }),
      );
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBloglistAppUser");
    dispatch(clearCurrentUser());
  }
}