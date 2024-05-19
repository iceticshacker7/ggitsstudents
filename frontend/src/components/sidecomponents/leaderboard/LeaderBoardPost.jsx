import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header";
import getUserData from "../../../utils/getUserData";
import { toast } from "react-toastify";

const LeaderBoardPost = () => {
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
      if (data.data.role == "admin" || data.data.role == "leaderboard") {
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
    const Name = e.target.Name.value;
    const Branch = e.target.Branch.value;
    const Batch = e.target.Batch.value;
    const LeetcodeLink = e.target.LeetcodeLink.value;
    const CodechefLink = e.target.CodechefLink.value;
    const CodeforcesLink = e.target.CodeforcesLink.value;
    const GFGLink = e.target.GFGLink.value;
    api
      .post("https://ggitsstudentsapi.vercel.app/leaderboard", {
        Name,
        Branch,
        Batch,
        LeetcodeLink,
        CodechefLink,
        CodeforcesLink,
        GFGLink,
      })
      .then((response) => {
        if (response.status == 200) {
          toast.success("New Person added successfully!", {
            theme: "colored",
            autoClose: 3000,
            position: "top-center",
          });
          Navigate("/leaderboard");
        } else {
          toast.error("Error occured while adding new person!", {
            theme: "colored",
            autoClose: 3000,
          });
          Navigate("/leaderboard");
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
            id="Name"
            name="Name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your Name"
            required
          />
        </div>
        <div className="mb-5">
          <input
            rows={5}
            type="text"
            name="Branch"
            id="Branch"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your Branch"
            required
          />
        </div>
        <div className="mb-5">
          <input
            rows={5}
            type="text"
            name="Batch"
            id="Batch"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Describe your Batch"
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            id="LeetcodeLink"
            name="LeetcodeLink"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your LeetcodeLink"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            id="CodechefLink"
            name="CodechefLink"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your CodechefLink"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            id="CodeforcesLink"
            name="CodeforcesLink"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your CodeforcesLink"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            id="GFGLink"
            name="GFGLink"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your GFGLink"
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

export default LeaderBoardPost;
