import React, { useEffect, useState } from "react";
import Header from "../../Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addNews } from "../../../reduxStore/dataSlice";

const NewsDelete = () => {
  const news = useSelector((store) => store.datas.newsData);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { newsid } = useParams();
  const [user, setUser] = useState("");
  const [success, setSuccess] = useState([]);

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
    if (user == "admin" || user == "news") {
      deleteNews();
      Navigate("/news");
      return;
    }
  });

  const deleteNews = async () => {
    api
      .delete("https://ggitsstudentsapi.vercel.app/news/" + newsid)
      .then((response) => {
        if (response.status == 200) {
          toast.success("News deleted successfully!", {
            theme: "colored",
            autoClose: 3000,
            position: "top-center",
          });
          const myArray = [];
          news.map((news) => {
            if (news._id != response.data._id) myArray.push(news);
          });

          dispatch(addNews(myArray));
          Navigate("/news");
        } else {
          console.log(error);
          toast.error("Error occured while deleting news!", {
            theme: "colored",
            autoClose: 3000,
          });
          Navigate("/news");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 401) {
          toast.warn("Access Denied!", {
            theme: "colored",
            autoClose: 3000,
          });
          Navigate("/");
        }
      });
  };
};

export default NewsDelete;
