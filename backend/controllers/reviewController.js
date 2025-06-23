const asyncHandler = require("express-async-handler");
const Review = require("../models/Review");

exports.getMovieReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ movieId: req.params.movieId }).populate(
    "user",
    "name"
  );
  res.status(200).json(reviews);
});

exports.createMovieReview = asyncHandler(async (req, res) => {
  const { rating, reviewText } = req.body;
  const { movieId } = req.params;

  const alreadyReviewed = await Review.findOne({
    movieId: movieId,
    user: req.user.id,
  });

  if (alreadyReviewed) {
    res.status(400);
    throw new Error("You have already reviewed this movie");
  }

  const review = await Review.create({
    movieId,
    rating,
    reviewText,
    user: req.user.id,
  });

  res.status(201).json(review);
});
