import axios from "axios";
import React, { useEffect, useState } from "react";

const getResources = () => {
  const [resources, setResources] = useState([]);
  const api = axios.create({
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });

  useEffect(() => {
    getResources();
  }, []);

  const getResources = async () => {
    try {
      const data = await api.get(
        "https://ggitsstudentsapi.vercel.app/resources"
      );
      setResources([...data.data]);
    } catch (error) {
      // console.log(error);
      // console.log("error fetching news");
    }
  };
  return resources;
};

export default getResources;
