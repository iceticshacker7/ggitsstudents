import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header";
import getUserData from "../../../utils/getUserData";
import getNews from "../../../utils/getNews";
import { toast } from "react-toastify";

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
          toast.success("Person edited successfully!", {
            theme: "colored",
            autoClose: 3000,
            position: "top-center",
          });
          Navigate("/leaderboard");
        } else {
          toast.error("Error occured while editing Person!", {
            theme: "colored",
            autoClose: 3000,
          });
          Navigate("/leaderboard");
        }
      })
      .catch((error) => {
        console.log(error);
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
      <div className="relative w-full h-[85vh] max-w-lg rounded-lg my-3 bg-slate-50 px-4 py-1 shadow-lg">
        <div className="flex justify-center font-bold text-xl">
          <h1 className="underline">PERSON EDIT</h1>
        </div>
        <form onSubmit={handleOnSubmit} className="space-y-3">
          <div className="mb-5">
            <label htmlFor="Name" className="text-sm font-medium leading-none">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="Name"
              name="Name"
              defaultValue={fileteredData.Name}
              className="w-full h-10 bg-white border border-black rounded-md px-3 py-0 text-sm placeholder-text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Enter your Name"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="Branch"
              className="text-sm font-medium leading-none"
            >
              Branch <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="Branch"
              name="Branch"
              defaultValue={fileteredData.Branch}
              className="w-full h-10 bg-white border border-black rounded-md px-3 py-0 text-sm placeholder-text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Enter your Branch"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="Batch" className="text-sm font-medium leading-none">
              Batch
            </label>
            <input
              type="text"
              id="Batch"
              name="Batch"
              defaultValue={fileteredData.Batch}
              className="w-full h-10 bg-white border border-black rounded-md px-3 py-0 text-sm placeholder-text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Describe your Batch"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="LeetcodeLink"
              className="text-sm font-medium leading-none"
            >
              Leetcode Link <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="LeetcodeLink"
              name="LeetcodeLink"
              defaultValue={fileteredData.LeetcodeLink}
              className="w-full h-10 bg-white border border-black rounded-md px-3 py-0 text-sm placeholder-text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Enter your Leetcode Link"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="CodechefLink"
              className="text-sm font-medium leading-none"
            >
              Codechef Link <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="CodechefLink"
              name="CodechefLink"
              defaultValue={fileteredData.CodechefLink}
              className="w-full h-10 bg-white border border-black rounded-md px-3 py-0 text-sm placeholder-text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Enter your Codechef Link"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="CodeforcesLink"
              className="text-sm font-medium leading-none"
            >
              Codeforces Link <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="CodeforcesLink"
              name="CodeforcesLink"
              defaultValue={fileteredData.CodeforcesLink}
              className="w-full h-10 bg-white border border-black rounded-md px-3 py-0 text-sm placeholder-text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Enter your Codeforces Link"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="GFGLink"
              className="text-sm font-medium leading-none"
            >
              GFG Link <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="GFGLink"
              name="GFGLink"
              defaultValue={fileteredData.GFGLink}
              className="w-full h-10 bg-white border border-black rounded-md px-3 py-0 text-sm placeholder-text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Enter your GFG Link"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full h-10 bg-blue-500 text-white rounded-md flex items-center justify-center text-sm font-medium hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            EDIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsEdit;
