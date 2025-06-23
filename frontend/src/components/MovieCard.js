import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/components/MovieCard.css";

const IMAGE_BASE_URL =
  process.env.REACT_APP_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p/";

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750.png?text=No+Image";

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  const getRatingClass = (rating) => {
    if (rating >= 7.5) return "rating-good";
    if (rating >= 5) return "rating-average";
    if (rating > 0) return "rating-bad";
    return "rating-none";
  };

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-card-img-container">
        <img src={posterUrl} alt={movie.title} loading="lazy" />
        <div className={`movie-card-rating ${getRatingClass(rating)}`}>
          <span className="star-icon">★</span> {rating}
        </div>
      </div>
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <p className="movie-card-release">
          {movie.release_date ? movie.release_date.substring(0, 4) : ""}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
