import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

const About = () => {
  return (
    <>
      <Navbar />{" "}
      <div className="flex justify-center">
        <main className="mt-10 mb-10 text-justify w-full rounded-lg mx-10 p-10 md:mx-5 md:w-4/6 text-xl bg-white shadow  ">
          <h1 className="text-3xl font-bold my-3">About Blogxer</h1>
          <p className="my-4">
            Welcome to <span className="font-bold italic ">Blogxer</span>, a
            platform dedicated to the art of blogging. We believe that everyone
            has a unique voice and story to share with the world, and our goal
            is to provide you with the tools and platform to do just that.
          </p>
          <p className="my-4">
            At <span className="font-bold italic ">Blogxer</span>, we understand
            that blogging is not just a means of self-expression but also a way
            to connect with others who share similar interests and passions.
            Whether you're a seasoned writer or just starting out, our
            user-friendly interface and intuitive design make it easy for you to
            create and publish your blogs.
          </p>{" "}
          <h1 className="my-4 font-bold text-2xl">Our Features:</h1>
          <div className="my-4">
            <span className=" font-bold text-xl">1. Create and Customize:</span>{" "}
            Our web application offers a powerful yet simple editor that allows
            you to unleash your creativity. Write, format, and structure your
            blog posts with ease. Add images, videos, and other media to enhance
            your content. Customize the layout and design to match your personal
            style.{" "}
          </div>
          <div className="my-4">
            <span className=" font-bold text-xl">2. Seamless Publishing:</span>{" "}
            Once you're satisfied with your blog post, publish it with a single
            click. Our platform takes care of the technical aspects, ensuring
            that your content looks great and is accessible on any device. Share
            your ideas and stories with the world without any hassle.{" "}
          </div>
          <div className="my-4">
            <span className=" font-bold text-xl">3. Community Engagement:</span>{" "}
            Connect with a vibrant community of fellow bloggers, readers, and
            enthusiasts. Engage in discussions, exchange feedback, and discover
            new perspectives. Our comment system encourages meaningful
            conversations and fosters a supportive environment.{" "}
          </div>
          <p className="my-4">
            <span className=" font-bold text-xl">
              {" "}
              4. Discover and Explore:
            </span>{" "}
            Dive into a world of diverse content. Explore blogs from various
            categories, including lifestyle, travel, technology, food, and more.
            Follow your favorite writers, bookmark interesting posts, and
            receive personalized recommendations based on your interests.
          </p>
          <p>
            Whether you're here to share your expertise, document your
            adventures, express your thoughts, or simply connect with others,
            <span className="font-bold italic "> Blogxer</span> is here to
            support you every step of the way. Join our vibrant community of
            bloggers today and embark on a journey of self-expression and
            connection. Start your blogging journey with
            <span className="font-bold italic "> Blogxer</span> and let your
            voice be heard!
          </p>
        </main>
      </div>
    </>
  );
};

export default About;
