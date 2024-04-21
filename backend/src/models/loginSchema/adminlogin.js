require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminloginSchema = mongoose.Schema({
  username: {
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

  role: {
    type: String,
    default: "Admin",
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

//GENERATING AUTH TOEKN
adminloginSchema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    console.log("Error occured while generating token");
    console.log(error);
  }
};

// PASSWORD HASHING
adminloginSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10);
  }

  next();
});

const registerAdmin = new mongoose.model("admin", adminloginSchema);
module.exports = registerAdmin;
