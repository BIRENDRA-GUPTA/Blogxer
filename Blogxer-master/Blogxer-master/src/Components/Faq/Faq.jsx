import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

const Faq = () => {
  const [faq1, setFaq1] = useState([
    {
      question: "Who can post to Blogxer?",
      answer:
        "Anyone! Yes, you have permission to make a new post of any kind as long as it meets our community guidelines and gets through common-sense spam filters.",
    },
    {
      question: "How do I post article on Blogxer?",
      answer:
        "Click on create blog in the top right corner of the site. Write your article, give it a title and fill out any other relevant fields.",
    },
  ]);
  return (
    <>
      <Navbar />{" "}
      <div className="flex justify-center">
        <main className="mt-10 w-full rounded-lg mx-10 p-10 md:mx-5 md:w-4/6 bg-white shadow  ">
          <h1 className="text-3xl font-bold my-3">
            Frequently Asked Questions 🤔
          </h1>
          <p className="text-xl">
            <em>
              Some of these are not actually asked frequently, but they're still
              good to know.
            </em>
          </p>
          {faq1.map((faq) => (
            <div className="my-5">
              <h2 className="font-bold my-2 text-xl">{faq.question}</h2>
              <p className="text-md">{faq.answer}</p>
            </div>
          ))}
        </main>
      </div>
    </>
  );
};

export default Faq;
