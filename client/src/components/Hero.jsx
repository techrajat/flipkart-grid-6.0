
import React from "react";
import blackhole from "../assets/blackhole.webm";

const Hero = () => {
  return (
    <div className="h-screen w-screen absolute flex flex-col z-[-200]" id="about-me">
      <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute top-[-350px]  h-full w-full left-0 z-[1] object-cover ">
        <source src={blackhole} type="video/webm" />
      </video>
    </div>
  );
};

export default Hero;
