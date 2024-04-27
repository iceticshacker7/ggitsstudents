const express = require("express");
const addJobs = require("../models/jobSchema");
const router = express.Router();
const auth = require("../middleware/auth");

//GET ALL JOBS
router.get("/", async (req, res) => {
  const result = await addJobs.find().sort({ _id: -1 });
  res.send(result);
});

//NEW JOB CREATION
router.post("/", auth, async (req, res) => {
  if (req.user.role == "admin" || req.user.role == "jobs") {
    try {
      const newJobs = new addJobs({
        title: req.body.title,
        description: req.body.description,
        batch: req.body.batch,
        link: req.body.link,
        eligibility: req.body.eligibility,
        tag: req.body.tag,
      });

      const registered = await newJobs.save();

      res.status(200).send("Job posted successfully");
      console.log("jobs uploaded successfully");
    } catch (error) {
      res.send("Error while uploading jobs");
      console.log(error);
    }
  } else {
    res.status(401).send({ data: "permission denied" });
  }
});

//UPDATE JOB INFORMATION
router.put("/:id", auth, async (req, res) => {
  if (req.user.role == "admin" || req.user.role == "jobs") {
    try {
      const jobid = req.params.id;
      if (!addJobs.findOne({ jobid })) {
        res.send("jobs not found for updation.");
        return;
      }
      const result = await addJobs.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            batch: req.body.batch,
            eligibility: req.body.eligibility,
            link: req.body.link,
            tag: req.body.tag,
          },
        }
      );
      console.log("update successful");
      res.status(200).send(result);
    } catch (error) {
      response.send("error while updating the data");
    }
  } else {
  }
});

//DELETE JOB
router.delete("/:id", auth, async (req, res) => {
  if (req.user.role == "admin" || req.user.role == "jobs") {
    try {
      const jobid = req.params.id;
      const isExist = await addJobs.findOne({ _id: jobid });
      if (!isExist) {
        res.send("job not found");
        return;
      }
      const result = await addJobs.findOneAndDelete({ _id: jobid });
      res.send(result);
      console.log("job Delete successfully!");
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).send({ data: "permission denied" });
  }
});

module.exports = router;
