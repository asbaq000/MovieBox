const express = require("express");
const router = express.Router();
const {
  getMovieReviews,
  createMovieReview,
} = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

router.route("/:movieId").get(getMovieReviews).post(protect, createMovieReview);

module.exports = router;
