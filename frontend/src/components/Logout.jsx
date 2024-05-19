import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { removeUser } from "../reduxStore/userSlice";
import { toast } from "react-toastify";

const Logout = () => {
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(false);
  const Navigate = useNavigate();
  const verifyUser = async () => {
    try {
      const data = await axios.get(
        "https://ggitsstudentsapi.vercel.app/login",
        {
          withCredentials: true,
        }
      );
      if (data.status == 200) {
        setIsVerified(true);
      }
      return;
    } catch (error) {
      if (error.response.status == 401) {
        toast.error("User not logged in!", {
          theme: "colored",
          autoClose: 3000,
        });
        Navigate("/");
        return;
      }
    }
  };
  const logoutUser = async () => {
    try {
      const data = await axios.get(
        "https://ggitsstudentsapi.vercel.app/login/logout",
        {
          withCredentials: true,
        }
      );
      if (data.status == 200) {
        toast.success("Logout successfully!", {
          theme: "colored",
          autoClose: 3000,
        });
        dispatch(removeUser());
        Navigate("/");
      }
    } catch (error) {
      console.log("Error occur while logging out");
    }
  };

  useEffect(() => {
    verifyUser();
    logoutUser();
  }, []);

  return <></>;
};

export default Logout;
