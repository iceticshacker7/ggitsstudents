import { useState } from "react";
import { Link } from "react-router-dom";

const NewsCard = ({
  title,
  description,
  tag,
  link,
  moredescription,
  uploadDate,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="rounded-lg shadow-lg sm:bg-white  sm:w-[80vw] mx-5 mt-3 border bg-card text-card-foreground  "
      data-v0-t="card"
    >
      <div className="flex  items-start p-6">
        <div className="grid gap-1 ml-4 w-full">
          <div className="flex items-center  gap-2 w-full ">
            <hgroup className="flex flex-col w-full">
              <div className="flex align-middle justify-between w-full">
                <h3 className="text-base font-bold leading-none">{title}</h3>
                <p className="leading-tight ">{uploadDate}</p>
              </div>
              <h4 className="text-xs tracking-wide opacity-70">{tag}</h4>
            </hgroup>
          </div>
          <p className="text-sm leading-relaxed">{description}</p>
          <div className="flex items-center gap-2">
            <Link to={link} target="_blank">
              {" "}
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                Verify Source
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div data-state={isExpanded ? "open" : "closed"}>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground w-8 h-8 p-1 rounded-full"
          type="button"
          aria-controls="radix-:Rlafnnja:"
          aria-expanded={isExpanded}
          onClick={toggleExpansion}
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
        {isExpanded && (
          <div data-state="open" id="radix-:Rlafnnja:" className="p-6">
            {<p>{moredescription}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
