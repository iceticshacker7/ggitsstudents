import mongoose from "mongoose";

// Connect to the first database
const firstDbConnection = mongoose.createConnection("mongodb+srv://adityagotnochill:ddrrdrdD7@cluster0.fxaupan.mongodb.net/student-profile");

// Schema for the ratings model in the first database
const RatingsSchema = new mongoose.Schema({
    ID: {
        type: Number,
        required: true,
    },
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
    value: {
        type: Number,
        required: true,
    },
});

// Create the Mongoose model for the ratings model in the first database
const Ratings = firstDbConnection.model("Ratings", RatingsSchema);

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
  
  const db2Connection = mongoose.createConnection("mongodb+srv://adityagotnochill:ddrrdrdD7@cluster0.fxaupan.mongodb.net/Leaderboard");
  const Ranking = db2Connection.model("Ranking", RankingSchema);
  
  export default Ranking;