import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const dataSlice = createSlice({
  name: "datas",
  initialState: {
    leaderboardData: null,
    newsData: null,
    resourcesData: null,
    jobsData: null,
    usersData: null,
  },

  reducers: {
    addLeaderboard: (state, action) => {
      state.leaderboardData = action.payload;
    },

    addNews: (state, action) => {
      state.newsData = action.payload;
    },
    addResources: (state, action) => {
      state.resourcesData = action.payload;
    },
    addJobs: (state, action) => {
      state.jobsData = action.payload;
    },
    addUsersdata: (state, action) => {
      state.usersData = action.payload;
    },
  },
});

export const { addLeaderboard, addNews, addJobs, addResources, addUsersdata } =
  dataSlice.actions;

export default dataSlice.reducer;
