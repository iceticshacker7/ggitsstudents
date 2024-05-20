import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header";
import getUserData from "../../../utils/getUserData";
import getNews from "../../../utils/getNews";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addResources } from "../../../reduxStore/dataSlice";

const ResourcesEdit = () => {
  const Navigate = useNavigate();
  const { resourceid } = useParams();
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  const resources = useSelector((store) => store.datas.resourcesData);
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
      if (data.data.role == "admin" || data.data.role == "resources") {
        setUser(data.data.role);
        return;
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
    const datas = await axios.get(
      "https://ggitsstudentsapi.vercel.app/resources/"
    );
    datas.data.map((data) => {
      if (data._id == resourceid) {
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
      .put("https://ggitsstudentsapi.vercel.app/resources/" + resourceid, {
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
        const newdata = {
          _id: resourceid,
          title: title,
          description: description,
          moredescription: moredescription,
          tag: tag,
          link: link,
        };
        if (response.status == 200) {
          toast.success("Resources edited successfully!", {
            theme: "colored",
            autoClose: 3000,
            position: "top-center",
          });
          const myArray = [];
          resources.map((resource) => {
            if (resource._id == response.data._id) {
              myArray.push(newdata);
            } else myArray.push(resource);
          });
          dispatch(addResources(myArray));
          Navigate("/resources");
          return;
        } else {
          toast.error("Error occured while editing resource!", {
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

  return (
    <div className="flex justify-center">
      <div className="relative w-full h-[87vh] max-w-lg rounded-lg my-3 bg-slate-300 px-3 py-2 shadow-lg">
        <div className="flex justify-center font-bold text-xl">
          <h1 className="underline">RESOURCE EDIT</h1>
        </div>
        <form className="space-y-3 h-full mx-auto" onSubmit={handleOnSubmit}>
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

export default ResourcesEdit;
