import React, { useState } from 'react';
import './App.css';
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Product } from "./components/Product";
import IntroPage from "./components/IntroPage";

function App() {
  const [playAudio, setPlayAudio] = useState(true);
  const [script, setScript] = useState("welcome");

  const[mediaStream, setMediaStream] = useState(null);
  async function startMicrophone() {
    try {
      let newMediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(newMediaStream);
      console.log('Microphone access granted');

      // Use mediaStream here, e.g., connect it to an audio element or process it

    } catch (error) {
      console.error('Microphone access denied', error);
    }
  }

  // Function to stop the microphone
  function stopMicrophone() {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => {
        track.stop();
        console.log('Stopped track:', track);
      });
    }
    setMediaStream(null);
  }

  const myFunc=()=>{
    if(script === "welcome") {
      setScript("listen");
      startMicrophone();
      // Microphone on
    }
    else if(script === "listen") {
      // Microphone off
      stopMicrophone();
      setScript("showProducts");
    }
  }
  return (
    <div className="container">
      <div className="canvas-container ">
        <Canvas onClick={myFunc} shadows camera={{ position: [0, -2, 18], fov: 18 }}>
          <Experience playAudio={playAudio} script={script} />
        </Canvas>
      </div>

      <div className="IntroPage">
        <IntroPage />
      </div>

      {/* <div className="flex w-full"><Product/></div> */}
    </div>
  );
}

export default App;
