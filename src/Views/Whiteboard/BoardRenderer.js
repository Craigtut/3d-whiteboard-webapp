/* eslint-disable no-undef */
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useContextBridge } from '@react-three/drei';

import WhiteboardScene from './Three/WhiteboardScene';

const BoardRenderer = ({ boardData, style }) => {
  const ContextBridge = useContextBridge(window.ReactQueryClientContext);

  return (
    <Canvas style={{ ...style, ...styles.canvas }}>
      <ContextBridge>
        <Suspense fallback={null}>
          <WhiteboardScene boardData={boardData} />
        </Suspense>
      </ContextBridge>
    </Canvas>
  );
};

const styles = {
  canvas: {
    touchAction: 'none',
  },
};

export default BoardRenderer;
