import React from "react";
import Navbar from "../Navbar";
import { useNavigate, useParams } from "react-router-dom";

const DeleteNews = async () => {
  const Navigate = useNavigate();
  const { newsid } = useParams();

  if (ans) {
    const result = await axios.delete("http://localhost:5000/news/" + newsid);
    console.log(result);
    if (result.status == 200) {
      alert("News deleted successfully!");
    } else {
      alert("Access denied");
    }
  }
  return (
    <>
      <Navbar />
    </>
  );
};

export default DeleteNews;
