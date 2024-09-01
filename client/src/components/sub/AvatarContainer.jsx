import React, { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { Experience } from "../Experience";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useNavigate } from 'react-router-dom';

const AvatarContainer = (props) => {
  const navigate = useNavigate();
  const [listen, setListen] = useState(false);

  const {
    transcript,
    listening
  } = useSpeechRecognition();
  
  const getNegotiatedResponse = async () => {
    const response = await fetch("http://127.0.0.1:5000/negotiate", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": localStorage.getItem('token')
      },
      body: `query=${encodeURIComponent(transcript)}&uniq_id=${encodeURIComponent(props.currProduct)}&curr_price=${encodeURIComponent(props.currPrice)}`
    });
    if (response.status === 200) {
      const res = await response.json();
      props.setText(res.response);
      props.setNegotiatedPrice(res.newPrice);
      props.setCurrPrice(res.newPrice);
    }
  }

  const getCheckoutResponse = async () => {
    const response = await fetch("http://127.0.0.1:5000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": localStorage.getItem('token')
      },
      body: `query=${encodeURIComponent(transcript)}`
    });
    if (response.status === 200) {
      const res = await response.json();
      props.setText(res.response);
    }
  }

  const getIntent = async (transcript) => {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `query=${encodeURIComponent(transcript)}`
    });
    if (response.status === 200) {
      const res = await response.json();
      props.setIntent(res.intent);
      if (res.intent === "show_products") {
        navigate('/products');
        props.setAnimation("Pointing");
        props.setIntent("");
      }
      else if (res.intent === "negotiation") {
        props.setAnimation("Talking");
        getNegotiatedResponse();
      }
      else if (res.intent === "checkout") {
        props.setAnimation("Thankful");
        getCheckoutResponse();
      }
    }
  };

  useEffect(()=>{
    if (!listening && transcript) {
      props.setAudioTranscript(transcript);
      if (transcript.includes('cart')) {
        props.setIntent("add_to_cart");
      }
      else if(transcript.includes("tell")) {
        props.setIntent("describe_product");
      }
      else if(transcript.includes("complete") && transcript.includes("purchase")) {
        props.setIntent("complete_purchase");
      }
      else {
        getIntent(transcript);
      }
    }
      //eslint-disable-next-line
  }, [listening, transcript]);

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
        <Experience text={props.text} animation={props.animation} setAnimation={props.setAnimation} listen={listen} />
      </Canvas>
    </div>
  );
}

export default AvatarContainer;
