const express = require("express");
const router = express.Router();
const {
  getPopularMovies,
  getMovieDetails,
  searchMovies,
  addMovieToList,
  removeMovieFromList,
  getTrendingMovies,
  discoverMovies,
} = require("../controllers/movieController");
const { protect } = require("../middleware/authMiddleware");

router.get("/trending", getTrendingMovies);
router.get("/discover", discoverMovies);

router.get("/popular", getPopularMovies);
router.get("/search", searchMovies);
router.get("/:id", getMovieDetails);
router.post("/addtolist", protect, addMovieToList);
router.delete("/removefromlist", protect, removeMovieFromList);

module.exports = router;
