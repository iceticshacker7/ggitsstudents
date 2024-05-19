import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNews } from "../reduxStore/dataSlice";

const api = axios.create({
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

const getNews = async (dispatch) => {
  try {
    // const dispatch = useDispatch();
    const data = await api.get("https://ggitsstudentsapi.vercel.app/news");
    dispatch(addNews(data.data));
  } catch (error) {
    console.log(error);
    console.log("error fetching news");
  }
};

export default getNews;
