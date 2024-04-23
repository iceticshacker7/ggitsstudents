import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import getUserData from "../utils/getUserData";
import getJobs from "../utils/getJobs";
import { Button } from "@chakra-ui/react";
import JobCard from "./helper/JobCard";

const Jobs = () => {
  const user = getUserData();
  const jobs = getJobs();

  return (
    <>
      <Navbar />
      <div className="flex px-1 h-10  w-full justify-end">
        {user.role == "admin" || user.role == "jobs" ? (
          <Button className="bg-green-100 text-md font-bold rounded-lg border border-black round-lg p-3 ">
            Job News
          </Button>
        ) : (
          <Button></Button>
        )}
      </div>
      {jobs.map((jobss) => {
        return (
          <div key={jobss._id}>
            <JobCard
              title={jobss.title}
              descrition={jobss.description}
              tag={jobss.tag}
              link={jobss.link}
              eligibility={jobss.eligibility}
            />
            <div className="flex justify-end p-0 m-0">
              {user.role == "admin" || user.role == "jobs" ? (
                <Button className="bg-blue-300 border border-black rounded-lg w-20 font-bold mx-3 p-1 my-1">
                  Edit
                </Button>
              ) : (
                <Button></Button>
              )}
              {user.role == "admin" || user.role == "jobs" ? (
                <Button className="bg-red-300 border border-black rounded-lg w-20 font-bold mx-3 p-1 my-1 right-0">
                  Delete
                </Button>
              ) : (
                <Button></Button>
              )}
            </div>
          </div>
        );
      })}
      {user.role == "admin" || user.role == "jobs" ? (
        <h1>Jobs page for {user.role} role </h1>
      ) : (
        <h1>Job page</h1>
      )}
    </>
  );
};

export default Jobs;
