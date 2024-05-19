import React, { useEffect, useState } from "react";
import Header from "./Header";
import JobCard from "./helper/JobCard";
import { Button } from "@chakra-ui/react";
import getUserData from "../utils/getUserData";
import getJobs from "../utils/getJobs";
import { Link, useNavigate } from "react-router-dom";
import JobShimmer from "./shimmers/JobShimmer";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmPopup } from "primereact/confirmpopup";

const Jobs = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteData, setDeleteData] = useState(false);
  const [jobid, setJobid] = useState("");
  const user = useSelector((store) => store.user);
  const jobs = useSelector((store) => store.datas.jobsData);

  useEffect(() => {
    !jobs && getJobs(dispatch);
  }, []);

  const accept = () => {
    Navigate("/jobsdelete/" + jobid);
  };
  const reject = () => {
    toast.success("Deletion canceled");
  };

  return (
    <>
      <div className="container h-full bg-gray-100 max-w-full py-6 md:py-10 lg:py-14">
        <div className="mx-auto max-w-5xl px-4">
          <div className="space-y-6">
            {user != null && (user.role == "admin" || user.role == "jobs") ? (
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
              <p className="mx-auto max-w-[600px] text-center  text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Get the latest jobs & internship with easy apply link.
              </p>
              {!jobs ? (
                <JobShimmer />
              ) : (
                jobs.map((job, index) => (
                  <div key={index} className="relative   mb-4 ">
                    <JobCard
                      title={job.title}
                      description={job.description}
                      tag={job.tag}
                      link={job.link}
                      eligibility={job.eligibility}
                      uploadDate={String(job.createdAt).substring(0, 10)}
                    />
                    {user != null &&
                    (user.role == "admin" || user.role == "jobs") ? (
                      <div className="flex justify-end  ml-2   w-3/4">
                        <Link to={"/jobsedit/" + job._id}>
                          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          id="button"
                          onClick={() => {
                            setDeleteData(true);
                            setJobid(job._id);
                          }}
                          icon="pi pi-check"
                          label="confirm"
                        >
                          Delete
                        </Button>
                        <ConfirmPopup
                          target={document.getElementById("button")}
                          visible={deleteData}
                          onHide={() => setDeleteData(false)}
                          acceptClassName="bg-red-500 ml-2 p-1 px-3 border-none hover:bg-red-600"
                          rejectClassName="bg-blue-500 mr-2 p-1 px-3 border-none hover:bg-blue-600"
                          message="Are you sure you want to delete this job?"
                          icon="pi pi-info-circle"
                          accept={accept}
                          reject={reject}
                        />
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
