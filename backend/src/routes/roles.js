const express = require("express");
const roleRegister = require("../models/roles");
const router = express.Router();
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");

//GET ALL USER
router.get("/", auth, async (req, res) => {
  if (req.user.role == "admin") {
    const result = await roleRegister.find();
    res.status(200).send(result);
  } else {
    res.status(401).send({ data: "permission denied" });
  }
});

//NEW USER CREATION
router.post("/", auth, async (req, res) => {
  if (req.user.role == "admin") {
    try {
      const password = req.body.password;
      const confirmpassword = req.body.confirmpassword;
      const username = req.body.username;

      if (password === confirmpassword) {
        const newRole = new roleRegister({
          username: req.body.username,
          role: req.body.role,
          password: req.body.password,
          confirmpassword: req.body.confirmpassword,
        });

        const isRegisterd = await roleRegister.findOne({
          username: username,
        });
        if (isRegisterd) {
          res.send("user already exist");
          return;
        }

        // const token = await newRole.generateAuthToken();

        // res.cookie("jwt", token, {
        //   expires: new Date(Date.now() + 3000000),
        //   httpOnly: true,
        // });
        const registered = await newRole.save();

        res.status(200).send("user created successfully");
        // console.log("admin registered successful");
      } else {
        res.send("Password does not match");
      }
    } catch (error) {
      // console.log(error);
    }
  } else {
    res.status(401).send({ data: "permission denied" });
  }
});

//UPDATE USER INFORMATION
router.put("/:id", auth, async (req, res) => {
  (password = req.body.password), (confirmpassword = req.body.confirmpassword);
  if (password != confirmpassword) {
    res.status(400).send({ data: "password not matched" });
  }
  if (req.user.role == "admin") {
    try {
      const userid = req.params.id;
      if (!roleRegister.findOne({ userid })) {
        res.send("user not found for updation.");
        return;
      }
      const result = await roleRegister.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            username: req.body.username,
            role: req.body.role,
            password: req.body.password,
            confirmpassword: req.body.confirmpassword,
          },
        }
      );
      // console.log("update successful");
      res.status(200).send(result);
    } catch (error) {
      res.send("error while updating the data");
      // console.log(error);
    }
  } else {
    res.status(401).send({ data: "permission denied" });
  }
});

//DELETE USER
router.delete("/:id", auth, async (req, res) => {
  if (req.user.role == "admin") {
    try {
      const userid = req.params.id;
      const isExist = await roleRegister.findOne({ _id: userid });
      if (!isExist) {
        res.send("User not found");
        return;
      }
      const result = await roleRegister.findOneAndDelete({ _id: userid });
      res.status(200).send(result);
      // console.log("User Delete successfully!");
    } catch (error) {
      // console.log(error);
    }
  } else {
    res.status(401).send({ data: "permission denied" });
  }
});

module.exports = router;
