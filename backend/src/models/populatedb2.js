const { Ranking } = require("../models/db2.model.js");
const runCalculations = require("../models/calculateScore.js");

async function updateRanking(id, name, branch, batch, score, rating) {
  try {
    const filter = { _id: id, Name: name, Branch: branch, Batch: batch };
    const update = { Score: score, Rating: rating };

    console.log("Filter:", filter);
    console.log("Update:", update);

    // Update the document that matches the filter
    if (await Ranking.findOne(filter)) {
      const result = await Ranking.updateOne(filter, update);
      console.log("Result:", result);
      console.log(`Successfully updated the ranking for ${name}`);
    } else {
      console.log(
        `No matching document found for ${name}, ${branch}, ${batch}`
      );
      try {
        // Assuming Ranking is a Mongoose model
        const addOneResult = await Ranking.create({ ...filter, ...update });
        console.log("Add One Result:", addOneResult);
      } catch (error) {
        console.error(`Error adding document: ${error.message}`);
      }
    }
  } catch (error) {
    console.error(`Error updating ranking: ${error.message}`);
  }
}

async function runAndUpdateRankings() {
  try {
    // Assuming runCalculations returns a promise

    const calculations = await runCalculations();
    console.log("Calculations:", calculations);

    // Use forEach to iterate over the results
    calculations.map(async (Calculate) => {
      await updateRanking(
        Calculate._id,
        Calculate.Name,
        Calculate.Branch,
        Calculate.Batch,
        Calculate.Score,
        Calculate.Rating
      );
    });

    console.log("Rankings updated successfully!");
  } catch (error) {
    console.error("Error updating rankings:", error.message);
  }
}

module.exports = runAndUpdateRankings;
