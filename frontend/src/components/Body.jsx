import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_API_OPTIONS } from "../utils/constant";
import Navbar from "./Navbar";
import getUserData from "../utils/getUserData";

const Body = () => {
  const user = getUserData();

  return (
    <>
      <Navbar />
      {user == "" ? (
        <h1>MAIN HOME PAGE</h1>
      ) : (
        <h1>Verified user logged in {user.role}</h1>
      )}
    </>
  );
};

export default Body;
