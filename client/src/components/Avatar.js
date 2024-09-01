import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useGraph } from '@react-three/fiber';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

const corresponding = {
  A: "viseme_PP",
  B: "viseme_kk",
  C: "viseme_I",
  D: "viseme_AA",
  E: "viseme_O",
  F: "viseme_U",
  G: "viseme_FF",
  H: "viseme_TH",
  X: "viseme_PP",
};

const defaultVoice = {
  voiceURI: 'Microsoft Mark - English (United States)',
  name: 'Microsoft Mark - English (United States)',
  lang: 'en-US',
  localService: true,
  default: false
};


const mouthCues = ["X", "B", "A", "C", "E", "F", "D", "H", "G"];

export function Avatar(props) {
  const [utterance, setUtterance] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const { scene } = useGLTF('/models/66c388c9119519ed2a436546.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { animations: idleAnimation } = useFBX("/animations/Idle.fbx");
  const { animations: greetingAnimation } = useFBX("/animations/Greeting.fbx");
  const { animations: talkingAnimation } = useFBX("/animations/Talking.fbx");
  const { animations: listeningAnimation } = useFBX("/animations/Listening.fbx");
  const { animations: pointingAnimation } = useFBX("/animations/Pointing.fbx");
  const { animations: saluteAnimation } = useFBX("/animations/Salute.fbx");
  const { animations: thankfulAnimation } = useFBX("/animations/Thankful.fbx");

  idleAnimation[0].name = "Idle";
  greetingAnimation[0].name = "Greeting";
  talkingAnimation[0].name = "Talking";
  listeningAnimation[0].name = "Listening";
  pointingAnimation[0].name = "Pointing";
  saluteAnimation[0].name = "Salute";
  thankfulAnimation[0].name = "Thankful";

  const group = useRef();
  const { actions } = useAnimations([idleAnimation[0], greetingAnimation[0], talkingAnimation[0], listeningAnimation[0], pointingAnimation[0], saluteAnimation[0], thankfulAnimation[0]], group);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const setVoiceOnceAvailable = () => {
      const voices = synth.getVoices();
      // let selectedVoice = voices.find(v => v.name === defaultVoice.name);
      let selectedVoice = voices[0];

      if (selectedVoice) {
        const u = new SpeechSynthesisUtterance(props.text);
        u.voice = selectedVoice;
        u.onstart = () => setIsSpeaking(true);
        u.onend = () => setIsSpeaking(false);
        setUtterance(u);
      } else {
        synth.onvoiceschanged = () => {
          const updatedVoices = synth.getVoices();
          selectedVoice = updatedVoices.find(v => v.name === defaultVoice.name);
          if (selectedVoice) {
            const u = new SpeechSynthesisUtterance(props.text);
            u.voice = selectedVoice;
            u.onstart = () => setIsSpeaking(true);
            u.onend = () => setIsSpeaking(false);
            setUtterance(u);
          }
        };
      }
    };

    setVoiceOnceAvailable();

    return () => {
      synth.cancel();
    };
  }, [props.text, props.listen]);

  const handlePlay = () => {
    if (utterance) {
      utterance.pitch = 1;
      utterance.rate = 1.1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (utterance) {
      handlePlay();
      props.setAnimation(props.animation);
    } 
    else {
      props.setAnimation("Idle");
    }
    //eslint-disable-next-line
  }, [utterance]);

  useEffect(()=>{
    if(!isSpeaking) {
      props.setAnimation("Idle");
    }
    //eslint-disable-next-line
  }, [isSpeaking]);

  useEffect(() => {
    actions[props.animation]?.reset().fadeIn(0.5).play();
    return () => {
      actions[props.animation]?.fadeOut(0.5);
    };
  }, [props.animation, actions]);

  useFrame(({ clock }) => {
    if (isSpeaking) {
      const time = clock.getElapsedTime();
  
      // Update lip movement every 0.1 seconds
      if (time % 0.1 < 0.016) {
        Object.values(corresponding).forEach(value => {
          if (nodes.Wolf3D_Head.morphTargetDictionary[value] !== undefined && nodes.Wolf3D_Teeth.morphTargetDictionary[value] !== undefined) {
            nodes.Wolf3D_Head.morphTargetInfluences[nodes.Wolf3D_Head.morphTargetDictionary[value]] = 0;
            nodes.Wolf3D_Teeth.morphTargetInfluences[nodes.Wolf3D_Teeth.morphTargetDictionary[value]] = 0;
          }
        });
  
        const randomIndex = Math.floor(Math.random() * mouthCues.length);
        const randomCue = mouthCues[randomIndex];
        const morphTarget = corresponding[randomCue];
  
        if (nodes.Wolf3D_Head.morphTargetDictionary[morphTarget] !== undefined && nodes.Wolf3D_Teeth.morphTargetDictionary[morphTarget] !== undefined) {
          nodes.Wolf3D_Head.morphTargetInfluences[nodes.Wolf3D_Head.morphTargetDictionary[morphTarget]] = 1;
          nodes.Wolf3D_Teeth.morphTargetInfluences[nodes.Wolf3D_Teeth.morphTargetDictionary[morphTarget]] = 1;
        }
      }
    } else {
      // Clear lip movements when not speaking
      Object.values(corresponding).forEach(value => {
        if (nodes.Wolf3D_Head.morphTargetDictionary[value] !== undefined && nodes.Wolf3D_Teeth.morphTargetDictionary[value] !== undefined) {
          nodes.Wolf3D_Head.morphTargetInfluences[nodes.Wolf3D_Head.morphTargetDictionary[value]] = 0;
          nodes.Wolf3D_Teeth.morphTargetInfluences[nodes.Wolf3D_Teeth.morphTargetDictionary[value]] = 0;
        }
      });
    }
  });

  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      <skinnedMesh geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Glasses.geometry} material={materials.Wolf3D_Glasses} skeleton={nodes.Wolf3D_Glasses.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
      <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
      <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
    </group>
  );
}

useGLTF.preload('/models/66c388c9119519ed2a436546.glb');
