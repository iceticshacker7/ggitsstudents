import { MongoClient } from "mongodb";
async function getHandlesFromMongo() {
  const uri =
    "mongodb+srv://adityagotnochill:ddrrdrdD7@cluster0.fxaupan.mongodb.net/";

  const client = new MongoClient(uri, {
    
    
  });

  try {
    await client.connect();

    const database = client.db("student-profile");
    const handlesCollection = database.collection("ratings");

    const handles = await handlesCollection.find({}).toArray();
    // console.log("Inside prac.js : ", handles);

    return handles;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.close();
  }
}

const handles = await getHandlesFromMongo();
export default handles;