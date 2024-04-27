import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import Header from "../../Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const LeaderBoardDelete = () => {
  const Navigate = useNavigate();
  const { personid } = useParams();
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
      const data = await api.get("http://localhost:5000/login");
      if (data.data.role == "admin" || data.data.role == "leaderboard") {
        setUser(data.data.role);
      } else {
        alert("access denied");
        Navigate("/");
        return;
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
    if (user == "admin" || user == "leaderboard") {
      const ans = confirm("do you want to delete the news? ");
      if (ans == false) {
        Navigate("/leaderboard");
        return;
      } else {
        deleteNews();
        Navigate("/leaderboard");
        return;
      }
    }
  });

  const deleteNews = async () => {
    api
      .delete("http://localhost:5000/leaderboard/" + personid)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          alert("Person Deleted Successfully!");
          Navigate("/leaderboard");
          console.log(response);
        } else {
          alert("Error while deleting Person!");
          Navigate("/leaderboard");
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

export default LeaderBoardDelete;
