import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header";
import getUserData from "../../../utils/getUserData";
import getNews from "../../../utils/getNews";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addJobs } from "../../../reduxStore/dataSlice";

const JobsEdit = () => {
  const Navigate = useNavigate();
  const { jobid } = useParams();
  const [user, setUser] = useState("");
  const [fileteredData, setFilteredData] = useState([]);
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

  const getFilteredData = async () => {
    const datas = await axios.get("https://ggitsstudentsapi.vercel.app/jobs");
    datas.data.map((data) => {
      if (data._id == jobid) {
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
    const title = e.target.title.value;
    const description = e.target.description.value;
    const tag = e.target.tag.value;
    const eligibility = e.target.eligibility.value;
    const link = e.target.link.value;
    api
      .put("https://ggitsstudentsapi.vercel.app/jobs/" + jobid, {
        title,
        description,
        tag,
        eligibility,
        link,
      })
      .then((response) => {
        if (response.status == 200) {
          const newdata = {
            title: title,
            description: description,
            tag: tag,
            link: link,
            eligibility: eligibility,
          };
          toast.success("Job edited successfully!", {
            theme: "colored",
            autoClose: 3000,
            position: "top-center",
          });
          const myArray = [];
          jobs.map((jobs) => {
            if (jobs._id == response.data._id) {
              myArray.push(newdata);
            } else myArray.push(jobs);
          });
          dispatch(addJobs(myArray));
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
            id="title"
            name="title"
            defaultValue={fileteredData.title}
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
            defaultValue={fileteredData.description}
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
            defaultValue={fileteredData.tag}
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
            defaultValue={fileteredData.eligibility}
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
            defaultValue={fileteredData.link}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your link"
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

export default JobsEdit;
