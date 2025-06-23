import React, { useState, useEffect } from "react";
import api from "../api";
import MovieCard from "./MovieCard";
import "../assets/css/components/MovieRow.css";
import { Link } from "react-router-dom";

const genres = {
  action: 28,
  comedy: 35,
  horror: 27,
  romance: 10749,
  documentaries: 99,
  trending: "trending",
};

const MovieRow = ({ title, genre }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let requestUrl;

        if (genre === "trending") {
          requestUrl = "/movies/trending";
        } else {
          requestUrl = `/movies/discover?genre=${genres[genre]}`;
        }

        const { data } = await api.get(requestUrl);

        setMovies(data || []);

        setLoading(false);
      } catch (error) {
        console.error(`Failed to fetch ${title}:`, error);
        setMovies([]);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genre, title]);

  return (
    <div className="movie-row">
      <h2 className="movie-row__title">{title}</h2>
      {loading ? (
        <div className="row-loading-spinner"></div>
      ) : (
        <div className="movie-row__posters">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-row__poster-card">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieRow;
