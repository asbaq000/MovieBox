const initialPopularState = {
  movies: [],
  page: 1,
  hasMore: true,
  loading: true,
  error: "",
};

export const popularMoviesReducer = (state = initialPopularState, action) => {
  switch (action.type) {
    case "MOVIE_LIST_REQUEST":
      return { ...state, loading: true };
    case "MOVIE_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload.movies,
        page: 2,
        hasMore: action.payload.movies.length > 0,
      };
    case "MOVIE_LIST_APPEND_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: [...state.movies, ...action.payload.movies],
        page: state.page + 1,
        hasMore: action.payload.movies.length > 0,
      };
    case "MOVIE_LIST_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "MOVIE_LIST_RESET":
      return initialPopularState;
    default:
      return state;
  }
};

export const movieDetailsReducer = (
  state = { movie: { credits: {}, videos: {} } },
  action
) => {
  switch (action.type) {
    case "MOVIE_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "MOVIE_DETAILS_SUCCESS":
      return { loading: false, movie: action.payload };
    case "MOVIE_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
