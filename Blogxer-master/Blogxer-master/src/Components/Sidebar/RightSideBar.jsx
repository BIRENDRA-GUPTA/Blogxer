import React, { useState } from "react";
import { Link } from "react-router-dom";
import Facebook from "../Icons/Facebook";
import Twitter from "../Icons/Twitter";
import Github from "../Icons/Github";
import Instagram from "../Icons/Instagram";
import Youtube from "../Icons/Youtube";

export const RightSidebar = () => {
  const [state, setState] = useState([{}, {}, {}, {}, {}]);
  return (
    <div className="sticky  top-20">
      <span className="flex justify-between">
        <span>Trending Blogs</span>
        <Link className="text-blue-700 hover:underline">See All</Link>
      </span>
      <div className=" flex p-2 bg-white flex-col my-2 ">
        {state?.map((item, i) => (
          <Link key={i} className=" hover:underline hover:rounded-md p-2 hover:bg-gray-200  hover:text-blue-700">
            Blog title {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
};
