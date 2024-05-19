import React, { useEffect, useState } from "react";
import Header from "../../Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addResources } from "../../../reduxStore/dataSlice";

const ResourcesDelete = () => {
  const resources = useSelector((store) => store.datas.resourcesData);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { resourceid } = useParams();
  const [user, setUser] = useState("");
  const [success, setSuccess] = useState([]);

  const api = axios.create({
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });
  const getUserData = async () => {
    console.log("getuserdata");
    try {
      const data = await api.get("https://ggitsstudentsapi.vercel.app/login");
      if (data.data.role == "admin" || data.data.role == "resources") {
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
    if (user == "admin" || user == "resources") {
      deleteNews();
      Navigate("/resources");
      return;
    }
  });

  const deleteNews = async () => {
    api
      .delete("https://ggitsstudentsapi.vercel.app/resources/" + resourceid)
      .then((response) => {
        if (response.status == 200) {
          toast.success("Resource deleted succesfully!", {
            theme: "colored",
            autoClose: 3000,
            position: "top-center",
          });
          const myArray = [];
          resources.map((resource) => {
            if (resource._id != response.data._id) myArray.push(resource);
          });
          dispatch(addResources(myArray));
          Navigate("/resources");
        } else {
          toast.error("Error occured while deleting resource!", {
            theme: "colored",
            autoClose: 3000,
          });
          Navigate("/resources");
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

  return <></>;
};

export default ResourcesDelete;
