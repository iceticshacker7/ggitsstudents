const express = require("express");
const addRole = require("../models/roles");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.get("/", auth, (req, res) => {
  res.send(req.user);
  return;
});

router.post("/", async (req, res) => {
  try {
    const username = req.body.email;
    const password = req.body.password;

    const userCred = await addRole.findOne({ username: req.body.username });
    const passMatch = await bcrypt.compare(password, userCred.password);

    if (passMatch) {
      const token = await userCred.generateAuthToken();

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 3000000),
        httpOnly: true,
      });
      res.send("Login successfull");
    } else {
      res.send("password not matched");
    }
  } catch (error) {
    res.send("Invalid cred");
    console.log(error);
  }
});

router.get("/logout", auth, async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      req.user.tokens = [];
      res.clearCookie("jwt");
      await req.user.save();
      console.log("logout successfull");
      res.send("logout successfull");
    }
  } catch (error) {
    console.log(error);
    console.log("error logging out");
  }
});

module.exports = router;
