import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header";
import getUserData from "../../../utils/getUserData";

const JobsPost = () => {
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
      const data = await api.get("http://localhost:3000/login");
      if (data.data.role == "admin" || data.data.role == "jobs") {
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
  });

  const handleOnSubmit = (e) => {
    console.log("sfasdsfd");
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const tag = e.target.tag.value;
    const eligibility = e.target.eligibility.value;
    const link = e.target.link.value;
    api
      .post("http://localhost:3000/jobs", {
        title,
        description,
        tag,
        eligibility,
        link,
      })
      .then((response) => {
        if (response.status == 200) {
          alert("job posted successfully!");
          Navigate("/jobs");
        } else {
          alert("Error occured while posting job!");
          Navigate("/jobs");
        }
      })
      .catch((error) => {
        if (error.response.status == 401) {
          alert("Access Denied");
          Navigate("/");
        }
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
      <form className="max-w-sm mx-auto" onSubmit={handleOnSubmit}>
        <div className="mb-5">
          <input
            type="text"
            id="title"
            name="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your Title"
            required
          />
        </div>
        <div className="mb-5">
          <textarea
            rows={5}
            type="text"
            name="description"
            id="desciption"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your desciption"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            id="tag"
            name="tag"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your tag"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            id="eligibility"
            name="eligibility"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter eligible batch"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            id="link"
            name="link"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your link"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          POST
        </button>
      </form>
    </div>
  );
};

export default JobsPost;
