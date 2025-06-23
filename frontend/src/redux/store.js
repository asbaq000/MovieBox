// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import {
  popularMoviesReducer,
  movieDetailsReducer,
} from "./reducers/movieReducer";
import { notificationReducer } from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    popularMovies: popularMoviesReducer,
    movieDetails: movieDetailsReducer,
    notification: notificationReducer,
  },

  preloadedState: {
    auth: {
      userInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
    },
  },
});

export default store;
