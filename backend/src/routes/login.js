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
        secure: true,
        domain: "ggitsstudentsapi.vercel.app",
        sameSite: "none",
      });
      res.status(200).send(userCred);
    } else {
      res.status(401).send("password not matched");
    }
  } catch (error) {
    res.status(401).send("Invalid cred");
  }
});

router.get("/logout", auth, async (req, res) => {
  try {
    // console.log("dkfsa");
    const token = req.cookies.jwt;
    if (token) {
      req.user.tokens = [];
      res.clearCookie("jwt", {
        domain: "ggitsstudentsapi.vercel.app",
        sameSite: "none",
        secure: true,
        path: "/",
      });
      await req.user.save();
      res.status(200).send("logout successfull");
    }
  } catch (error) {
    // console.log("user not logged in");
    res.status(401).send("User not logged in.");
  }
});

module.exports = router;
