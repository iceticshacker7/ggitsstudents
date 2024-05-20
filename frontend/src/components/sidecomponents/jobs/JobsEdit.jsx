import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addJobs } from "../../../reduxStore/dataSlice";

const JobsEdit = () => {
  const Navigate = useNavigate();
  const { jobid } = useParams();
  const [user, setUser] = useState("");
  const [filteredData, setFilteredData] = useState({});
  const dispatch = useDispatch();
  const jobs = useSelector((store) => store.datas.jobsData);
  const api = axios.create({
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });

  const getUserData = async () => {
    try {
      const data = await api.get("https://ggitsstudentsapi.vercel.app/login");
      if (data.data.role === "admin" || data.data.role === "jobs") {
        setUser(data.data.role);
      } else {
        toast.warn("Access Denied!", {
          theme: "colored",
          autoClose: 3000,
        });
        Navigate("/");
      }
    } catch (error) {
      toast.warn("Access Denied!", {
        theme: "colored",
        autoClose: 3000,
      });
      Navigate("/");
    }
  };

  const getFilteredData = async () => {
    try {
      const response = await axios.get(
        "https://ggitsstudentsapi.vercel.app/jobs"
      );
      const data = response.data.find((data) => data._id === jobid);
      if (data) {
        setFilteredData(data);
      }
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  useEffect(() => {
    getUserData();
    getFilteredData();
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const tag = e.target.tag.value;
    const eligibility = e.target.eligibility.value;
    const link = e.target.link.value;
    api
      .put(`https://ggitsstudentsapi.vercel.app/jobs/${jobid}`, {
        title,
        description,
        tag,
        eligibility,
        link,
      })
      .then((response) => {
        if (response.status === 200) {
          const newdata = {
            _id: jobid,
            title,
            description,
            tag,
            link,
            eligibility,
          };
          toast.success("Job edited successfully!", {
            theme: "colored",
            autoClose: 3000,
            position: "top-center",
          });
          const updatedJobs = jobs.map((job) => {
            return job._id === jobid ? newdata : job;
          });
          dispatch(addJobs(updatedJobs));
          Navigate("/jobs");
        } else {
          toast.error("Error while editing job!", {
            theme: "colored",
            autoClose: 3000,
          });
          Navigate("/jobs");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
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
      <div className="relative w-full h-[87vh] max-w-lg rounded-lg my-1 bg-slate-300 p-3 py-2 shadow-lg ">
        <div className="flex justify-center font-bold text-xl ">
          <h1 className="underline">EDIT JOB</h1>
        </div>
        <form className="space-y-4 h-full  mx-auto" onSubmit={handleOnSubmit}>
          <div className="space-y-1">
            <label htmlFor="title" className="text-sm font-medium leading-none">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={filteredData.title}
              className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your Title"
              required
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="description"
              className="text-sm font-medium leading-none"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              id="description"
              name="description"
              defaultValue={filteredData.description}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your description"
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="tag" className="text-sm font-medium leading-none">
              Tag <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="tag"
              name="tag"
              defaultValue={filteredData.tag}
              className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your tag"
              required
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="eligibility"
              className="text-sm font-medium leading-none"
            >
              Eligible Batch <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="eligibility"
              name="eligibility"
              defaultValue={filteredData.eligibility}
              className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              placeholder="Enter eligible batch"
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="link" className="text-sm font-medium leading-none">
              Link <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="link"
              name="link"
              defaultValue={filteredData.link}
              className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your link"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full h-10 bg-blue-500 text-white rounded-md flex items-center justify-center text-sm font-medium hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none"
          >
            EDIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobsEdit;
