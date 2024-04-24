import React, { useEffect, useState } from "react";
import Header from "./Header";
import NewsCard from "./helper/NewsCard";
import { Button } from "@chakra-ui/react";
import getUserData from "../utils/getUserData";
import getNews from "../utils/getNews";
import { Link, useNavigate } from "react-router-dom";

const News = () => {
  const Navigate = useNavigate();
  const user = getUserData([]);
  const news = getNews([]);

  if (!news) return;

  return (
    <>
      <Header />
      <div className="container bg-gray-100 py-6 h-full flex md:py-10 lg:py-14">
        <div className="mx-auto max-w-[76rem]">
          <div className="space-y-6">
            {user.role == "admin" || user.role == "news" ? (
              <Link to="/newspost">
                <div className="flex justify-endmb-4">
                  <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2  px-4 rounded ml-auto">
                    New News
                  </Button>
                </div>
              </Link>
            ) : (
             null
            )}
            <div className="space-y-2 ">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
                TECH NEWS AND UPDATES
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed text-center lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Stay connected to the latest news in the industry.
              </p>
              {news.map((newsItem, index) => (
                <div key={index} className="flex flex-col">
                  <div className="w-full">
                    <NewsCard
                      title={newsItem.title}
                      description={newsItem.description}
                      tag={newsItem.tag}
                      link={newsItem.link}
                    />
                  </div>
                  {user.role === "admin" || user.role === "news" ? (
                    <div className="flex mt-2 ml-auto">
                      <Link to={"/newsedit/" + newsItem._id}>
                        <Button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleEditNews(index)}
                        >
                          Edit
                        </Button>
                      </Link>
                      <Link to={"/newsdelete/" + newsItem._id}>
                        <Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
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

export default News;
