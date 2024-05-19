import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUsersdata } from "../reduxStore/dataSlice";

const getUsers = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const api = axios.create({
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    try {
      const data = await api.get("https://ggitsstudentsapi.vercel.app/admin");
      setUsers([...data.data]);
      // dispatch(addUsersdata(users));
    } catch (error) {
      console.log(error);
      console.log("error fetching users");
    }
  };
  return users;
};

export default getUsers;
