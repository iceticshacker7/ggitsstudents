import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import News from "./components/News";
import Jobs from "./components/Jobs";
import Resources from "./components/Resources";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Footer from "./components/Footer";
import axios from "axios";
import Header from "./components/Header";
import MainBody from "./components/MainBody";
import React from "react";
import CoreTeam from "./components/CoreTeam";
import PerModal from "./components/PerModal";
import NewsPost from "./components/sidecomponents/news/NewsPost";
import NewsDelete from "./components/sidecomponents/news/NewsDelete";
import NewsEdit from "./components/sidecomponents/news/NewsEdit";
import JobsPost from "./components/sidecomponents/jobs/JobsPost";
import JobsDelete from "./components/sidecomponents/jobs/JobsDelete";
import JobsEdit from "./components/sidecomponents/jobs/JobsEdit";
import Home from "./components/Home";
import ResourcesPost from "./components/sidecomponents/resources/ResourcesPost";
import ResourcesEdit from "./components/sidecomponents/resources/ResourcesEdit";
import ResourcesDelete from "./components/sidecomponents/resources/ResroucesDelete";
import Admincreate from "./components/sidecomponents/Admin/Admincreate";
import Adminedit from "./components/sidecomponents/Admin/Adminedit";
import Admindelete from "./components/sidecomponents/Admin/Admindelete";
import LeaderBoardEdit from "./components/sidecomponents/leaderboard/LeaderBoardEdit";
import LeaderBoardDelete from "./components/sidecomponents/leaderboard/LeaderBoardDelete";
import LeaderBoardPost from "./components/sidecomponents/leaderboard/LeaderBoardPost";
import { Provider } from "react-redux";
import appStore from "./reduxStore/mainStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getNews from "./utils/getNews";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <Header />
        <Outlet />
        <Footer />
        {/* <PerModal /> */}
        <ToastContainer />
      </Provider>
    </>
  );
};

export default App;
