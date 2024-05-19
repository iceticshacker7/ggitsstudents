import React from "react";

export default function Component({
  name,
  branch,
  batch,
  score,
  rating,
  rank,
  userRole,
  id,
}) {
  return (
    <div className="rounded-lg shadow-lg bg-white sm:max-w-full">
      <div className="p-6 space-y-4 text-center">
        <div className="text-3xl font-semibold">{rank}</div>
        <div className="space-y-2 text-center">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm text-white dark:text-gray-400">
            Branch: {branch} Batch: {batch}
          </p>
        </div>
        <div className="flex justify-center items-center space-x-4">
          <div className="text-xl font-semibold">
            Score: {Math.floor(score)}
          </div>
          <div className="text-xl font-semibold">
            Rating: {Math.floor(rating)}
          </div>
          {userRole === "admin" || userRole === "leaderboard" ? (
            <div className="flex">
              <Link to={"/leaderboardedit/" + id}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Edit
                </button>
              </Link>
              <Link to={"/leaderboarddelete/" + id}>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
