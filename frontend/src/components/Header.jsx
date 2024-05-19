import React, { useEffect, useState } from "react";
import getUserData from "../utils/getUserData";
import mainlogo from "../assets/mainlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../reduxStore/userSlice";

function Header() {
  // const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [role, setRole] = useState("");

  const api = axios.create({
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });

  const getUserData = async () => {
    try {
      const data = await api.get("https://ggitsstudentsapi.vercel.app/login");
      const user = data.data;
      const { username, role } = user;
      dispatch(
        addUser({
          username: username,
          role: role,
        })
      );
    } catch (error) {
      return;
    }
  };
  const user = useSelector((store) => store.user);

  useEffect(() => {
    getUserData();
    if (user != null) setRole(user.role);
  }, []);

  return (
    <div className="container   w-full h-10   flex pt-1 pl-2  justify-center    sm:flex sm:max-w-full sm:items-center sm:gap-4 sm:px-4 sm:py-2 md:gap-6 md:px-6">
      <a className=" hidden sm:flex gap-2 font-semibold items-center dark:text-black-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
          data-id="5"
        >
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
          <line x1="4" x2="4" y1="22" y2="15"></line>
        </svg>
        Home
      </a>
      <nav className="flex-1" data-id="6">
        <ul
          className=" flex gap-4  text-[11px] justify-center  sm:text-lg  sm:flex sm:gap-4 sm:justify-center  "
          data-id="7"
        >
          <Link to="/leaderboard">
            <li data-id="8">
              <a
                className="border-b-2 border-transparent transition-colors pb-2px hover:border-gray-900 dark:hover:border-gray-50"
                data-id="9"
                href="#"
                rel="ugc"
              >
                Leaderboard
              </a>
            </li>
          </Link>
          <Link to="/news">
            <li data-id="10">
              <a
                className="hover:text-gray-900 dark:hover:text-blue-300"
                data-id="11"
                href="#"
                rel="ugc"
              >
                News
              </a>
            </li>
          </Link>
          <Link to="/jobs">
            <li data-id="12">
              <a
                className="hover:text-gray-900 dark:hover:text-blue-300"
                data-id="13"
                href="#"
                rel="ugc"
              >
                Jobs/Internships
              </a>
            </li>
          </Link>
          <Link to="/resources">
            <li data-id="14">
              <a
                className="hover:text-gray-900 dark:hover:text-blue-300"
                data-id="15"
                href="#"
                rel="ugc"
              >
                Resources
              </a>
            </li>
          </Link>
          <Link to="/coreteam">
            <li data-id="16">
              <a
                className="hover:text-gray-900 dark:hover:text-blue-300"
                data-id="17"
                href="#"
                rel="ugc"
              >
                Core-Team
              </a>
            </li>
          </Link>
        </ul>
      </nav>
      {user != null ? (
        <Link to="/logout">
          <div className="flex items-center gap-4 md:gap-2" data-id="18">
            <a
              className="flex items-center gap-2 text-sm font-medium rounded-md px-3 py-2 hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-blue-300"
              data-id="19"
              href="#"
              rel="ugc"
            >
              Logout
            </a>
          </div>
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Header;
