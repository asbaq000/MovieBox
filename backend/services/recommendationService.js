const asyncHandler = require("express-async-handler");
const { TfIdf } = require("natural");
const User = require("../models/User");
const axios = require("axios");

const sampleMovies = [
  {
    tmdbId: "872585",
    title: "Oppenheimer",
    overview:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
  },
  {
    tmdbId: "299054",
    title: "Expend4bles",
    overview:
      "Armed with every weapon they can get their hands on, the Expendables are the world’s last line of defense and the team that gets called when all other options are off the table.",
  },
  {
    tmdbId: "502356",
    title: "The Super Mario Bros. Movie",
    overview:
      "The story of The Super Mario Bros. on their journey through the Mushroom Kingdom to find Luigi and save the world from Bowser.",
  },
  {
    tmdbId: "569094",
    title: "Mission: Impossible - Dead Reckoning Part One",
    overview:
      "Ethan Hunt and his IMF team embark on their most dangerous mission yet: To track down a terrifying new weapon that threatens all of humanity before it falls into the wrong hands.",
  },
  {
    tmdbId: "615656",
    title: "Meg 2: The Trench",
    overview:
      "An exploratory dive into the deepest depths of the ocean spirals into chaos when a malevolent mining operation threatens their mission and forces them into a high-stakes battle for survival.",
  },
  {
    tmdbId: "27205",
    title: "Inception",
    overview:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  },
  {
    tmdbId: "155",
    title: "The Dark Knight",
    overview:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
];

const tfidf = new TfIdf();
sampleMovies.forEach((movie) => {
  tfidf.addDocument(movie.overview, movie.title);
});

exports.getRecommendations = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user || user.watched.length === 0) {
    return res
      .status(400)
      .json({ message: "Watch some movies to get recommendations." });
  }

  const recommendations = new Set();
  const watchedTitles = user.watched.map((m) => m.title);

  user.watched.forEach((watchedMovie) => {
    tfidf.listMostSimilarDocuments(watchedMovie.title, 5).forEach((item) => {
      const similarTitle = item[1];
      if (!watchedTitles.includes(similarTitle)) {
        recommendations.add(similarTitle);
      }
    });
  });

  const recommendedMovies = Array.from(recommendations)
    .map((title) => sampleMovies.find((movie) => movie.title === title))
    .filter(Boolean);

  if (recommendedMovies.length === 0) {
    return res.json({
      message:
        "Could not find specific recommendations, try watching more movies!",
      recommendations: [],
    });
  }

  const detailedRecommendations = await Promise.all(
    recommendedMovies.map(async (movie) => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.tmdbId}`,
        {
          params: { api_key: process.env.TMDB_API_KEY },
        }
      );
      return data;
    })
  );

  res.json({
    message: "Recommendations based on your watched history",
    recommendations: detailedRecommendations,
  });
});
