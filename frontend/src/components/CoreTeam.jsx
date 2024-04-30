import React from "react";
import Header from "./Header";
import imge from "../assets/placeholder.jpg";
import imge2 from "../assets/placeholder1.jpeg";
import imge3 from "../assets/image.png";
import imge4 from "../assets/imge4.jpeg"
import imge5 from "../assets/imge5.jpeg"
import TeamCard from "./helper/TeamCard";
import { Link } from "react-router-dom";
const CoreTeam = () => {
  return (
    <>
      <Header />
      <div className="container bg-gray-100 py-6 h-[100vh] flex md:py-10 lg:py-14">
        <div className="mx-auto max-w-[76rem]">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"> 
              Core Team 
              {/* <Link to={"/hiddenlogin"}><button className=" cursor-default">Core Team </button></Link> */}
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              The folks behind the magic. We're a diverse team of professionals who are passionate about creating the best experiences for our users.
              </p>
              <TeamCard profiles={profiles} />
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};
const profiles = [
  {
    name: "Divyansh Rai",
    title: "Co-Founder, Mentor",
    description: "Building coding culture for the next generation.",
    image: imge,
    link : "https://www.linkedin.com/in/divyanshrai7/",
  },
  {
    name: "Arpit Koshta",
    title: "Backend Developer",
    description: "Crafting innovative solutions, one line of code at a time.",
    image: imge2,
    link:"https://www.linkedin.com/in/arpit-koshta-6b6b9a270"
  },
  {
    name: "Priyanshu Koshta",
    title: "Co-Founder, Mentor",
    description: "Making coding fun for everyone.",
    image: imge3,
    link : "https://in.linkedin.com/in/priyanshu-koshta",
  },
  {
    name: "Sakshi Koshta",
    title: "Technical Content Writer",
    description: "Making technical content fun for everyone.",
    image: imge4,
    link : "https://www.linkedin.com/in/sakshi-koshta-9bb979238",
  },
  {
    name: "Aditya Gupta",
    title: "Job Poster",
    description: "Helping people find their dream jobs.",
    image: imge5,
    link : "https://www.linkedin.com/in/aditya-gupta-66b5aa247/",
  },
];
export default CoreTeam;
