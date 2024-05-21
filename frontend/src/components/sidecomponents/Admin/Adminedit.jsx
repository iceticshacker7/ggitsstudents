import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header";
import getUsers from "../../../utils/getUser";
import getNews from "../../../utils/getNews";
import { toast } from "react-toastify";

const Adminedit = () => {
  const Navigate = useNavigate();
  const { userid } = useParams();
  const [user, setUser] = useState("");
  const [fileteredData, setFilteredData] = useState([]);
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

  const getFilteredData = async () => {
    try {
      const datas = await api.get("https://ggitsstudentsapi.vercel.app/admin");
      datas.data.map((data) => {
        if (data._id == userid) {
          setFilteredData(data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    getFilteredData();
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const role = e.target.role.value;
    api
      .put("https://ggitsstudentsapi.vercel.app/admin/" + userid, {
        username,
        role,
      })
      .then((response) => {
        if (response.status == 200) {
          toast.success("User edited successfully!", {
            theme: "colored",
            autoClose: 3000,
            position: "top-center",
          });
          Navigate("/admin");
        } else {
          toast.error("Error occured while editing user data!", {
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
    <div className="flex w-full justify-center">
      <div className="relative w-full h-[45vh] max-w-lg rounded-lg my-40 bg-slate-50 p-10 shadow-lg ">
        <div className="flex justify-center font-bold text-xl">
          <h1 className="underline">ROLE EDIT</h1>
        </div>
        <form onSubmit={handleOnSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="username"
                className="text-sm font-medium leading-none"
              >
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                defaultValue={fileteredData.username}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                placeholder="Enter username"
                required
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="role"
                className="text-sm font-medium leading-none"
              >
                Role <span className="text-red-500">*</span>
              </label>
              <select
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="role"
                name="role"
                required
              >
                <option value="news"> news </option>
                <option value="jobs"> jobs </option>
                <option value="leaderboard"> leaderboard </option>
                <option value="resources"> resources </option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full h-10 bg-blue-500 text-white rounded-md flex items-center justify-center text-sm font-medium hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Adminedit;
