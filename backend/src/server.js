require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const port = process.nextTick.PORT || 5000;
const registerAdmin = require("./models/loginSchema/adminlogin");
const auth = require("./middleware/auth");
require("./db/Connection");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//ADMIN SECTION
app.post("/adminregister", async (req, res) => {
  try {
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    if (password === confirmpassword) {
      const newAdmin = new registerAdmin({
        username: req.body.username,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
      });

      const token = await newAdmin.generateAuthToken();

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 3000000),
        httpOnly: true,
      });
      const registered = await newAdmin.save();

      res.sendStatus(200);
      console.log("admin registered successful");
    } else {
      res.send("Password does not match");
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/adminlogin", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const userCred = await registerAdmin.findOne({ username });

    const passMatch = await bcrypt.compare(password, userCred.password);

    const token = await userCred.generateAuthToken();

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 3000000),
      httpOnly: true,
    });

    if (passMatch) {
      console.log(userCred);
      res.sendStatus(200);
    } else {
      res.send("password not matched");
    }
  } catch (error) {
    res.send("Invalid cred");
    console.log(error);
  }
});

app.get("/admindata", async (req, res) => {
  const getData = await registerAdmin.find();
  res.send(getData);
});

//JOB SECTION
app.post("/joblogin", (req, res) => {
  console.log("job login page!");
});

app.post("/jobpost", (req, res) => {
  console.log("job login page!");
});

app.get("/jobs", (req, res) => {});

// NEWS/HACKATHON SECION
app.post("/newslogin", (req, res) => {
  console.log("admin page!");
});
app.post("/newspost", (req, res) => {
  console.log("admin page!");
});

app.get("/news", (req, res) => {
  console.log("Jobs page");
});

//RESOURCES SECTION
app.post("/resouceslogin", (req, res) => {
  console.log("admin page!");
});
app.post("/resoucespost", (req, res) => {
  console.log("admin page!");
});
app.get("/resources", (req, res) => {
  console.log("Jobs page");
});

//LEADERBOARD SECTION
app.post("/leaderBoardlogin", (req, res) => {
  console.log("admin page!");
});
app.post("/leaderBoardpost", (req, res) => {
  console.log("admin page!");
});
app.get("/leaderboard", (req, res) => {
  console.log("Jobs page");
});

app.listen(port, (req, res) => {
  console.log(`Server is running at port ${port}`);
});
