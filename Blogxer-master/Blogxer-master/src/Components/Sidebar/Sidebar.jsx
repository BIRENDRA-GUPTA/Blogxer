import React, { useState } from "react";
import { Link } from "react-router-dom";
import Facebook from "../Icons/Facebook";
import Twitter from "../Icons/Twitter";
import Github from "../Icons/Github";
import Instagram from "../Icons/Instagram";
import Youtube from "../Icons/Youtube";

export const Sidebar = () => {
  const [state, setState] = useState([
    { path: "/", content: "🏠 Home" },
    { path: "/bookmarks", content: "📃 Reading List" },
    // { path: "/tags", content: "🏷️ Tags" },
    { path: "/faq", content: "💡 FAQ" },
    { path: "/about", content: "📍 About" },
    { path: "/contact", content: "📞 Contact" },
    // { path: "/guides", content: "📑 Guides" },
  ]);
  return (
    <div className="sticky top-20">
      <div className=" flex flex-col my-2 w-4/5">
        {state?.map((item) => (
          <Link
            key={item}
            to={item.path}
            className="my-2 hover:bg-gray-100 hover:rounded-md   p-2 border border-gray-100 hover:border hover:bg-white hover:text-blue-700"
          >
            {item.content}
          </Link>
        ))}

        <div>
          {" "}
          <div className="mt-6 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between">
            <a
              className="link"
              href="#"
              target="_blank"
              data-tippy-content="@facebook_handle"
            >
              <Facebook />
            </a>
            <a
              className="link"
              href="#"
              target="_blank"
              data-tippy-content="@twitter_handle"
            >
              <Twitter />
            </a>
            <a
              className="link"
              href="#"
              target="_blank"
              data-tippy-content="@github_handle"
            >
              <Github />
            </a>

            <a
              className="link"
              href="#"
              target="_blank"
              data-tippy-content="@instagram_handle"
            >
              <Instagram />
            </a>
            <a
              className="link"
              href="#"
              target="_blank"
              data-tippy-content="@youtube_handle"
            >
              <Youtube />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
