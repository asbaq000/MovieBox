const asyncHandler = require("express-async-handler");
const axios = require("axios");
const User = require("../models/User");

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = "2d13792d29d2cfb0690bea05179070b8";

exports.getTrendingMovies = asyncHandler(async (req, res) => {
  const { data } = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
    params: {
      api_key: TMDB_API_KEY,
    },
  });
  res.json(data.results);
});

exports.discoverMovies = asyncHandler(async (req, res) => {
  const { genre } = req.query;
  if (!genre) {
    res.status(400);
    throw new Error("Genre parameter is required");
  }

  const { data } = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
    params: {
      api_key: TMDB_API_KEY,
      with_genres: genre,
      sort_by: "popularity.desc",
      include_adult: false,
    },
  });
  res.json(data.results);
});

exports.getPopularMovies = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const { data } = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
    params: {
      api_key: TMDB_API_KEY,
      page: page,
    },
  });
  res.json(data.results);
});

exports.getPopularMovies = asyncHandler(async (req, res) => {
  const { data } = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
    params: { api_key: TMDB_API_KEY },
  });
  res.json(data.results);
});

exports.getMovieDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { data } = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
    params: {
      api_key: TMDB_API_KEY,
      append_to_response: "videos,credits,watch/providers",
    },
  });
  res.json(data);
});

exports.searchMovies = asyncHandler(async (req, res) => {
  const { query } = req.query;
  if (!query) {
    res.status(400);
    throw new Error("Query parameter is required");
  }
  const { data } = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
    params: { api_key: TMDB_API_KEY, query },
  });
  res.json(data.results);
});

exports.addMovieToList = asyncHandler(async (req, res) => {
  const { movieId, title, poster_path, listType } = req.body;

  if (!["watched", "watchLater"].includes(listType)) {
    res.status(400);
    throw new Error("Invalid list type");
  }

  const user = await User.findById(req.user.id);

  const alreadyInTargetList = user[listType].find(
    (item) => item.movieId.toString() === movieId.toString()
  );

  if (alreadyInTargetList) {
    return res.status(200).json(user[listType]);
  }

  if (listType === "watched") {
    user.watchLater = user.watchLater.filter(
      (item) => item.movieId.toString() !== movieId.toString()
    );
  }

  user[listType].push({ movieId, title, poster_path });

  await user.save();

  res.status(201).json(user[listType]);
});

exports.removeMovieFromList = asyncHandler(async (req, res) => {
  const { movieId, listType } = req.body;

  if (!["watched", "watchLater"].includes(listType)) {
    res.status(400);
    throw new Error("Invalid list type");
  }

  const user = await User.findById(req.user.id);

  user[listType] = user[listType].filter(
    (item) => item.movieId.toString() !== movieId.toString()
  );

  await user.save();

  res.status(200).json(user[listType]);
});
