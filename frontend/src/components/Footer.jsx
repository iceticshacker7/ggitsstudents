import React from "react";

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 flex items-center bg-white border-t border-gray-100 dark:bg-gray-950 dark:border-gray-800">
      <div className="container flex items-center justify-center gap-4 px-4 py-2 md:gap-6 md:px-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Made with love by the © Coding Club. All rights reserved.
        </p>
        <div className="ml-auto flex items-center gap-4 md:gap-2">
          <a
            className="text-sm font-medium rounded-md dark:text-gray-50"
            href="#"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
