import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import getUserData from "../utils/getUserData";
// import getLeaderboard from "../../../backend/src/models/getLeaderboard";

const Leaderboard = () => {
  // const user = getUserData();

  return (
    <>
      <Headers />
      {user.role == "admin" || user.role == "leaderboard" ? (
        <h1>leaderboard page for {user.role} role </h1>
      ) : (
        <h1>leaderboard page</h1>
      )}
    </>
  );
};

export default Leaderboard;
