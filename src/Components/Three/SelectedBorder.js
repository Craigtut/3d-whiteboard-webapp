import { Line } from '@react-three/drei';
import React, { useEffect, useState } from 'react';
import { Box3 } from 'three';

const SelectedBorder = ({ parentRef }) => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const { max, min } = new Box3().setFromObject(parentRef.current);
    const localMax = parentRef.current.worldToLocal(max).multiplyScalar(1.5);
    const localMin = parentRef.current.worldToLocal(min).multiplyScalar(1.5);

    const averageZ = (localMax.z + localMin.z) / 2;

    const boundingPoints = [
      [localMax.x, localMax.y, averageZ],
      [localMax.x, localMin.y, averageZ],
      [localMin.x, localMin.y, averageZ],
      [localMin.x, localMax.y, averageZ],
      [localMax.x, localMax.y, averageZ],
    ];
    setPoints(boundingPoints);
  }, [parentRef]);

  if (points.length < 1) return null;

  return <Line points={points} color="blue" />;
};

export default SelectedBorder;
