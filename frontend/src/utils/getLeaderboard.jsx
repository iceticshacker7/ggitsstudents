import axios from "axios";
import React, { useEffect, useState } from "react";

const getLeaderboard = () => {
  const [handles, setHandles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Assuming your backend is running on http://localhost:5000/
        const response = await axios.get(
          "http://localhost:5000/leaderboard/getHandles"
        );
        setHandles(response.data);
      } catch (error) {
        console.error("Error fetching handles:", error);
      }
    }

    fetchData();
  }, []);

  function sortByScore(a, b) {
    return b.Score - a.Score;
  }

  handles.sort(sortByScore);

  handles.forEach((item, index) => {
    item.Rank = index + 1;
  });
  return handles;
};

export default getLeaderboard;
