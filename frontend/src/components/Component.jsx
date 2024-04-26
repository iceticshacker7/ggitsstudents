import React from "react";

export default function Component({
  name,
  branch,
  batch,
  score,
  rating,
  rank,
}) {
  return (
    <div className="rounded-lg shadow-lg bg-white w-[30vw] flex justify-center border bg-card text-card-foreground ">
      <div
        className="rounded-lg bg-white bg-card text-card-foreground shadow-sm w-full max-w-sm"
        data-v0-t="card"
      >
        <div className="p-6 space-y-4 text-center">
          <div className="text-3xl fontX-semibold">{rank}</div>
          <div className="flex w-full items-center gap-4 mx-auto max-w-xs justify-center">
            {" "}
            {/* Centering content */}
            <div className="space-y-2 text-center">
              {" "}
              {/* Centering content */}
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Branch: {branch} Batch: {batch}
              </p>
            </div>
          </div>
          <div className="flex w-full items-center gap-4 mx-auto max-w-xs justify-center">
            {" "}
            {/* Centering content */}
            <div className="text-2xl font-semibold">
              Points: {Math.floor(score)}
            </div>
            <div className="text-2xl font-semibold">
              Rating: {Math.floor(rating)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
