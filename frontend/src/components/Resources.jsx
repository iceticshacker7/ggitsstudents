import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import getUserData from "../utils/getUserData";
import getResources from "../utils/getResources";
import { Button } from "@chakra-ui/react";
import Header from "./Header";
import ResourcesCard from "./helper/ResourcesCard";
import ResourceShimmer from "./shimmers/ResourceShimmer";
const Resources = () => {
  const Navigate = useNavigate();
  const [shimdata, setShimData] = useState([]);
  const user = getUserData([]);
  const resources = getResources([]);

  useEffect(() => {
    setShimData(resources); // This will log the previous state, not the updated one
  }, [resources]); // Include data in the dependency array to trigger useEffect when data changes

  if (!resources) return;

  return (
    <>
      <Header />
      <div className="container bg-gray-100 flex max-w-full justify-center h-full py-6 md:py-10 lg:py-14">
        <div className="mx-auto max-w-full">
          <div className="space-y-6">
            {user.role == "admin" || user.role == "resources" ? (
              <Link to="/resourcespost">
                <div className="flex justify-end mb-4">
                  <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2  px-4 rounded ml-auto">
                    New Resource
                  </Button>
                </div>
              </Link>
            ) : null}
            <div className="space-y-2 ">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center md:text-5xl">
                BEST RESOURCES TO LEARN
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed text-center lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Get yourself equipped with latest technologies in the industry.
              </p>
              {!shimdata.length ? (
                <ResourceShimmer />
              ) : (
                shimdata.map((resource, index) => (
                  <div key={index} className="flex flex-col ">
                    <div className="w-full ">
                      <ResourcesCard
                        title={resource.title}
                        description={resource.description}
                        moredescription={resource.moredescription}
                        tag={resource.tag}
                        link={resource.link}
                      />
                    </div>
                    {user.role === "admin" || user.role === "resources" ? (
                      <div className="flex mt-2 ml-auto">
                        <Link to={"/resourcesedit/" + resource._id}>
                          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                          </Button>
                        </Link>
                        <Link to={"/resourcesdelete/" + resource._id}>
                          <Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
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

export default Resources;
