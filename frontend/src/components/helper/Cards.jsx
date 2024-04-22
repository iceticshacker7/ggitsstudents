import { Card, CardBody, CardHeader, Heading, Stack } from "@chakra-ui/react";
import React from "react";

const card = ({
  title, descrition, tag, link
}) => {
  return (
      <div className="card bg-slate-100 rounded-lg shadow-md  border border-black flex flex-col justify-start align-top p-0 h-1/3 mt-8">
        <h1 className=" w-1/2 flex right-5 text-wrap font-bold text-lg p-5 my-1">{title}</h1>
        <h3 className=" w-2/3 flex right-5 text-wrap font-semibold bg-red text-lg p-5 my-1">{descrition}</h3>
        <h4 className=" w-2/3 flex right-5 text-wrap font-serif text-lg p-5 my-1">{link}</h4>
        <h3 className=" w-2/3 flex right-5 text-wrap font-serif text-lg p-5 my-1">{tag}</h3>
      </div>
  );
};

export default card;
