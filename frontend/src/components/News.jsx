import React, { useState, useEffect } from "react";
import { Link, Navigate, json, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Card from "./helper/Cards";
import { Button } from "@chakra-ui/react";
import getUserData from "../utils/getUserData";
import getNews from "../utils/getNews";

const News = () => {
  const user = getUserData();
  const news = getNews();

  return (
    <>
      <Navbar />
      <div className="flex px-1 h-10  w-full justify-end">
        {user.role == "admin" || user.role == "news" ? (
          <Link to={"/newspost"}>
            <Button className="bg-green-100 text-md font-bold rounded-lg border border-black round-lg p-3 ">
              New News
            </Button>
          </Link>
        ) : (
          <Button></Button>
        )}
      </div>
      {news.map((newss) => {
        return (
          <div key={newss._id}>
            <Link to={"/news/" + newss._id}>
              <Card
                title={newss.title}
                descrition={newss.description}
                tag={newss.tag}
                link={newss.link}
              />
            </Link>
            <div className="flex justify-end p-0 m-0">
              {user.role == "admin" || user.role == "news" ? (
                <Link to={"/newsedit/" + newss._id}>
                  <Button className="bg-blue-300 border border-black rounded-lg w-20 font-bold mx-3 p-1 my-1">
                    Edit
                  </Button>
                </Link>
              ) : (
                <Button></Button>
              )}

              {user.role == "admin" || user.role == "news" ? (
                <Link to={"/newsdelete/" + newss._id}>
                  <Button className="bg-red-300 border border-black rounded-lg w-20 font-bold mx-3 p-1 my-1 right-0">
                    Delete
                  </Button>
                </Link>
              ) : (
                <Button></Button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default News;
