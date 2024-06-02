import React from "react";
import { Link } from "react-router-dom";
import appartment from "../assets/appartment.png";

function Home() {
  return (
    <div>
      <div className="grid grid-cols-2 mx-10 items-center">
        <div>
          <h1 className="font-medium text-yellow-500 text-5xl mb-4">
            Simplify shared living
          </h1>
          <p className="text-2xl text-neutral-700">
            Elevate your apartment living experience with
            <span className=" text-yellow-500"> Task Mates </span>- the ultimate
            solution for shared task coordination.
          </p>
          <button
            className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            type="submit"
          >
            Get started
          </button>
        </div>

        {/* In the place of the image, it will go an image of the app? */}
        <img
          className="grid justify-self-center max-w-sm mt-10"
          src={appartment}
          alt="Home"
        />
      </div>
      {/* In the next div, there will be a video or an animated image
      with a small demo of the app. */}
      {/* <div className="px-10 text-3xl text-neutral-700 my-6">
        Things you can do with
        <span className="text-yellow-500"> Task Mates </span>
      </div> */}
    </div>
  );
}

export default Home;
