import React from 'react';
import { Environment, OrbitControls } from "@react-three/drei";
import { Avatar } from "./Avatar";

export const Experience = (props) => {
  return (
    <>
      <OrbitControls />
      <Avatar text={props.text} listen={props.listen} animation={props.animation} position={[0, -2.2, 5]} scale={1.9} />
      {/* <Avatar /> */}
      <Environment preset="sunset" />
    </>
  );
};
