import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const Admin = () => {
  const [user, setUser] = useState("");
  const Navigate = useNavigate();
  const api = axios.create({
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });
  const getUserData = async () => {
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
  }, []);
  return (
    <>
      <Navbar />
      <div>Admin</div>
    </>
  );
};

export default Admin;
