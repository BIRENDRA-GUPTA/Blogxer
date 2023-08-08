import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

const Contact = () => {
  return (
    <>
      <Navbar />{" "}
      <div className="flex justify-center">
        <main className="mt-10 w-full rounded-lg mx-10 p-10 md:mx-5 md:w-4/6 bg-white shadow  ">
          <h1 className="text-2xl font-bold my-3">Contact</h1>
          <p className="text-xl my-3">
            DEV Community would love to hear from you!
          </p>
          <p className="text-xl my-3">
            <span className="font-bold">Email:</span> yo@dev.to 😁
          </p>{" "}
          <p className="text-xl my-3">
            <span className="font-bold">Twitter:</span> @thepracticaldev 👻
          </p>{" "}
          <p className="text-xl my-3">
            <span className="font-bold">Report a vulnerability:</span>{" "}
            dev.to/security 🐛
          </p>{" "}
          <p className="text-xl my-3">
            To report a bug, please create a bug report in our open source
            repository.
          </p>
          <p className="text-xl my-3">
            {" "}
            To request a feature, please start a new GitHub Discussion in the
            Forem repo!
          </p>
        </main>
      </div>
    </>
  );
};

export default Contact;
