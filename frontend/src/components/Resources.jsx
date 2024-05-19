import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import getUserData from "../utils/getUserData";
import getResources from "../utils/getResources";
import { Button } from "@chakra-ui/react";
import Header from "./Header";
import ResourcesCard from "./helper/ResourcesCard";
import ResourceShimmer from "./shimmers/ResourceShimmer";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmPopup } from "primereact/confirmpopup";
const Resources = () => {
  const Navigate = useNavigate();
  const [shimdata, setShimData] = useState([]);
  const [deleteData, setDeleteData] = useState(false);
  const [resourceid, setResourceid] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const resources = useSelector((store) => store.datas.resourcesData);

  useEffect(() => {
    !resources && getResources(dispatch);
  }, []);

  const accept = () => {
    Navigate("/resourcesdelete/" + resourceid);
  };
  const reject = () => {
    toast.success("Deletion canceled");
  };

  return (
    <>
      <div className="container bg-gray-100 flex max-w-full justify-center h-full py-6 md:py-10 lg:py-14">
        <div className="mx-auto max-w-full">
          <div className="space-y-6">
            {user != null &&
            (user.role == "admin" || user.role == "resources") ? (
              <Link to="/resourcespost">
                <div className="flex justify-end mb-4">
                  <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2  px-4 rounded ml-auto">
                    New Resource
                  </Button>
                </div>
              </Link>
            ) : null}
            <div className="space-y-2 ">
              <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl text-center md:text-5xl">
                BEST RESOURCES TO LEARN
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed text-center lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Get yourself equipped with latest technologies in the industry.
              </p>
              {!resources ? (
                <ResourceShimmer />
              ) : (
                resources.map((resource, index) => (
                  <div key={index} className="flex flex-col  ">
                    <div className="w-full  mt-6 ">
                      <ResourcesCard
                        title={resource.title}
                        description={resource.description}
                        moredescription={resource.moredescription}
                        tag={resource.tag}
                        link={resource.link}
                      />
                    </div>
                    {user != null &&
                    (user.role == "admin" || user.role == "resources") ? (
                      <div className="flex  ml-auto 100  mr-6">
                        <Link to={"/resourcesedit/" + resource._id}>
                          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                          id="button"
                          onClick={() => {
                            setDeleteData(true);
                            setResourceid(resource._id);
                          }}
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

export default Resources;
