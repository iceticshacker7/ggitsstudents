const mongoose = require("mongoose");
const pass = process.env.PASSWORD;
const uri = `mongodb+srv://arpitkoshta5:Xe6UGLYqQMrgHKvU@cluster0.gklvy7b.mongodb.net/CodeClubs?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to database successfully!");
  })
  .catch((e) => {
    console.log("Error while connecting to database");
    console.log(e);
  });
