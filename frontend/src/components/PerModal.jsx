import React, { useState } from "react";

function PerModal() {
  const [isOpen, setIsOpen] = useState(true);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <div className="bg-black bg-opacity-80 backdrop-blur-md absolute top-0 left-0 w-full h-full"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 shadow-lg rounded-lg p-8 max-w-sm w-11/12">
            <button
              className="absolute top-2 right-2 bg-transparent border-none text-gray-700 text-3xl"
              onClick={handleCloseModal}
            >
              <span>&times;</span>
            </button>
            <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
            <p className="text-lg mb-4">
              This is the page to the GGITS Coding Club. <br />
              <br /> Want to top the charts? Fill out the form and start
              climbing. <br /> <br />
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Fill Form
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default PerModal;
