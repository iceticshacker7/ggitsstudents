require("dotenv").config();
var MongoClient = require("mongodb").MongoClient;

async function getHandlesFromMongo() {
  const uri = process.env.LEADERBOARD_URI;
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
