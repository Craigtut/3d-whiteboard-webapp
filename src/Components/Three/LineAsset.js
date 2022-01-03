import React from 'react';
import { Line } from '@react-three/drei';

const LineAsset = ({ points, color }) => {
  if (points.length < 1) return null;
  return <Line points={points} color={color} lineWidth={1} />;
};

LineAsset.defaultProps = {
  color: 'black',
};

export default LineAsset;
