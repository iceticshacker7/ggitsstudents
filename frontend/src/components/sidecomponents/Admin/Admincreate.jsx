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
    <div className="flex justify-center">
      <div className="relative w-full h-[73vh] max-w-lg rounded-lg my-16 bg-slate-50 p-6 shadow-lg sm:p-5">
        <div className="flex justify-center font-bold text-xl">
          <h1 className="underline">NEW ROLE</h1>
        </div>
        <form
          className="space-y-6 max-w-sm h-full  mx-auto"
          onSubmit={handleOnSubmit}
        >
          <div className="space-y-4">
            <div className="space-y-1">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="username"
              >
                Username <span className="text-red-500">*</span>
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="username"
                name="username"
                type="text"
                placeholder="Enter username"
                required
              />
            </div>
            <div className="space-y-1">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="role"
              >
                Role <span className="text-red-500">*</span>
              </label>
              <select
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-black  "
                id="role"
                name="role"
                required
              >
                <option value="news" className="text-black">
                  {" "}
                  news{" "}
                </option>
                <option value="jobs" className="text-black">
                  {" "}
                  jobs{" "}
                </option>
                <option value="leaderboard" className="text-black">
                  {" "}
                  leaderboard{" "}
                </option>
                <option value="resources" className="text-black">
                  {" "}
                  resources{" "}
                </option>
              </select>
            </div>
            <div className="space-y-1">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="password"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="space-y-1">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="confirmpassword"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="confirmpassword"
                name="confirmpassword"
                type="password"
                placeholder="Confirm password"
                required
              />
            </div>
          </div>
          <button
            className="w-full h-10 bg-blue-500 text-white rounded-md flex items-center justify-center text-sm font-medium hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admincreate;
