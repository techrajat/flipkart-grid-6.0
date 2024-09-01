
import React from "react";
import blackhole from "../assets/blackhole.webm";

const Hero = () => {
  return (
    <div className="h-screen w-screen relative flex flex-col z-10" id="about-me">
      <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute top-[-400px]  h-full w-full left-0 z-[1] object-cover ">
        <source src={blackhole} type="video/webm" />
      </video>
    </div>
  );
};

export default Hero;
