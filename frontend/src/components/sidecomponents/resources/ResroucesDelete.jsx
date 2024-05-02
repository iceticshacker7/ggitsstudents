import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import Header from "../../Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResourcesDelete = () => {
  const Navigate = useNavigate();
  const { resourceid } = useParams();
  const [user, setUser] = useState("");
  const [success, setSuccess] = useState([]);

  const api = axios.create({
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });
  const getUserData = async () => {
    // console.log("getuserdata");
    try {
      const data = await api.get("https://ggitsstudentsapi.vercel.app/login");
      if (data.data.role == "admin" || data.data.role == "resources") {
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
    if (user == "admin" || user == "resources") {
      const ans = confirm("do you want to delete the resource? ");
      if (ans == false) {
        Navigate("/resources");
        return;
      } else {
        deleteNews();
        Navigate("/resources");
        return;
      }
    }
  });

  const deleteNews = async () => {
    api
      .delete("https://ggitsstudentsapi.vercel.app/resources/" + resourceid)
      .then((response) => {
        if (response.status == 200) {
          alert("Resource Deleted Successfully!");
          Navigate("/resources");
          // console.log(response);
        } else {
          alert("Error while deleting news!");
          Navigate("/resources");
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

export default ResourcesDelete;
