import React from 'react';

const JobComponent = () => {
  return (
    <div className="flex justify-center items-center">
    
    <div className="rounded-lg shadow-lg bg-white border bg-card text-card-foreground shadow-sm w-full max-w-lg" data-v0-t="card">
     
      <div className="p-6">
        <h2 className="text-2xl font-bold leading-tight">Senior Frontend Developer</h2>
        <div className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mt-2">
          Batch 2021
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-lg">Skillset Required</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
              JavaScript
            </div>
            <div className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
              React
            </div>
            {/* Add more skillset divs as needed */}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-lg">Description</h3>
          <p className="mt-2">
            We are looking for a seasoned frontend developer to join our fast-paced team. The ideal candidate will be
            responsible for building and maintaining web applications with a focus on creating engaging user
            experiences.
          </p>
        </div>
        <div className="flex justify-between items-center mt-6">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2">
            Apply Now
          </button>
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

  );
};

export default JobComponent;
