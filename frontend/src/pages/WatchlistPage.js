import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../api";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import "../assets/css/pages/WatchList.css";

const WatchlistPage = () => {
  const [watched, setWatched] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/auth/profile");
        setWatched(data.watched || []);
        setWatchLater(data.watchLater || []);
        setLoading(false);
      } catch (err) {
        setError("Could not fetch your lists. Please try again later.");
        setLoading(false);
      }
    };
    fetchLists();
  }, []);

  const removeFromListHandler = async (movieId, listType, movieTitle) => {
    try {
      await api.delete("/movies/removefromlist", {
        data: { movieId, listType },
      });

      if (listType === "watched") {
        setWatched((prev) => prev.filter((movie) => movie.movieId !== movieId));
      } else {
        setWatchLater((prev) =>
          prev.filter((movie) => movie.movieId !== movieId)
        );
      }

      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: `'${movieTitle}' removed from your list.`,
      });
    } catch (err) {
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: "Failed to remove movie.",
      });
      console.error("Failed to remove movie:", err);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="watchlist-container page-container">
      <div className="list-section">
        <h1>My Watch Later List</h1>
        {watchLater.length > 0 ? (
          <div className="movie-grid">
            {watchLater.map((item) => (
              <div key={item.movieId} className="list-item-wrapper">
                <MovieCard movie={{ id: item.movieId, ...item }} />
                <button
                  onClick={() =>
                    removeFromListHandler(
                      item.movieId,
                      "watchLater",
                      item.title
                    )
                  }
                  className="btn-remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>You haven't added any movies to your watch later list yet.</p>
        )}
      </div>

      <div className="list-section">
        <h1>My Watched Movies</h1>
        {watched.length > 0 ? (
          <div className="movie-grid">
            {watched.map((item) => (
              <div key={item.movieId} className="list-item-wrapper">
                <MovieCard movie={{ id: item.movieId, ...item }} />
                <button
                  onClick={() =>
                    removeFromListHandler(item.movieId, "watched", item.title)
                  }
                  className="btn-remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>You haven't marked any movies as watched yet.</p>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;
