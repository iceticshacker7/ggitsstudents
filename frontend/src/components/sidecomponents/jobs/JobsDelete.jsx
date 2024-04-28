import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import Header from "../../Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const JobsDelete = () => {
  const Navigate = useNavigate();
  const { jobid } = useParams();
  const [user, setUser] = useState("");
  const [success, setSuccess] = useState([]);

  const api = axios.create({
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });
  const getUserData = async () => {
    try {
      const data = await api.get("https://ggitsstudentsapi.vercel.app/login");
      if (data.data.role == "admin" || data.data.role == "jobs") {
        setUser(data.data.role);
      } else {
        alert("access denied");
        Navigate("/");
      }
      return;
    } catch (error) {
      alert("access denied");
      Navigate("/");
      return;
    }
  };

  useEffect(() => {
    getUserData();
    const ans = confirm("do you want to delete the job? ");
    if (user == "admin" || user == "jobs") {
      if (ans == false) {
        Navigate("/jobs");
        return;
      } else {
        deleteJob();
        Navigate("/jobs");
        return;
      }
    }
  });

  const deleteJob = async () => {
    api
      .delete("https://ggitsstudentsapi.vercel.app/jobs/" + jobid)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          alert("job Deleted Successfully!");
          Navigate("/jobs");
          console.log(response);
        } else {
          alert("Error while deleting news!");
          Navigate("/jobs");
        }
      })
      .catch((error) => {
        if (error.response.status == 401) {
          alert("Access Denied");
          Navigate("/");
        }
      });
  };

  return (
    <>
      <Header />
    </>
  );
};

export default JobsDelete;
