import React from 'react';
import { Environment, OrbitControls } from "@react-three/drei";
import { Avatar } from "./Avatar";

export const Experience = (props) => {
  return (
    <>
      <OrbitControls />
      <Avatar text={props.text} script={props.script} position={[0, -2.4, 5]} scale={2} />
      {/* <Avatar /> */}
      <Environment preset="sunset" />
    </>
  );
};
