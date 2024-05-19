import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { addUser } from "../reduxStore/userSlice";
import logo from "../assets/Favicon/mainlogo.png";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const api = axios.create({
      withCredentials: true,
      headers: {
        "Content-type": "application/json",
      },
    });
    api
      .post("https://ggitsstudentsapi.vercel.app/login", {
        username,
        password,
      })
      .then((response) => {
        const { username, role } = response.data;
        dispatch(addUser({ username: username, role: role }));
        if (response.data.role == "admin") {
          toast.success("Login successful: " + response.data.role, {
            position: "top-center",
            autoClose: 3000,
            theme: "colored",
          });
          navigate("/admin");
        } else {
          toast.success("Login successful: " + response.data.role, {
            position: "top-center",
            autoClose: 3000,
            theme: "colored",
          });
          alert(`login successfull: ${response.data.role}`);
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response.status == 401) {
          toast("Wrong credentials", {
            theme: "dark",
            position: "bottom-right",
            autoClose: 3000,
          });
          navigate("/");
        }
      });
  };

  return (
    <div className="">
      <div class="flex flex-col items-center  justify-start m-32   px-6 mx-auto md:h-screen lg:py-0">
        <div
          href="#"
          class="flex items-center mb-6  text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img class="w-8 h-8 mr-2" src={logo} alt="logo" />
          <span className="text-black">GGITS Coding Club</span>
        </div>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form class="space-y-4 md:space-y-6" onSubmit={handleOnSubmit}>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>

              <button
                type="submit"
                class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
