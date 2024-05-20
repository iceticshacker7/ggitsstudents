import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header";
import getUserData from "../../../utils/getUserData";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addResources } from "../../../reduxStore/dataSlice";

const ResourcesPost = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const resources = useSelector((store) => store.datas.resourcesData);
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
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const moredescription = e.target.moredescription.value;
    const tag = e.target.tag.value;
    const link = e.target.link.value;
    api
      .post("https://ggitsstudentsapi.vercel.app/resources", {
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
          createdAt: date,
          title: title,
          description: description,
          moredescription: moredescription,
          tag: tag,
          link: link,
        };
        if (response.status == 200) {
          toast.success("Resource added successfully!", {
            theme: "colored",
            autoClose: 3000,
            position: "top-center",
          });
          const myArray = [];
          resources.map((resource) => {
            myArray.push(resource);
          });
          myArray.unshift(newdata);
          dispatch(addResources(myArray));
          Navigate("/resources");
        } else {
          toast.error("Error occured while adding resource!", {
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
      <div className="relative w-full h-[85vh] max-w-lg rounded-lg my-3 bg-slate-300 px-4 py-4 shadow-lg">
        <div className="flex justify-center font-bold text-xl">
          <h1 className="underline">RESOURCES POST</h1>
        </div>
        <form onSubmit={handleOnSubmit} className="space-y-4">
          <div className="">
            <label htmlFor="title" className="text-sm font-medium leading-none">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full h-10 bg-gray-200 border border-black rounded-md px-3 py-0 text-sm placeholder-text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Enter your Title"
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
              id="description"
              name="description"
              required
              rows={5}
              className="w-full h-24 bg-gray-200 border border-black rounded-md px-3 py-2 text-sm placeholder-text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Enter your description"
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
              id="moredescription"
              name="moredescription"
              rows={5}
              className="w-full h-24 bg-gray-200 border border-black rounded-md px-3 py-2 text-sm placeholder-text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Describe your description"
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
              required
              className="w-full h-10 bg-gray-200 border border-black rounded-md px-3 py-2 text-sm placeholder-text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Enter your tag"
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
              required
              className="w-full h-10 bg-gray-200 border border-black rounded-md px-3 py-2 text-sm placeholder-text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Enter your link"
            />
          </div>
          <button
            type="submit"
            className="w-full h-10 bg-blue-500 text-white rounded-md flex items-center justify-center text-sm font-medium hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            POST
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResourcesPost;
