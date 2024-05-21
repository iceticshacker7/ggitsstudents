import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header";
import getUserData from "../../../utils/getUserData";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addJobs } from "../../../reduxStore/dataSlice";

const JobsPost = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const jobs = useSelector((store) => store.datas.jobsData);
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
      if (data.data.role == "admin" || data.data.role == "jobs") {
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
    const title = e.target.title.value;
    const description = e.target.description.value;
    const tag = e.target.tag.value;
    const eligibility = e.target.eligibility.value;
    const link = e.target.link.value;
    api
      .post("https://ggitsstudentsapi.vercel.app/jobs", {
        title,
        description,
        tag,
        eligibility,
        link,
      })
      .then((response) => {
        const d = new Date();
        const month = d.getUTCMonth() + 1;
        const date = d.getFullYear() + "-0" + month + "-" + d.getDate();
        const newdata = {
          createdAt: date,
          title: title,
          description: description,
          tag: tag,
          link: link,
          eligibility: eligibility,
        };
        console.log(newdata);
        if (response.status == 200) {
          toast.success("Job posted successfully!", {
            theme: "colored",
            autoClose: 3000,
            position: "top-center",
          });
          const myArray = [];
          jobs.map((jobs) => {
            myArray.push(jobs);
          });
          myArray.unshift(newdata);
          dispatch(addJobs(myArray));
          Navigate("/jobs");
        } else {
          toast.error("Error occured while posting job", {
            theme: "colored",
            autoClose: 3000,
          });
          Navigate("/jobs");
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
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center">
      <div className="relative w-full h-[86vh] max-w-lg rounded-lg my-3 bg-slate-50 p-6 shadow-lg sm:p-5">
        <div className="flex justify-center font-bold text-xl">
          <h1 className="underline">JOB POST</h1>
        </div>
        <form
          className="space-y-4 max-w-sm h-full  mx-auto"
          onSubmit={handleOnSubmit}
        >
          <div className="space-y-4">
            <div className="space-y-1">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="title"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full h-10 bg-white border border-black rounded-md px-3 py-2 text-sm placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                id="title"
                name="title"
                type="text"
                required
                placeholder="Enter your Title"
              />
            </div>
            <div className="space-y-1">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="description"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full h-24 bg-white border border-black rounded-md px-3 py-2 text-sm placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                id="description"
                name="description"
                required
                placeholder="Enter your description"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium leading-none" htmlFor="tag">
                Tag <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full h-10 bg-white border border-black rounded-md px-3 py-2 text-sm placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                id="tag"
                name="tag"
                type="text"
                required
                placeholder="Enter your tag"
              />
            </div>
            <div className="space-y-1">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="eligibility"
              >
                Eligible Batch <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full h-10 bg-white border border-black rounded-md px-3 py-2 text-sm placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                id="eligibility"
                name="eligibility"
                type="text"
                required
                placeholder="Enter eligible batch"
              />
            </div>
            <div className="space-y-1">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="link"
              >
                Link <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full h-10 bg-white border border-black rounded-md px-3 py-2 text-sm placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                id="link"
                name="link"
                type="text"
                required
                placeholder="Enter your link"
              />
            </div>
          </div>
          <button
            className="w-full h-10 bg-blue-500 text-white rounded-md flex items-center justify-center text-sm font-medium hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            type="submit"
          >
            POST
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobsPost;
