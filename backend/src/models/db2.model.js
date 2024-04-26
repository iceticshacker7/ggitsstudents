require("dotenv").config();
const mongoose = require("mongoose");
var MongoClient = require("mongodb").MongoClient;

// Schema for the ratings model in the first database
const RatingsSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Branch: {
    type: String,
    required: true,
  },
  Batch: {
    type: String,
    required: true,
  },
  LeetcodeLink: {
    type: String,
    required: true,
  },
  CodechefLink: {
    type: String,
    required: true,
  },
  CodeforcesLink: {
    type: String,
    required: true,
  },
  GFGLink: {
    type: String,
    required: true,
  },
});

// Create the Mongoose model for the ratings model in the first database
const Ratings = new mongoose.model("rating", RatingsSchema);

const RankingSchema = new mongoose.Schema({
  Rank: {
    type: String,
    require: true,
    default: "",
  },
  Name: {
    ref: "Ratings",
    type: String,
    required: true,
  },
  Branch: {
    ref: "Ratings",
    type: String,
    required: true,
  },
  Batch: {
    ref: "Ratings",
    type: String,
    required: true,
  },
  Score: {
    type: String,
    required: true,
    default: "0",
  },
  Rating: {
    type: String,
    default: "0",
  },
});

const Ranking = new mongoose.model("Ranking", RankingSchema);
const mainRating = new mongoose.model("rating", RatingsSchema);
module.exports = { mainRating, Ranking };
