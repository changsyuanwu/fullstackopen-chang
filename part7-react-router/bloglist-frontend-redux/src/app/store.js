import { configureStore } from "@reduxjs/toolkit";

import blogReducer from "../reducers/blogReducer";
import notificationReducer from "../reducers/notificationReducer";
import userReducer from "../reducers/userReducer";
import currentUserReducer from "../reducers/currentUserReducer";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    users: userReducer,
    currentUser: currentUserReducer,
  },
});

export default store;
