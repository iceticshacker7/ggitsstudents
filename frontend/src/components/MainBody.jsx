import React from "react";
import Component from './Component'
import NewsCard from "./NewsCard";
import JobComponent from "./JobComponent"
function MainBody() {
  return (
    <div className="container  bg-gray-100 py-6 md:py-10 lg:py-14" data-id="21">
      <div className="mx-auto max-w-6xl px-4" data-id="22">
        <div className="space-y-6" data-id="23">
          <div className="space-y-2 text-center" data-id="24">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" data-id="25">
              GGITS Coding Club
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400" data-id="26">
              Master the art of coding. Compete with your peers.
            </p>
          </div>
          <div className="mx-auto grid max-w-3xl items-stretch justify-center gap-4" data-id="27">
          <Component/>
          <NewsCard/>
          <JobComponent/>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBody;
