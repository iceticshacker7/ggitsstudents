import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

function ContactUs() {
  const [isOpen, setIsOpen] = useState(true);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  function sendMail(e) {
    e.preventDefault(); //This is important, I'm not sure why, but the email won't send without it

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then(
        (result) => {
          if (result.status === 200) {
            handleCloseModal();
            toast.success("Form submitted successfully!", {
              theme: "colored",
            });
          }
        },
        (error) => {
          console.log(error);
          console.log(error.text);
        }
      );
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
          <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg sm:p-8">
            <button
              className="absolute top-2 right-2 bg-transparent border-none text-gray-700 text-3xl"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">
                  Register Now!
                </h2>
                <p className="text-gray-500">
                  Join the ranks of the elite - register now and climb the
                  leaderboard to glory!
                </p>
              </div>
              <form className="space-y-4" onSubmit={sendMail}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label
                      className="text-sm font-medium leading-none"
                      htmlFor="name"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full h-10 bg-gray-200 border border-black rounded-md px-3 py-2 text-sm placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      className="text-sm font-medium leading-none"
                      htmlFor="branch"
                    >
                      Branch <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full h-10 bg-gray-200 border border-black rounded-md px-3 py-2 text-sm placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      id="branch"
                      name="branch"
                      type="text"
                      required
                      placeholder="Enter your branch"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      className="text-sm font-medium leading-none"
                      htmlFor="batch"
                    >
                      Batch <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full h-10 bg-gray-200 border border-black rounded-md px-3 py-2 text-sm placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      id="batch"
                      name="batch"
                      type="text"
                      required
                      placeholder="Enter your batch"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      className="text-sm font-medium leading-none"
                      htmlFor="collegeId"
                    >
                      College Id <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full h-10 bg-gray-200 border border-black rounded-md px-3 py-2 text-sm placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      id="collegeId"
                      name="collegeId"
                      required
                      type="email"
                      placeholder="Enter your college email ID"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label
                    className="text-sm font-medium leading-none"
                    htmlFor="leetcodeProfile"
                  >
                    Leetcode Profile Link:
                  </label>
                  <input
                    className="w-full h-10 bg-gray-200 border border-black rounded-md px-3 py-2 text-sm placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    id="leetcodeProfile"
                    name="leetcodeProfile"
                    type="text"
                    placeholder="Enter your Leetcode profile link"
                  />
                </div>
                <div className="space-y-1">
                  <label
                    className="text-sm font-medium leading-none"
                    htmlFor="codechefProfile"
                  >
                    Codechef Profile Link:
                  </label>
                  <input
                    className="w-full h-10 bg-gray-200 border border-black rounded-md px-3 py-2 text-sm placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    id="codechefProfile"
                    name="codechefProfile"
                    type="text"
                    placeholder="Enter your Codechef profile link"
                  />
                </div>
                <div className="space-y-1">
                  <label
                    className="text-sm font-medium leading-none"
                    htmlFor="codeforcesProfile"
                  >
                    Codeforces Profile Link:
                  </label>
                  <input
                    className="w-full h-10 bg-gray-200 border border-black rounded-md px-3 py-2 text-sm placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    id="codeforcesProfile"
                    type="text"
                    name="codeforcesProfile"
                    placeholder="Enter your Codeforces profile link"
                  />
                </div>
                <div className="space-y-1">
                  <label
                    className="text-sm font-medium leading-none"
                    htmlFor="gfgProfile"
                  >
                    GFG Profile Link:
                  </label>
                  <input
                    className="w-full h-10 bg-gray-200 border border-black rounded-md px-3 py-2 text-sm placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    id="gfgProfile"
                    name="gfgProfile"
                    type="text"
                    placeholder="Enter your GFG profile link"
                  />
                </div>
                <button
                  className="w-full h-10 bg-blue-500 text-white rounded-md flex items-center justify-center text-sm font-medium hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ContactUs;
