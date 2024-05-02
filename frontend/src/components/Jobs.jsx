import React, { useEffect, useState } from "react";
import Header from "./Header";
import JobCard from "./helper/JobCard";
import { Button } from "@chakra-ui/react";
import getUserData from "../utils/getUserData";
import getJobs from "../utils/getJobs";
import { Link, useNavigate } from "react-router-dom";
import JobShimmer from "./shimmers/JobShimmer";

const Jobs = () => {
  const Navigate = useNavigate();
  const [shimdata, setShimData] = useState([]);
  const user = getUserData([]);
  const jobs = getJobs([]);

  useEffect(() => {
    setShimData(jobs); // This will log the previous state, not the updated one
  }, [jobs]); // Include data in the dependency array to trigger useEffect when data changes

  return (
    <>
      <Header />
      <div className="container h-full bg-gray-100 max-w-full py-6 md:py-10 lg:py-14">
        <div className="mx-auto max-w-5xl px-4">
          <div className="space-y-6">
            {user.role === "admin" || user.role === "jobs" ? (
              <Link to="/jobspost">
                <div className="flex justify-end w-3/4 mb-4">
                  <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    New Job
                  </Button>
                </div>
              </Link>
            ) : null}
            <div className="space-y-2 ">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
                JOBS AND INTERNSHIPS
              </h1>
              <p className="mx-auto max-w-[600px] text-center text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Get the latest jobs & internship with easy apply link.
              </p>
              {!shimdata.length ? (
                <JobShimmer />
              ) : (
                shimdata.map((job, index) => (
                  <div key={index} className="relative mb-4">
                    <JobCard
                      title={job.title}
                      description={job.description}
                      tag={job.tag}
                      link={job.link}
                      eligibility={job.eligibility}
                      uploadDate={String(job.createdAt).substring(0, 10)}
                    />
                    {user.role === "admin" || user.role === "jobs" ? (
                      <div className="flex justify-end mt-2  w-3/4">
                        <Link to={"/jobsedit/" + job._id}>
                          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                            Edit
                          </Button>
                        </Link>
                        <Link to={"/jobsdelete/" + job._id}>
                          <Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                          </Button>
                        </Link>
                      </div>
                    ) : null}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
