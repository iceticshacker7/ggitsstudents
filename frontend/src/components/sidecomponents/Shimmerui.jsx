import React from "react";

const ShimmerUI = () => {
  return (
    <div className="rounded-lg shadow-lg bg-white w-full sm:w-[30vw] flex justify-center border bg-card text-card-foreground">
      <div className="rounded-lg bg-white bg-card text-card-foreground shadow-sm w-full max-w-sm">
        <div className="p-6 space-y-4 text-center">
          <div className="text-3xl fontX-semibold shimmer-content w-16 h-8 bg-gray-300"></div>
          <div className="flex w-full items-center gap-4 mx-auto max-w-xs justify-center">
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-semibold shimmer-content w-36 sm:w-48 h-6 bg-gray-300"></h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 shimmer-content w-40 sm:w-60 h-4 bg-gray-300"></p>
            </div>
          </div>
          <div className="flex w-full items-center gap-4 mx-auto max-w-xs justify-center">
            <div className="text-2xl font-semibold shimmer-content w-24 h-8 bg-gray-300"></div>
            <div className="text-2xl font-semibold shimmer-content w-24 h-8 bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Shimmerui = () => {
  return (
    <div className="container bg-gray-100 py-6 md:py-10 lg:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col justify-center items-center space-y-6">
          <div className="grid max-w-3xl items-stretch justify-center gap-4">
            {/* Map over the shimmerArray */}
            {Array.from({ length: 50 }, (_, index) => (
              <ShimmerUI key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shimmerui;
