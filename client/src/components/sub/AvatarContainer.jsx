import React, { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { Experience } from "../Experience";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const AvatarContainer = (props) => {
  const [listen, setListen] = useState(false);

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(()=>{
    if (!listening && transcript) {
        console.log('Final Transcript:', transcript);
      }
  }, [listening, transcript])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const changeScript = () => {
    props.setText("Speak.");
    props.setAnimation("Listening");
    setListen(!listen);
    SpeechRecognition.startListening();
  };

  return (
    <div className="w-full h-full">
      <Canvas 
        onClick={changeScript} 
        shadows 
        camera={{ position: [0, -2, 18], fov: 18 }}
      >
        <Experience text={props.text} animation={props.animation} listen={listen} />
      </Canvas>
    </div>
  );
}

export default AvatarContainer;
