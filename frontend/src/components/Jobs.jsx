import React from "react";
import Header from "./Header";
import JobCard from "./helper/JobCard";
import { Button } from "@chakra-ui/react";
import getUserData from "../utils/getUserData";
import getJobs from "../utils/getJobs";
import { Link } from "react-router-dom";

const Jobs = () => {
  const user = getUserData([]);
  const jobs = getJobs([]);

  return (
    <>
      <Header />
      <div className="container bg-gray-100 py-6 md:py-10 lg:py-14">
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
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                JOBS AND INTERNSHIPS
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Get the latest jobs & internship with easy apply link.
              </p>
              {jobs.map((job, index) => (
                <div key={index} className="relative mb-4">
                  <JobCard
                    title={job.title}
                    description={job.description}
                    tag={job.tag}
                    link={job.link}
                    eligibility={job.eligibility}
                    Batch={job.Batch}
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
