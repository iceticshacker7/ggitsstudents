import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import Header from "../../Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Admindelete = () => {
  const Navigate = useNavigate();
  const { userid } = useParams();
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
      const data = await api.get("http://localhost:5000/login");
      if (data.data.role == "admin") {
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
    const ans = confirm("do you want to delete the user? ");
    if (user == "admin") {
      if (ans == false) {
        Navigate("/admin");
        return;
      } else {
        deleteUser();
        Navigate("/admin");
        return;
      }
    }
  });

  const deleteUser = async () => {
    api
      .delete("http://localhost:5000/admin/" + userid)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          alert("User Deleted Successfully!");
          Navigate("/admin");
          console.log(response);
        } else {
          alert("Error while deleting user!");
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

export default Admindelete;
