require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;
const auth = require("./middleware/auth");
require("./db/Connection");
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

app.listen(port, (req, res) => {
  console.log(`Server is running at port ${port}`);
});
