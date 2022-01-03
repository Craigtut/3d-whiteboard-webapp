import React from 'react';
import { useTexture } from '@react-three/drei';
import { DoubleSide, RepeatWrapping } from 'three';

import whiteboardTextureTile from '../../Images/Textures/whiteboardTextureTile.png';

const WhiteboardSurface = ({ planeSize, ...props }) => {
  const texture = useTexture(whiteboardTextureTile);

  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(planeSize * 4, planeSize * 4);

  return (
    <mesh {...props}>
      <planeGeometry args={[planeSize, planeSize]} />
      <meshStandardMaterial map={texture} side={DoubleSide} />
    </mesh>
  );
};

export default WhiteboardSurface;
