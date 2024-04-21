require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
});

const addNews = new mongoose.model("new", newsSchema);
module.exports = addNews;
