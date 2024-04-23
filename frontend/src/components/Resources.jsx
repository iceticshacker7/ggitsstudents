import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import getUserData from "../utils/getUserData";
import getResources from "../utils/getResources";
import { Button } from "@chakra-ui/react";
import Card from "./helper/Cards";
const Resources = () => {
  const user = getUserData();
  const resources = getResources();

  return (
    <>
      <Navbar />
      <div className="flex px-1 h-10  w-full justify-end">
        {user.role == "admin" || user.role == "resources" ? (
          <Button className="bg-green-100 text-md font-bold rounded-lg border border-black round-lg p-3 ">
            New Resource
          </Button>
        ) : (
          <Button></Button>
        )}
      </div>
      {resources.map((resource) => {
        return (
          <div key={resource._id}>
            <Card
              title={resource.title}
              descrition={resource.description}
              tag={resource.tag}
              link={resource.link}
            />
            <div className="flex justify-end p-0 m-0">
              {user.role == "admin" || user.role == "resources" ? (
                <Button className="bg-blue-300 border border-black rounded-lg w-20 font-bold mx-3 p-1 my-1">
                  Edit
                </Button>
              ) : (
                <Button></Button>
              )}
              {user.role == "admin" || user.role == "resources" ? (
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
      {user.role == "admin" || user.role == "resources" ? (
        <h1>resources page for {user.role} role </h1>
      ) : (
        <h1>resources page</h1>
      )}
    </>
  );
};

export default Resources;
