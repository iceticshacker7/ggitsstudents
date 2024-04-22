import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from '../src/components/Body'
import Leaderboard from './components/Leaderboard'
import News from './components/News'
import Jobs from './components/Jobs'
import Resources from './components/Resources'
import Admin from './components/Admin'
import Login from './components/Login'
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import axios from "axios"

const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body/>
    },
    {
      path: "/leaderboard",
      element: <Leaderboard/>
    },
    {
      path: "/news",
      element: <News/>
    },
    {
      path: "/jobs",
      element: <Jobs/>
    },
    {
      path: "/resources",
      element: <Resources/>
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
  ]);

  export default appRouter