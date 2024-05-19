import React, { useEffect, useState } from "react";
import Component from "./Component";
import Header from "./Header";
import getLeaderboard from "../utils/getLeaderboard";
import Shimmerui from "./sidecomponents/Shimmerui";
import getUserData from "../utils/getUserData";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import PerModal from "./PerModal";

// import func from "./temp";

function MainBody() {
  // const [shimdata, setShimData] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const data = useSelector((store) => store.datas.leaderboardData);

  const toggleRegisterForm = () => {
    setShowRegister(!showRegister);
  };

  useEffect(() => {
    !data && getLeaderboard(dispatch);
  }, []);

  return (
    <>
      <div
        className="container max-w-full bg-gray-100 py-6  md:py-10 lg:py-14"
        data-id="21"
      >
        <div className="max-w-full  px-4" data-id="22">
          <div className="space-y-6" data-id="23">
            {user != null &&
            (user.role == "admin" || user.role == "leaderboard") ? (
              <div className="flex justify-end  mb-4 mr-64">
                <Link to={"/leaderboardpost"}>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    New Person
                  </button>
                </Link>
              </div>
            ) : null}
            <div className="space-y-2 text-center" data-id="24">
              <h1
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                data-id="25"
              >
                GGITS Coding Club
              </h1>
              <p
                className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
                data-id="26"
              >
                Master the art of coding. Compete with your peers.
                <h1>
                  Join the leaderboard :{" "}
                  <button
                    onClick={toggleRegisterForm}
                    type="button"
                    class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm p-1 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    Click here
                  </button>
                </h1>
              </p>
            </div>
            <div
              className="mx-auto max-w-2/4 sm:flex sm:flex-col sm:w-1/3 sm:max-w-full  items-stretch justify-center gap-4 "
              data-id="27"
            >
              {!data ? (
                <Shimmerui />
              ) : (
                data.map((ldata, index) => (
                  <div key={index} className="w-full   ">
                    <Component
                      name={ldata.Name}
                      rank={ldata.Rank}
                      branch={ldata.Branch}
                      batch={ldata.Batch}
                      score={ldata.Score}
                      rating={ldata.Rating}
                    />
                    {user != null &&
                    (user.role == "admin" || user.role == "leaderboard") ? (
                      <div className="flex justify-end">
                        <Link to={"/leaderboardedit/" + ldata._id}>
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                            Edit
                          </button>
                        </Link>
                        <Link to={"/leaderboarddelete/" + ldata._id}>
                          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                          </button>
                        </Link>
                      </div>
                    ) : (
                      <Button></Button>
                    )}
                  </div>
                ))
              )}
              {showRegister && <PerModal />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainBody;
