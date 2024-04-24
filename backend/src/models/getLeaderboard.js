require("dotenv").config();
var MongoClient = require("mongodb").MongoClient;

async function getHandlesFromMongo() {
  const uri =
    "mongodb+srv://adityagotnochill:ddrrdrdD7@cluster0.fxaupan.mongodb.net/";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("Leaderboard");
    const handlesCollection = database.collection("rankings");
    const handles = await handlesCollection.find({}).toArray();
    return handles;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.close();
  }
}
module.exports = getHandlesFromMongo;
