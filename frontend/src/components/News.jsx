import React, { useEffect, useState } from "react";
import Header from "./Header";
import NewsCard from "./helper/NewsCard";
import { Button } from "@chakra-ui/react";
import getUserData from "../utils/getUserData";
import getNews from "../utils/getNews";
import NewsShimmer from "../components/shimmers/NewsShimmer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ConfirmPopup } from "primereact/confirmpopup";

const News = () => {
  const Navigate = useNavigate();
  const [deleteData, setDeleteData] = useState(false);
  const [newsid, setNewsid] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const news = useSelector((store) => store.datas.newsData);

  useEffect(() => {
    !news && getNews(dispatch);
  }, []);

  const accept = () => {
    Navigate("/newsdelete/" + newsid);
  };
  const reject = () => {
    toast.success("Deletion canceled");
  };

  return (
    <>
      <div className="container bg-gray-100 py-6 h-full max-w-full flex md:py-10 lg:py-14">
        <div className="mx-auto  sm:max-w-full">
          <div className="space-y-6">
            {user != null && (user.role == "admin" || user.role == "news") ? (
              <Link to="/newspost">
                <div className="flex justify-endmb- mr-5">
                  <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2  px-4 rounded ml-auto">
                    New News
                  </Button>
                </div>
              </Link>
            ) : null}
            <div className="space-y-2  ">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
                TECH NEWS AND UPDATES
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed text-center lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Stay connected to the latest news in the industry.
              </p>
              {!news ? (
                <NewsShimmer />
              ) : (
                news.map((newsItem, index) => (
                  <div key={index} className="flex flex-col bg  ">
                    <div className="w-full ">
                      <NewsCard
                        title={newsItem.title}
                        description={newsItem.description}
                        tag={newsItem.tag}
                        link={newsItem.link}
                        moredescription={newsItem.moredescription}
                        uploadDate={String(newsItem.createdAt).substring(0, 10)}
                      />
                    </div>
                    {user != null &&
                    (user.role == "admin" || user.role == "news") ? (
                      <div className="flex ml-auto mr-5">
                        <Link to={"/newsedit/" + newsItem._id}>
                          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                          id="button"
                          onClick={() => {
                            setDeleteData(true);
                            setNewsid(newsItem._id);
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
                          // className="bg-black text-white"
                          message="Are you sure you want to this news?"
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

export default News;
