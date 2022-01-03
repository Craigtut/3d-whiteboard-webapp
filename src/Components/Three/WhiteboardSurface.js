import React from 'react';
import { useTexture } from '@react-three/drei';
import { DoubleSide, RepeatWrapping } from 'three';
import { useDrag } from '@use-gesture/react';

import whiteboardTextureTile from '../../Images/Textures/whiteboardTextureTile.png';

const WhiteboardSurface = ({ size }) => {
  const texture = useTexture(whiteboardTextureTile);

  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(size * 4, size * 4);

  const bindGestures = useDrag(({ xy }) => {
    // console.log(xy);
  }, {});

  return (
    <mesh {...bindGestures()}>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial map={texture} side={DoubleSide} />
    </mesh>
  );
};

export default WhiteboardSurface;
