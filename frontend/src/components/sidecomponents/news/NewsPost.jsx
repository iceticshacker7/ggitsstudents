import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header";
import getUserData from "../../../utils/getUserData";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addNews } from "../../../reduxStore/dataSlice";

const NewsPost = () => {
  const news = useSelector((store) => store.datas.newsData);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [user, setUser] = useState("");
  const api = axios.create({
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });
  const getUserData = async () => {
    try {
      const data = await api.get("https://ggitsstudentsapi.vercel.app/login");
      if (data.data.role == "admin" || data.data.role == "news") {
        setUser(data.data.role);
      } else {
        toast.warn("Access Denied!", {
          theme: "colored",
          autoClose: 3000,
        });
        Navigate("/");
      }
      return;
    } catch (error) {
      toast.warn("Access Denied!", {
        theme: "colored",
        autoClose: 3000,
      });
      Navigate("/");
      return;
    }
  };

  useEffect(() => {
    getUserData();
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const moredescription = e.target.moredescription.value;
    const tag = e.target.tag.value;
    const link = e.target.link.value;
    api
      .post("https://ggitsstudentsapi.vercel.app/news", {
        title,
        description,
        tag,
        link,
        moredescription,
      })
      .then((response) => {
        const newdata = {
          title: title,
          description: description,
          tag: tag,
          link: link,
          moredescription: moredescription,
        };
        if (response.status == 200) {
          toast.success("News posted successfully!", {
            theme: "colored",
            autoClose: 3000,
            position: "top-center",
          });

          const myArray = [];
          news.map((news) => {
            myArray.push(news);
          });
          myArray.unshift(newdata);
          dispatch(addNews(myArray));
          Navigate("/news");
        } else {
          toast.error("Error occured while posting news!", {
            theme: "colored",
            autoClose: 3000,
          });
          Navigate("/news");
        }
      })
      .catch((error) => {
        if (error.response.status == 401) {
          toast.warn("Access Denied!", {
            theme: "colored",
            autoClose: 3000,
          });
          Navigate("/");
        }
      });
  };

  return (
    <div>
      <form className="max-w-sm mx-auto" onSubmit={handleOnSubmit}>
        <div className="mb-5">
          <input
            type="text"
            id="title"
            name="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your Title"
            required
          />
        </div>
        <div className="mb-5">
          <textarea
            rows={5}
            type="text"
            name="description"
            id="desciption"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your desciption"
            required
          />
        </div>
        <div className="mb-5">
          <textarea
            rows={5}
            type="text"
            name="moredescription"
            id="moredesciption"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Describe your desciption"
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            id="tag"
            name="tag"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your tag"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            id="link"
            name="link"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your link"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          POST
        </button>
      </form>
    </div>
  );
};

export default NewsPost;
