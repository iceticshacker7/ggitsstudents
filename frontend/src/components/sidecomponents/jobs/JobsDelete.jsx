import React, { useEffect, useState } from "react";
import Header from "../../Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addJobs } from "../../../reduxStore/dataSlice";

const JobsDelete = () => {
  const jobs = useSelector((store) => store.datas.jobsData);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { jobid } = useParams();
  const [user, setUser] = useState("");
  const [success, setSuccess] = useState([]);

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
    if (user == "admin" || user == "jobs") {
      deleteJob();
      Navigate("/jobs");
      return;
    }
  });

  const deleteJob = async () => {
    api
      .delete("https://ggitsstudentsapi.vercel.app/jobs/" + jobid)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          toast.success("Job deleted successfully!", {
            theme: "colored",
            autoClose: 3000,
            position: "top-center",
          });
          const myArray = [];
          jobs.map((job) => {
            if (job._id != response.data._id) myArray.push(job);
          });
          dispatch(addJobs(myArray));
          Navigate("/jobs");
        } else {
          toast.error("Error while deleting job!", {
            theme: "colored",
            autoClose: 3000,
          });
          Navigate("/jobs");
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

  return <></>;
};

export default JobsDelete;
