import React from "react";

function NewsCard() {
  return (
    <div
      className="rounded-lg border bg-card text-card-foreground shadow-sm"
      data-v0-t="card"
    >
      <div className="flex items-start p-6">
        <div className="grid gap-1 ml-4">
          <div className="flex items-center gap-2">
            <hgroup className="grid gap-1">
              <h3 className="text-base font-bold leading-none">
                New York Times
              </h3>
              <h4 className="text-xs tracking-wide opacity-70">2 hours ago</h4>
            </hgroup>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground ml-auto flex-shrink-0">
              Follow
            </button>
          </div>
          <p className="text-sm leading-relaxed">
            The description of the news goes here. It can be a bit longer
            because it's scrollable.
          </p>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90">
              Verify
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
              View Source
            </button>
          </div>
        </div>
      </div>
      <div data-state="closed">
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground w-8 h-8 p-1 rounded-full"
          type="button"
          aria-controls="radix-:r0:"
          aria-expanded="false"
          data-state="closed"
        >
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
            className="w-4 h-4"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
        <div
          data-state="closed"
          id="radix-:r0:"
          hidden
          className="p-6"
          style={{}}
        ></div>
      </div>
    </div>
  );
}

export default NewsCard;
