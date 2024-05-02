import React from "react";

const JobShimmer = () => {
  return (
    <>
      {Array.from({ length: 50 }, (_, index) => (
        <div className="flex justify-center items-center my-3">
          <div
            className="rounded-lg shadow-lg bg-white border bg-card text-card-foreground w-full max-w-lg"
            data-v0-t="card"
          >
            <div className="p-6">
              <div className="shimmer-content w-3/4 h-6 bg-gray-300 mb-2"></div>
              <div className="shimmer-content w-1/4 h-4 bg-gray-300"></div>
              <div className="mt-4">
                <h3 className="font-semibold text-lg bg-gray-300"></h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="shimmer-content w-fit h-6 bg-gray-300"></div>
                  {/* Add more skillset divs as needed */}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-lg bg-gray-300"></h3>
                <div className="shimmer-content w-full h-12 bg-gray-300 mt-2"></div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <div className="shimmer-content w-1/3 h-10 bg-gray-300"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-green-500"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobShimmer;
