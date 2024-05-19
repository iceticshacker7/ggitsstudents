import axios from "axios";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { addJobs } from "../reduxStore/dataSlice";

const api = axios.create({
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

const getJobs = async (dispatch) => {
  try {
    const data = await api.get("https://ggitsstudentsapi.vercel.app/jobs");
    // console.log(data.data);
    dispatch(addJobs(data.data));
  } catch (error) {
    console.log(error);
    console.log("error fetching news");
  }
};

export default getJobs;
