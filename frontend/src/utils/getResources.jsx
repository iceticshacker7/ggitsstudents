import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addResources } from "../reduxStore/dataSlice";

const api = axios.create({
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

const getResources = async (dispatch) => {
  try {
    const data = await api.get("https://ggitsstudentsapi.vercel.app/resources");
    dispatch(addResources(data.data));
  } catch (error) {
    -console.log(error);
    console.log("error fetching news");
  }
};

export default getResources;
