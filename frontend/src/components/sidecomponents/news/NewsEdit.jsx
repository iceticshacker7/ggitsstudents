import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header";
import getUserData from "../../../utils/getUserData";
import getNews from "../../../utils/getNews";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addNews } from "../../../reduxStore/dataSlice";

const NewsEdit = () => {
  const news = useSelector((store) => store.datas.newsData);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { newsid } = useParams();
  const [user, setUser] = useState("");
  const [filteredData, setFilteredData] = useState([]);
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

  const getFilteredData = async () => {
    const datas = await axios.get("https://ggitsstudentsapi.vercel.app/news");
    datas.data.map((data) => {
      if (data._id == newsid) {
        setFilteredData(data);
      }
    });
  };

  useEffect(() => {
    getUserData();
    getFilteredData();
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const moredescription = e.target.moredescription.value;
    const tag = e.target.tag.value;
    const link = e.target.link.value;
    api
      .put("https://ggitsstudentsapi.vercel.app/news/" + newsid, {
        title,
        description,
        moredescription,
        tag,
        link,
      })
      .then((response) => {
        const d = new Date();
        const month = d.getMonth() + 1;
        const date = d.getFullYear() + "-0" + month + "-" + d.getDate();
        if (response.status == 200) {
          const newdata = {
            createdAt: date,
            _id: newsid,
            title: title,
            description: description,
            tag: tag,
            link: link,
            moredescription: moredescription,
          };
          toast.success("News edited successfully!", {
            theme: "colored",
            autoClose: 3000,
            position: "top-center",
          });
          const myArray = [];
          news.map((news) => {
            if (news._id == response.data._id) {
              myArray.push(newdata);
            } else myArray.push(news);
          });
          dispatch(addNews(myArray));
          Navigate("/news");
        } else {
          toast.error("Error occured while editing news!", {
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
    <div className="flex justify-center">
      <div className="relative w-full h-[87vh] max-w-lg rounded-lg my-3 bg-slate-50 px-3 py-2 shadow-lg ">
        <div className="flex justify-center font-bold text-xl ">
          <h1 className="underline">NEWS EDIT</h1>
        </div>
        <form className="space-y-3 h-full  mx-auto" onSubmit={handleOnSubmit}>
          <div className="">
            <label htmlFor="title" className="text-sm font-medium leading-none">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={filteredData.title}
              className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your Title"
              required
            />
          </div>
          <div className="">
            <label
              htmlFor="description"
              className="text-sm font-medium leading-none"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              id="description"
              name="description"
              defaultValue={filteredData.description}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your description"
              required
            />
          </div>
          <div className="">
            <label htmlFor="tag" className="text-sm font-medium leading-none">
              Tag <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="tag"
              name="tag"
              defaultValue={filteredData.tag}
              className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your tag"
              required
            />
          </div>
          <div className="">
            <label
              htmlFor="moredescription"
              className="text-sm font-medium leading-none"
            >
              More Description
            </label>
            <textarea
              rows={5}
              id="moredescription"
              name="moredescription"
              defaultValue={filteredData.moredescription}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              placeholder="Describe your description"
            />
          </div>
          <div className="">
            <label htmlFor="link" className="text-sm font-medium leading-none">
              Link <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="link"
              name="link"
              defaultValue={filteredData.link}
              className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your link"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full h-10 bg-blue-500 text-white rounded-md flex items-center justify-center text-sm font-medium hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none"
          >
            EDIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsEdit;
