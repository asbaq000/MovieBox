import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPopularMovies } from "../redux/actions/movieActions";
import MovieCard from "../components/MovieCard";
import MovieRow from "../components/MovieRow";
import Spinner from "../components/Spinner";
import "../assets/css/pages/HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const popularMoviesState = useSelector((state) => state.popularMovies);
  const { loading, error, movies, page, hasMore } = popularMoviesState;

  const observer = useRef();
  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(listPopularMovies(page));
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page, dispatch]
  );
  useEffect(() => {
    dispatch({ type: "MOVIE_LIST_RESET" });
    dispatch(listPopularMovies(1));
  }, [dispatch]);

  return (
    <div className="homepage-container">
      <MovieRow title="Trending This Week" genre="trending" />
      <MovieRow title="Action Movies" genre="action" />
      <MovieRow title="Comedy" genre="comedy" />
      <MovieRow title="Horror" genre="horror" />

      <div className="popular-movies-section">
        <h1 className="popular-movies-title">Popular Movies</h1>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={`${movie.id}-${Math.random()}`} movie={movie} />
          ))}
        </div>

        <div ref={lastMovieElementRef} style={{ height: "20px" }}></div>

        {loading && movies.length > 0 && <Spinner />}

        {!hasMore && <p className="end-of-results">You've reached the end!</p>}
      </div>
    </div>
  );
};

export default HomePage;
