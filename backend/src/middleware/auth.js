require("dotenv").config();
const jwt = require("jsonwebtoken");
const addRole = require("../models/roles");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
      const user = await addRole.findOne({ _id: verifyUser._id });
      req.token = token;
      req.user = user;
      // console.log("user verified ");
      next();
    } else {
      console.log("user not verified");
      res.send({ data: "user not verified" });
    }
  } catch (error) {
    console.log(error);
    res.send("user not verifieds");
  }
};

module.exports = auth;
