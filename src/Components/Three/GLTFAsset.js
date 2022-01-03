import { useGLTF } from '@react-three/drei';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { Box3 } from 'three';

const GLTFAsset = ({ url }) => {
  const gltf = useGLTF(url);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const boundingBox = new Box3().setFromObject(gltf.scene);
    const z = boundingBox.max.z - boundingBox.min.z;
    const y = boundingBox.max.y - boundingBox.min.y;
    const x = boundingBox.max.x - boundingBox.min.x;

    const largest = Math.max(z, x, y);
    setScale(1 / largest);
  }, [gltf.scene]);

  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} scale={scale} />
    </Suspense>
  );
};

export default GLTFAsset;
