require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const roleSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//GENERATING AUTH TOKEN
roleSchema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    // console.log("Error occured while generating token");
    // console.log(error);
  }
};

//PASSWORD HASHING
roleSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10);
  }

  next();
});

const roleRegister = new mongoose.model("role", roleSchema);
module.exports = roleRegister;
