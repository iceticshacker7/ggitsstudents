import React from "react";
import { Link } from "react-router-dom";

const TeamCard = ({ profiles }) => {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-16">
        <div className="container grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 md:px-6">
          {profiles.map((profile, index) => (
            <div key={index} className="flex items-center gap-4">
              <img
                alt={profile.name}
                className="h-32 w-32 rounded-full object-cover"
                height={128}
                src={profile.image}
                style={{
                  aspectRatio: "128/128",
                  objectFit: "cover",
                }}
                width={128}
              />

              <div className="grid gap-2  ">
                <h3 className="text-lg font-bold">{profile.name} </h3>
                <div className="flex flex-col items-center gap-1 rounded-lg bg-gray-100 p-4 dark:bg-gray-200">
                  <p className="text-sm font-medium">{profile.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {profile.description}
                    <Link to={profile.link}>
                      <span className="[&>svg]:h-5 [&>svg]:w-5 bg-red-200 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 448 512"
                        >
                          <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                        </svg>
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add two more instances of the job component here */}
    </>
  );
};

export default TeamCard;
