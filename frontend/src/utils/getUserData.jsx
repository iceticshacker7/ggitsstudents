import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../reduxStore/userSlice";

const getUserData = () => {
  const dispatch = useDispatch();
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
      const data = await api.get("https://ggitsstudentsapi.vercel.app/login");
      setUser(data.data);
      // dispatch(addUser(data.data));s
    } catch (error) {
      return;
    }
  };
  return user;
};

export default getUserData;
