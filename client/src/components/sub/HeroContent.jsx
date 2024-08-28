import React, { useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { Experience } from "../../components/Experience";

const HeroContent = (props) => {
  // const [playAudio, setPlayAudio] = useState(true);
  // const [script, setScript] = useState("welcome");
  
  const [mediaStream, setMediaStream] = useState(null);

  async function startMicrophone() {
    try {
      let newMediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(newMediaStream);
      console.log('Microphone access granted');
    } catch (error) {
      console.error('Microphone access denied', error);
    }
  }

  function stopMicrophone() {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => {
        track.stop();
        console.log('Stopped track:', track);
      });
    }
    setMediaStream(null);
  }

  const myFunc = () => {
    if (props.script === "welcome") {
      props.setScript("listen");
      startMicrophone();
    } else if (props.script === "listen") {
      stopMicrophone();
      props.setScript("showProducts");
    }
  };

  return (
    <div className=" w-full h-full">
      <Canvas 
        onClick={myFunc} 
        shadows 
        camera={{ position: [0, -2, 18], fov: 18 }}
      >
        <Experience playAudio={props.playAudio} script={props.script} />
      </Canvas>
    </div>
  );
}

export default HeroContent;
