import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";

const SearchResultsPage = () => {
  const { keyword } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/movies/search?query=${keyword}`);
        setMovies(data);
        setLoading(false);
      } catch (err) {
        setError("Could not perform search. Please try again.");
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [keyword]);

  return (
    <div className="page-container">
      <h1>Search Results for "{keyword}"</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          {movies.length === 0 ? (
            <p>No movies found matching your search.</p>
          ) : (
            <div className="movie-grid">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResultsPage;
