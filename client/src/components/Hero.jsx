
import React from "react";
import blackhole from "../assets/blackhole.webm";
import HeroContent from "./sub/HeroContent";
import SubContent from "./sub/SubContent";


const Hero = () => {
  return (
    <div className="h-screen w-screen relative flex flex-col" id="about-me">
      <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute top-[-400px]  h-full w-full left-0 z-[1] object-cover ">
        <source src={blackhole} type="video/webm" />
      </video>
      <SubContent/>
    </div>
  );
};

export default Hero;
