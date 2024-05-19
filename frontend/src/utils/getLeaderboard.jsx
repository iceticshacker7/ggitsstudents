import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLeaderboard } from "../reduxStore/dataSlice";

const getLeaderboard = async (dispatch) => {
  try {
    // Assuming your backend is running on https://ggitsstudentsapi.vercel.app/
    const response = await axios.get(
      "https://ggitsstudentsapi.vercel.app/leaderboard"
    );
    const data = response.data;
    data.sort(sortByScore);
    data.forEach((item, index) => {
      item.Rank = index + 1;
    });
    dispatch(addLeaderboard(data));
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
  }

  function sortByScore(a, b) {
    return b.Score - a.Score;
  }
};

export default getLeaderboard;
