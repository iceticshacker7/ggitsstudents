import React from "react";
import Header from "./Header";
import imge from "../assets/placeholder.jpg";
import imge2 from "../assets/placeholder1.jpeg";
import imge3 from "../assets/image.png";
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
              <Link to={"/hiddenlogin"}><button className=" cursor-default">Core Team </button></Link>
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
    title: "Co-Founder, CTO",
    description: "Empowering teams to build the future.",
    image: imge,
    link : "https://www.linkedin.com/in/divyanshrai7/",
  },
  {
    name: "Arpit Koshta",
    title: "Senior Developer",
    description: "Crafting innovative solutions, one line of code at a time.",
    image: imge2,
    link:"https://www.linkedin.com/in/arpit-koshta-6b6b9a270"
  },
  {
    name: "Priyanshu Koshta",
    title: "Co-Founder, CEO",
    description: "Designing experiences that inspire and delight.",
    image: imge3,
    link : "https://in.linkedin.com/in/priyanshu-koshta",
  },
  
  
];
export default CoreTeam;
