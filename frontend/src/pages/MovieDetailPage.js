import React, { useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getMovieDetails, addMovieToList } from "../redux/actions/movieActions";
import Spinner from "../components/Spinner";
import "../assets/css/pages/MovieDetail.css";

const IMAGE_BASE_URL =
  process.env.REACT_APP_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p/";

const MovieDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const movieDetails = useSelector((state) => state.movieDetails);
  const { loading, error, movie } = movieDetails;

  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;

  useEffect(() => {
    dispatch(getMovieDetails(id));
  }, [dispatch, id]);

  const addToListHandler = (listType) => {
    if (userInfo) {
      dispatch(
        addMovieToList({
          movieId: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          listType: listType,
        })
      );
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: `'${movie.title}' added to your ${listType} list!`,
      });
    } else {
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: "Please log in to save movies.",
      });
      navigate("/login");
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!movie) return null;

  const trailer = movie.videos?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );
  const watchProviders = movie["watch/providers"]?.results?.US?.flatrate;

  return (
    <div className="movie-detail-container">
      <div
        className="movie-detail-backdrop"
        style={{
          backgroundImage: `url(${IMAGE_BASE_URL}original${movie.backdrop_path})`,
        }}
      >
        <div className="backdrop-overlay"></div>
      </div>
      <div className="movie-detail-content">
        <div className="movie-detail-poster">
          <img
            src={`<span class="math-inline">\{IMAGE\_BASE\_URL\}w500</span>{movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="movie-detail-info">
          <h1>{movie.title}</h1>
          {movie.tagline && <p className="tagline">"{movie.tagline}"</p>}
          <div className="movie-meta">
            <span>★ {movie.vote_average?.toFixed(1)}</span>
            <span>{movie.release_date?.substring(0, 4)}</span>
            <span>{movie.runtime} min</span>
          </div>
          <div className="genres">
            {movie.genres?.map((genre) => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <div className="action-buttons">
            <button className="btn" onClick={() => addToListHandler("watched")}>
              Add to Watched
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => addToListHandler("watchLater")}
            >
              Add to Watch Later
            </button>
          </div>
        </div>
      </div>
      <div className="movie-additional-sections">
        {trailer && (
          <div className="section">
            <h2>Trailer</h2>
            <div className="video-responsive">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Official Trailer"
              ></iframe>
            </div>
          </div>
        )}
        {movie.credits?.cast?.length > 0 && (
          <div className="section">
            <h2>Top Billed Cast</h2>
            <div className="cast-carousel">
              {movie.credits.cast.slice(0, 10).map((actor) => (
                <div key={actor.cast_id} className="cast-card">
                  <img
                    src={
                      actor.profile_path
                        ? `${IMAGE_BASE_URL}w185${actor.profile_path}`
                        : "https://via.placeholder.com/185x278.png?text=No+Image"
                    }
                    alt={actor.name}
                  />
                  <strong>{actor.name}</strong>
                  <span>{actor.character}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {watchProviders?.length > 0 && (
          <div className="section">
            <h2>Stream On</h2>
            <div className="provider-carousel">
              {watchProviders.map((provider) => (
                <div key={provider.provider_id} className="provider-card">
                  <img
                    src={`${IMAGE_BASE_URL}w92${provider.logo_path}`}
                    alt={provider.provider_name}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
