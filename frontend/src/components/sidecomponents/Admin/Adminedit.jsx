import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header";
import getUsers from "../../../utils/getUser";
import getNews from "../../../utils/getNews";

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
          alert("user edited successfully!");
          console.log(
            "new: " +
              response.data.password +
              " " +
              response.data.confirmpassword
          );
          Navigate("/admin");
        } else {
          alert("Error occured while editing user data!");
          Navigate("/admin");
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
    <div>
      <Header />
      {console.log(
        "old: " + fileteredData.password + " " + fileteredData.confirmpassword
      )}
      <form className="max-w-sm mx-auto" onSubmit={handleOnSubmit}>
        <div className="mb-5">
          <input
            type="text"
            id="username"
            name="username"
            defaultValue={fileteredData.username}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your Title"
          />
        </div>
        <div className="mb-5">
          <select
            type="text"
            name="role"
            id="role"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter role"
          >
            <option value={fileteredData.role}> {fileteredData.role} </option>
            {fileteredData.role != "jobs" ? (
              <option value="jobs"> jobs </option>
            ) : null}
            {fileteredData.role != "news" ? (
              <option value="news"> news </option>
            ) : null}
            {fileteredData.role != "resources" ? (
              <option value="resources"> resources </option>
            ) : null}
          </select>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Edit
        </button>
      </form>
    </div>
  );
};

export default Adminedit;
