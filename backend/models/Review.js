const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: [true, "Please add a rating between 1 and 10"],
      min: 1,
      max: 10,
    },
    reviewText: {
      type: String,
      required: [true, "Please add some review text"],
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

ReviewSchema.index({ movieId: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Review", ReviewSchema);
