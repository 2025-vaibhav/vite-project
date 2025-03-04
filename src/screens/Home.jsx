import React from "react";
import useTitle from "../hooks/useTitle";

const Home = () => {
  useTitle("Home");

  return (
    <div className="max-w-screen-2xl mx-auto">
      <h1 className="text-2xl m-3" data-aos="fade-up">
        Welcome
      </h1>
    </div>
  );
};

export default Home;
