import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Header from "./Header";
import getUsers from "../utils/getUser";
import AdminCard from "./helper/AdminCard";
import { Button } from "@chakra-ui/react";

const Admin = () => {
  const [admin, setAdmin] = useState("");
  const Navigate = useNavigate();
  const api = axios.create({
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });
  const getUserData = async () => {
    try {
      const data = await api.get("http://localhost:3000/login");
      if (data.data.role == "admin") {
        setAdmin(data.data);
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

  const users = getUsers([]);
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <Header />
      <div className="container bg-gray-100 py-6 h-full flex md:py-10 lg:py-14">
        <div className="mx-auto max-w-[76rem]">
          <div className="space-y-6">
            {admin.role == "admin" ? (
              <Link to="/admin/usercreate">
                <div className="flex justify-endmb-4">
                  <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2  px-4 rounded ml-auto">
                    New User
                  </Button>
                </div>
              </Link>
            ) : null}
            <div className="space-y-2 ">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
                ADMIN PANEL
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed text-center lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                The power of Everything
              </p>
              {users.map((user, index) => (
                <div key={index} className="flex flex-col ">
                  <div className="w-full">
                    <AdminCard username={user.username} role={user.role} />
                  </div>
                  {admin.role === "admin" ? (
                    <div className="flex mt-2 ml-auto ">
                      <Link to={"/admin/useredit/" + user._id}>
                        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Edit
                        </Button>
                      </Link>
                      <Link to={"/admin/userdelete/" + user._id}>
                        <Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                          Delete
                        </Button>
                      </Link>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
