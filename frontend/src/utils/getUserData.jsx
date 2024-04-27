import axios from "axios";
import React, { useEffect, useState } from "react";

const getUserData = () => {
  const [user, setUser] = useState("");
  const api = axios.create({
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const data = await api.get("http://localhost:3000/login");
      setUser(data.data);
    } catch (error) {
      return;
    }
  };
  return user;
};

export default getUserData;
