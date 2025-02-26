import React from "react";
import useTitle from "../hooks/useTitle";

const About = () => {
  useTitle("About");

  return (
    <div className="max-w-screen-2xl mx-auto">
      <h1 className="text-2xl m-3" data-aos="fade-up">
        About
      </h1>
    </div>
  );
};

export default About;
