const express = require("express");
const addNews = require("../models/newsSchema");
const router = express.Router();
const auth = require("../middleware/auth");

//GET ALL NEWS/HACKATHON
router.get("/", async (req, res) => {
  const result = await addNews.find();
  res.send(result);
});

//NEW NEWS/HACKTHON CREATION
router.post("/", auth, async (req, res) => {
  if (req.user.role == "admin" || req.user.role == "news") {
    try {
      const newNews = new addNews({
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        tag: req.body.tag,
      });

      const registered = await newNews.save();

      res.sendStatus(200);
      console.log("resource uploaded successfully");
    } catch (error) {
      res.send("Error while uploading resource");
      console.log(error);
    }
  } else {
    res.status(401).send({ data: "permission denied" });
  }
});

//UPDATE NEWS INFORMATION
router.put("/:id", auth, async (req, res) => {
  if (req.user.role == "admin" || req.user.role == "news") {
    try {
      const newsid = req.params.id;
      if (!addNews.findOne({ newsid })) {
        res.send("resource not found for updation.");
        return;
      }
      const result = await addNews.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            link: req.body.link,
            tag: req.body.tag,
          },
        }
      );
      console.log("update successful");
      res.send(result);
    } catch (error) {
      res.send("error while updating the data");
      console.log(error);
    }
  } else {
    res.status(401).send({ data: "permission denied" });
  }
});

//DELETE NEWS/HACKATHONS
router.delete("/:id", auth, async (req, res) => {
  if (req.user.role == "admin" || req.user.role == "news") {
    try {
      const newsid = req.params.id;
      const isExist = await addNews.findOne({ _id: newsid });
      if (!isExist) {
        res.send("resource not found");
        return;
      }
      const result = await addNews.findOneAndDelete({ _id: newsid });
      res.status(200).send(result);
      console.log("resource Delete successfully!");
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).send({ data: "permission denied" });
  }
});

module.exports = router;
