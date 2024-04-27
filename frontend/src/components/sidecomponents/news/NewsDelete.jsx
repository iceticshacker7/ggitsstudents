import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import Header from "../../Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const NewsDelete = () => {
  const Navigate = useNavigate();
  const { newsid } = useParams();
  const [user, setUser] = useState("");
  const [success, setSuccess] = useState([]);

  const api = axios.create({
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });
  const getUserData = async () => {
    console.log("getuserdata");
    try {
      const data = await api.get("http://localhost:3000/login");
      if (data.data.role == "admin" || data.data.role == "news") {
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
    if (user == "admin" || user == "news") {
      const ans = confirm("do you want to delete the news? ");
      if (ans == false) {
        Navigate("/news");
        return;
      } else {
        deleteNews();
        Navigate("/news");
        return;
      }
    }
  });

  const deleteNews = async () => {
    api
      .delete("http://localhost:3000/news/" + newsid)
      .then((response) => {
        if (response.status == 200) {
          alert("News Deleted Successfully!");
          Navigate("/news");
          console.log(response);
        } else {
          alert("Error while deleting news!");
          Navigate("/news");
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

export default NewsDelete;
