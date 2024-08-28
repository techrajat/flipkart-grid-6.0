
import React from "react";
import blackhole from "../assets/blackhole.webm";
import SubContent from "./sub/SubContent";


const Hero = (props) => {
  return (
    <div className="h-screen w-screen relative flex flex-col" id="about-me">
      <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute top-[-400px]  h-full w-full left-0 z-[1] object-cover ">
        <source src={blackhole} type="video/webm" />
      </video>
      <SubContent playAudio={props.playAudio} setPlayAudio={props.setPlayAudio} script={props.script} setScript={props.setScript} />
    </div>
  );
};

export default Hero;
