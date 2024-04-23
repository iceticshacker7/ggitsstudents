import axios from "axios";
import React, { useEffect, useState } from "react";

const getJobs = () => {
  const [jobs, setJobs] = useState([]);
  const api = axios.create({
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    try {
      const data = await api.get("http://localhost:5000/jobs");
      setJobs([...data.data]);
    } catch (error) {
      console.log(error);
      console.log("error fetching news");
    }
  };
  return jobs;
};

export default getJobs;
