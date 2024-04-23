import { useState } from 'react';

function PerModal() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-2xl rounded-2xl border-0 overflow-hidden z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="p-4 md:p-6">
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 absolute top-4 right-4 rounded-full"
          onClick={() => setIsOpen(false)}
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
            className="w-6 h-6"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
          <span className="sr-only">Close</span>
        </button>
        <div className="text-center">
          <div className="text-lg md:text-xl">Welcome to the Club</div>
          <div className="text-sm md:text-base"></div>
        </div>
      </div>
      <div className="p-4 md:p-6">
        <div className="mx-auto max-w-[400px] grid gap-4">
          <img
            src="/placeholder.svg"
            width="400"
            height="200"
            alt="Image"
            className="aspect-[2/1] overflow-hidden rounded-lg object-cover object-center"
          />
          <p className="text-sm md:text-base"></p>
        </div>
      </div>
      <div className="p-4 md:p-6">
        <div className="flex justify-center">
          <a className="inline-block" href="#">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mr-2">
              External Link 1
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default PerModal;
