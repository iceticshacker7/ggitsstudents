import React, { useEffect, useState } from "react";
import Header from "../../Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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
      const data = await api.get("https://ggitsstudentsapi.vercel.app/login");
      if (data.data.role == "admin" || data.data.role == "leaderboard") {
        setUser(data.data.role);
      } else {
        toast.warn("Access Denied!", {
          theme: "colored",
          autoClose: 3000,
        });
        Navigate("/");
        return;
      }
      return;
    } catch (error) {
      toast.warn("Access Denied!", {
        theme: "colored",
        autoClose: 3000,
      });
      Navigate("/");
      return;
    }
  };

  useEffect(() => {
    getUserData();
    if (user == "admin" || user == "leaderboard") {
      deleteNews();
      Navigate("/leaderboard");
      return;
    }
  });

  const deleteNews = async () => {
    api
      .delete("https://ggitsstudentsapi.vercel.app/leaderboard/" + personid)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          toast.success("Person deleted successfully!", {
            theme: "colored",
            autoClose: 3000,
            position: "top-center",
          });
          Navigate("/leaderboard");
          console.log(response);
        } else {
          toast.error("Error while deleting Person!", {
            theme: "colored",
            autoClose: 3000,
          });
          Navigate("/leaderboard");
        }
      })
      .catch((error) => {
        if (error.response.status == 401) {
          toast.warn("Access Denied!", {
            theme: "colored",
            autoClose: 3000,
          });
          Navigate("/");
        }
      });
  };

  return <></>;
};

export default LeaderBoardDelete;
