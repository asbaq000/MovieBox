import api from "../../api";

export const listPopularMovies = (page) => async (dispatch, getState) => {
  try {
    if (page === 1 && getState().popularMovies.movies.length === 0) {
      dispatch({ type: "MOVIE_LIST_REQUEST" });
    }

    const { data } = await api.get(`/movies/popular?page=${page}`);

    if (page === 1) {
      dispatch({
        type: "MOVIE_LIST_SUCCESS",
        payload: { movies: data },
      });
    } else {
      dispatch({
        type: "MOVIE_LIST_APPEND_SUCCESS",
        payload: { movies: data },
      });
    }
  } catch (error) {
    dispatch({
      type: "MOVIE_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMovieDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "MOVIE_DETAILS_REQUEST" });

    const { data } = await api.get(`/movies/${id}`);

    dispatch({ type: "MOVIE_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "MOVIE_DETAILS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addMovieToList = (movieData) => async (dispatch) => {
  try {
    await api.post("/movies/addtolist", movieData);
  } catch (error) {
    console.error("Failed to add movie to list", error);
  }
};
