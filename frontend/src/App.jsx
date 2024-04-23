import React from "react";
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "../src/components/Body";
import Leaderboard from "./components/Leaderboard";
import News from "./components/News";
import Jobs from "./components/Jobs";
import Resources from "./components/Resources";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import axios from "axios";
import NewNews from "./components/sidecomponents/NewNews";
import ViewNews from "./components/sidecomponents/ViewNews";
import EditNews from "./components/sidecomponents/EditNews";
import DeleteNews from "./components/sidecomponents/DeleteNews";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
  },
  {
    path: "/news",
    element: <News />,
  },
  {
    path: "/news/:newsid",
    element: <ViewNews />,
  },
  {
    path: "/newspost",
    element: <NewNews />,
  },
  {
    path: "/newsedit/:newsid",
    element: <EditNews />,
  },
  {
    path: "/newsdelete/:newsid",
    element: <DeleteNews />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/resources",
    element: <Resources />,
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
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/footer",
    element: <Footer />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

export default App;
