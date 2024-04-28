import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header";
import getUserData from "../../../utils/getUserData";
import getNews from "../../../utils/getNews";

const NewsEdit = () => {
  const Navigate = useNavigate();
  const { personid } = useParams();
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
      if (data.data.role == "admin" || data.data.role == "leaderboard") {
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
    const datas = await axios.get(
      "https://ggitsstudentsapi.vercel.app/leaderboard/getrating",
      { withCredentials: true }
    );
    datas.data.map((data) => {
      if (data._id == personid) {
        setFilteredData(data);
      }
    });
  };

  useEffect(() => {
    getUserData();
    getFilteredData();
  }, []);

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
      .put("https://ggitsstudentsapi.vercel.app/leaderboard/" + personid, {
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
          console.log(response);
          alert("Person edited successfully!");
          Navigate("/leaderboard");
        } else {
          alert("Error occured while posting news!");
          Navigate("/leaderboard");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 401) {
          alert("Access Denied");
          Navigate("/");
        }
      });
  };

  return (
    <div>
      <Header />
      <form className="max-w-sm mx-auto" onSubmit={handleOnSubmit}>
        <div className="mb-5">
          <input
            type="text"
            id="Name"
            name="Name"
            defaultValue={fileteredData.Name}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Name"
            required
          />
        </div>
        <div className="mb-5">
          <textarea
            rows={5}
            type="text"
            name="Branch"
            id="Branch"
            defaultValue={fileteredData.Branch}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your Branch"
            required
          />
        </div>
        <div className="mb-5">
          <textarea
            rows={5}
            type="text"
            name="Batch"
            id="Batch"
            defaultValue={fileteredData.Batch}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your Batch"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            id="LeetcodeLink"
            name="LeetcodeLink"
            defaultValue={fileteredData.LeetcodeLink}
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
            defaultValue={fileteredData.CodechefLink}
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
            defaultValue={fileteredData.CodeforcesLink}
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
            defaultValue={fileteredData.GFGLink}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your GFGLink"
            required
          />
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

export default NewsEdit;
