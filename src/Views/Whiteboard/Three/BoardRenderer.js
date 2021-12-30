import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { DoubleSide, RepeatWrapping } from 'three';
import whiteboardTextureTile from '../../../Images/Textures/whiteboardTextureTile.png';
import CameraWithControls from '../../../Components/Three/CameraWithControls';

const BoardRenderer = (style) => {
  return (
    <Canvas style={style}>
      <CameraWithControls position={[0, 0, 20]} fov={30} draggable={false} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <WhiteboardBacking size={24} />
    </Canvas>
  );
};

const WhiteboardBacking = ({ size }) => {
  const texture = useTexture(whiteboardTextureTile);

  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(size * 3, size * 3);

  return (
    <mesh>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial map={texture} side={DoubleSide} />
    </mesh>
  );
};

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default BoardRenderer;
