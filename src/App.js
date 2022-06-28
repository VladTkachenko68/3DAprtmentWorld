import * as THREE from "three";
import { Suspense, useEffect, useLayoutEffect,useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ScrollControls,
  Sky,
  useScroll,
  useGLTF,
  useAnimations,
  OrbitControls,
} from "@react-three/drei";

export default function App() {
  const [hovered, hover] = useState(false)
  const mouse = useRef([0, 0])
  useEffect(() => {
    document.body.style.cursor = hovered
      ? 'pointer'
      : "url('https://raw.githubusercontent.com/chenglou/react-motion/master/demos/demo8-draggable-list/cursor.png') 39 39, auto"
  }, [hovered])
  return (  
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{ position: [0, 10, 10], near: 0.4, far: 1000 }}
      style={{ height: "100vh" }}
    >
      <ambientLight intensity={0.03} />
      <fog attach="fog" args={["#354AA1", 5, 18]} density = "0.1"/>
      <spotLight
        angle={0.14}
        color="#CDDAE0"
        penumbra={1}
        position={[25, 50, -20]}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
        castShadow
      />
      <Sky scale={1000} sunPosition={[0, 0, 0]} />
      {/* <Suspense fallback={null}> */}
        {/* Wrap contents you want to scroll into <ScrollControls> */}
        {/* <ScrollControls pages={3}> */}
        <LittlestTokyo mouse={mouse} hover={hover} scale={0.1} position={[0, 6, -4]} />
        {/* <OrbitControls /> */}
        {/* </ScrollControls> */}
      {/* </Suspense> */}
    </Canvas>
  );
}

function LittlestTokyo({ hover }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, state.mouse.x * 2, 0.05)
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, state.mouse.y / 2, 0.05)
      ref.current.rotation.y = 0.8
    }
  })
  // This hook gives you offets, ranges and other useful things
  // const scroll = useScroll()
  const { scene, nodes, animations } = useGLTF("/terrain.glb");
  const { actions } = useAnimations(animations, scene);
  // useLayoutEffect(() => Object.values(nodes).forEach((node) => (node.receiveShadow = node.castShadow = true)))
  // useEffect(() => void (actions['Take 001'].play().paused = true), [actions])
  // useFrame((state, delta) => {
  //   const action = actions['Take 001']
  //   // The offset is between 0 and 1, you can apply it to your models any way you like
  //   const offset = 1 - scroll.offset
  //   action.time = THREE.MathUtils.damp(action.time, (action.getClip().duration / 2) * offset, 100, delta)
  //   state.camera.position.set(Math.sin(offset) * -10, Math.atan(offset * Math.PI * 2) * 5, Math.cos((offset * Math.PI) / 3) * -10)
  //   state.camera.lookAt(0, 0, 0)
  // })
  // return <primitive object={scene} {...props} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}/>;
  return (
    <div>
    <group ref={ref}>
    <primitive object={scene} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}/>
      {/* <ReactAtom position={[35, -20, 0]} scale={[1, 0.5, 1]} /> */}
    </group>
  </div>
  )
}

/*
author: glenatron (https://sketchfab.com/glenatron)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/94b24a60dc1b48248de50bf087c0f042
title: Littlest Tokyo */
useGLTF.preload("/terrain.glb");
