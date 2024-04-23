import axios from "axios";
import React, { useEffect, useState } from "react";

const getNews = () => {
  const [news, setNews] = useState([]);
  const api = axios.create({
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    try {
      const data = await api.get("http://localhost:5000/news");
      setNews([...data.data]);
    } catch (error) {
      console.log(error);
      console.log("error fetching news");
    }
  };
  return news;
};

export default getNews;
