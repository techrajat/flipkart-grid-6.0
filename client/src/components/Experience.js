import React from 'react';
import { Environment, OrbitControls } from "@react-three/drei";
import { Avatar } from "./Avatar";

export const Experience = (props) => {
  return (
    <>
      <OrbitControls />
      <Avatar text={props.text} listen={props.listen} animation={props.animation} setAnimation={props.setAnimation} position={[0, -2.2, 5]} scale={2} />
      <Environment preset="sunset" />
    </>
  );
};
