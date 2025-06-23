const serverless = require("serverless-http");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/movies", movieRoutes);
router.use("/reviews", reviewRoutes);

app.use("/api", router);

module.exports.handler = serverless(app);
