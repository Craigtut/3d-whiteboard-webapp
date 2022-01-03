import { Text } from '@react-three/drei';
import React from 'react';

const TextAsset = ({ text }) => {
  return (
    <Text color="black" anchorX="left" anchorY="middle">
      {text}
    </Text>
  );
};

export default TextAsset;
