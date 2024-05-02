import React from "react";

const NewsShimmer = () => {
  return (
    <>
      {Array.from({ length: 50 }, (_, index) => (
        <div
          key={index}
          className="rounded-lg shadow-lg bg-white sm:w-[80vw] border bg-card text-card-foreground"
          data-v0-t="card"
        >
          <div className="flex items-start p-3">
            <div className="grid gap-2 ml-3">
              <div className="flex items-center gap-2">
                <hgroup className="grid gap-2">
                  {/* Shimmer placeholder for title */}
                  <div className="shimmer-content w-32 h-3 bg-gray-300"></div>
                  {/* Shimmer placeholder for tag */}
                  <div className="shimmer-content w-16 h-2 bg-gray-300"></div>
                </hgroup>
              </div>
              {/* Shimmer placeholder for description */}
              <div className="shimmer-content w-full h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                {/* Shimmer placeholder for button */}
                <div className="shimmer-content w-16 h-6 bg-gray-300"></div>
              </div>
            </div>
          </div>
          {/* Shimmer placeholder for expanded content */}
          <div className="p-3">
            <div className="shimmer-content w-full h-8 bg-gray-300"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default NewsShimmer;
