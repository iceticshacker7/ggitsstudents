// import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   // <React.StrictMode>
//   <>
//     <RouterProvider router={appRouter} />
//     <App />
//   </>
//   // </React.StrictMode>,
// );

import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  BrowserRouter,
  Outlet,
  Route,
  Router,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
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
import getNews from "./utils/getNews";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <MainBody />,
      },
      {
        path: "/leaderboard",
        element: <MainBody />,
      },
      {
        path: "/leaderboardpost",
        element: <LeaderBoardPost />,
      },
      {
        path: "/leaderboardedit/:personid",
        element: <LeaderBoardEdit />,
      },
      //
      {
        path: "/leaderboarddelete/:personid",
        element: <LeaderBoardDelete />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/newspost",
        element: <NewsPost />,
      },
      {
        path: "/newsedit/:newsid",
        element: <NewsEdit />,
      },
      {
        path: "/newsdelete/:newsid",
        element: <NewsDelete />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/jobspost",
        element: <JobsPost />,
      },
      {
        path: "/jobsedit/:jobid",
        element: <JobsEdit />,
      },
      {
        path: "/jobsdelete/:jobid",
        element: <JobsDelete />,
      },
      {
        path: "/resources",
        element: <Resources />,
      },
      {
        path: "/resourcespost",
        element: <ResourcesPost />,
      },
      {
        path: "/resourcesdelete/:resourceid",
        element: <ResourcesDelete />,
      },
      {
        path: "/resourcesedit/:resourceid",
        element: <ResourcesEdit />,
      },
      {
        path: "/hiddenlogin",
        element: <Login />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/admin/usercreate",
        element: <Admincreate />,
      },
      {
        path: "/admin/useredit/:userid",
        element: <Adminedit />,
      },
      {
        path: "/admin/userdelete/:userid",
        element: <Admindelete />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/coreteam",
        element: <CoreTeam />,
      },
    ],
  },
]);

// const Routing = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<App />}>
//         <Route index={true} element={<MainBody />}></Route>
//         <Route path="/news" element={<News />}></Route>
//       </Route>
//     </Routes>
//   );
// };

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <>
    <RouterProvider router={appRouter} />
    {/* <BrowserRouter>
      <Routing />
    </BrowserRouter> */}
  </>
  // </React.StrictMode>,
);
