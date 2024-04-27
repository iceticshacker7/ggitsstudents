import React, { useEffect, useState } from "react";
import Component from "./Component";
import Header from "./Header";
import getLeaderboard from "../utils/getLeaderboard";
import Shimmerui from "./sidecomponents/Shimmerui";
import getUserData from "../utils/getUserData";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function MainBody() {
  const [shimdata, setShimData] = useState([]);
  const user = getUserData([]);
  const data = getLeaderboard([]);

  useEffect(() => {
    setShimData(data); // This will log the previous state, not the updated one
  }, [data]); // Include data in the dependency array to trigger useEffect when data changes

  return (
    <>
      <Header />
      <div
        className="container bg-gray-100 py-6 md:py-10 lg:py-14"
        data-id="21"
      >
        <div className="mx-auto max-w-6xl px-4" data-id="22">
          <div className="space-y-6" data-id="23">
            {user.role == "admin" || user.role == "leaderboard" ? (
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
              </p>
            </div>
            <div
              className="mx-auto grid max-w-3xl items-stretch justify-center gap-4"
              data-id="27"
            >
              {!shimdata.length ? (
                <Shimmerui />
              ) : (
                shimdata.map((ldata, index) => (
                  <div key={index} className="w-full">
                    <Component
                      name={ldata.Name}
                      rank={ldata.Rank}
                      branch={ldata.Branch}
                      batch={ldata.Batch}
                      score={ldata.Score}
                      rating={ldata.Rating}
                    />
                    {user.role == "admin" || user.role == "leaderboard" ? (
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainBody;
