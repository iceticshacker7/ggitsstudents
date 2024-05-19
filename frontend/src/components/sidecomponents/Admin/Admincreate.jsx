import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header";
import getUserData from "../../../utils/getUserData";
import { toast } from "react-toastify";

const Admincreate = () => {
  const Navigate = useNavigate();
  const [user, setUser] = useState("");
  const api = axios.create({
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });
  const getUserData = async () => {
    try {
      const data = await api.get("https://ggitsstudentsapi.vercel.app/login");
      if (data.data.role == "admin") {
        setUser(data.data.role);
      } else {
        toast.warn("Access Denied!", {
          theme: "colored",
          autoClose: 3000,
        });
        Navigate("/");
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
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const role = e.target.role.value;
    const password = e.target.password.value;
    const confirmpassword = e.target.confirmpassword.value;
    api
      .post("https://ggitsstudentsapi.vercel.app/admin", {
        username,
        role,
        password,
        confirmpassword,
      })
      .then((response) => {
        if (response.status == 200) {
          toast.success("User created successfully!", {
            theme: "colored",
            autoClose: 3000,
            position: "top-center",
          });
          Navigate("/admin");
        } else {
          toast.error("Error while creating user!", {
            theme: "colored",
            autoClose: 3000,
          });
          Navigate("/admin");
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

  return (
    <div>
      <form className="max-w-sm mx-auto" onSubmit={handleOnSubmit}>
        <div className="mb-5">
          <input
            type="text"
            id="username"
            name="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter username"
            required
          />
        </div>
        <div className="mb-5">
          <select
            type="text"
            name="role"
            id="role"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter role"
            required
          >
            <option value="news"> news </option>
            <option value="jobs"> jobs </option>
            <option value="leaderboard"> leaderboard </option>
            <option value="resources"> resources </option>
          </select>
        </div>
        <div className="mb-5">
          <input
            type="password"
            id="password"
            name="password"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="password"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="confirm password"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Admincreate;
