require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;
const auth = require("./middleware/auth");
const getHandlesFromMongo = require("./models/getLeaderboard.js");
require("./db/Connection");

const corsOptionss = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, HEAD",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptionss));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//importing routes
const rolesRouter = require("./routes/roles");
const resourcesRouter = require("./routes/resources");
const jobRouter = require("./routes/jobs.js");
const newsRouter = require("./routes/news.js");
const loginRouter = require("./routes/login.js");

//configuring routes
app.use("/admin", rolesRouter);
app.use("/resources", resourcesRouter);
app.use("/jobs", jobRouter);
app.use("/news", newsRouter);
app.use("/login", loginRouter);
// app.use("/leaderboard", leaderboardRouter);

const getHandlesAndSendResponse = async (res) => {
  try {
    const handles = await getHandlesFromMongo();
    res.json(handles);
  } catch (error) {
    console.error("Error getting handles:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Initial call to getHandlesAndSendResponse
app.get("/api/getHandles", async (req, res) => {
  getHandlesAndSendResponse(res);
});

app.listen(port, (req, res) => {
  console.log(`Server is running at port ${port}`);
});
