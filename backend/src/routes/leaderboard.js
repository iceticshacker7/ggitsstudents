const express = require("express");
// const addResource = require("../models/resourcesSchema");
const { mainRating, Ranking } = require("../models/db2.model");
const runAndUpdateRankings = require("../models/populatedb2");
const router = express.Router();
const auth = require("../middleware/auth");

//GET ALL RESOURCES
router.get("/", async (req, res) => {
  const result = await Ranking.find();
  res.send(result);
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

      runAndUpdateRankings();
      const registered = await newPerson.save();

      res.send(registered);
      console.log(registered);

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
  if (req.user.role == "admin" || req.user.role == "resources") {
    try {
      const resourceid = req.params.id;
      if (!addResource.findOne({ resourceid })) {
        res.send("resource not found for updation.");
        return;
      }
      const result = await addResource.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            link: req.body.link,
            tag: req.body.tag,
          },
        }
      );
      console.log("update successful");
      res.send(result);
    } catch (error) {
      response.send("error while updating the data");
    }
  } else {
    res.status(401).send({ data: "permission denied" });
  }
});

//DELETE USER
router.delete("/:id", auth, async (req, res) => {
  if (req.user.role == "admin" || req.user.role == "resources") {
    try {
      const resourceid = req.params.id;
      const isExist = await addResource.findOne({ _id: resourceid });
      if (!isExist) {
        res.send("resource not found");
        return;
      }
      const result = await addResource.findOneAndDelete({ _id: resourceid });
      res.send(result);
      console.log("resource Delete successfully!");
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).send({ data: "permission denied" });
  }
});

module.exports = router;
