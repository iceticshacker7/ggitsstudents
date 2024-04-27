const express = require("express");
// const addResource = require("../models/resourcesSchema");
const { mainRating, Ranking } = require("../models/db2.model");
const runAndUpdateRankings = require("../models/populatedb2");
const router = express.Router();
const auth = require("../middleware/auth");

//GET ALL RESOURCES
router.get("/", async (req, res) => {
  const result = await Ranking.find().sort({ Score: 1 });
  res.send(result);
});
router.get("/getrating", auth, async (req, res) => {
  if (req.user.role == "admin" || req.user.role == "leaderboard") {
    const result = await mainRating.find();
    res.send(result);
  } else {
    console.log("Access Denied for accessing");
  }
});

//NEW RESOURCE CREATION
router.post("/", auth, async (req, res) => {
  if (req.user.role == "admin" || req.user.role == "leaderboard") {
    try {
      const newPerson = new mainRating({
        Name: req.body.Name,
        Branch: req.body.Branch,
        Batch: req.body.Batch,
        LeetcodeLink: req.body.LeetcodeLink,
        CodechefLink: req.body.CodechefLink,
        CodeforcesLink: req.body.CodeforcesLink,
        GFGLink: req.body.GFGLink,
      });

      await newPerson.save();
      runAndUpdateRankings();
      res.sendStatus(200);
      console.log("Person added successfully");
    } catch (error) {
      res.send("Error while adding person");
      console.log(error);
    }
  } else {
    res.status(401).send({ data: "permission denied" });
  }
});

//UPDATE RESOURCE INFORMATION
router.put("/:id", auth, async (req, res) => {
  if (req.user.role == "admin" || req.user.role == "leaderboard") {
    try {
      const personid = req.params.id;
      if (!mainRating.findOne({ personid })) {
        res.send("Person not found for updation.");
        return;
      }

      const result = await mainRating.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            Name: req.body.Name,
            Branch: req.body.Branch,
            Batch: req.body.Batch,
            LeetcodeLink: req.body.LeetcodeLink,
            CodechefLink: req.body.CodechefLink,
            CodeforcesLink: req.body.CodeforcesLink,
            GFGLink: req.body.GFGLink,
          },
        }
      );
      console.log("update successful");
      runAndUpdateRankings();
      res.send(result);
    } catch (error) {
      console.log(error);
      res.send("error while updating the data");
    }
  } else {
    res.status(401).send({ data: "permission denied" });
  }
});

//DELETE USER
router.delete("/:id", auth, async (req, res) => {
  if (req.user.role == "admin" || req.user.role == "leaderboard") {
    try {
      const personid = req.params.id;
      const isExist = await mainRating.findOne({ _id: personid });
      if (!isExist) {
        res.send("Person not found");
        return;
      }
      const result = await mainRating.findOneAndDelete({ _id: personid });
      const result2 = await Ranking.findOneAndDelete({ _id: personid });
      res.send(result);
      console.log("Person Delete successfully!");
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).send({ data: "permission denied" });
  }
});

module.exports = router;
