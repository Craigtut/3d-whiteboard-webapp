/* eslint-disable no-undef */
import React, { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useContextBridge } from '@react-three/drei';

import CameraWithControls from '../../../Components/Three/CameraWithControls';
import { useToolBarStore } from '../../../Stores';
import WhiteboardSurface from '../../../Components/Three/WhiteboardSurface';
import BoardObject from '../../../Components/Three/BoardObject';

const BoardRenderer = ({ boardData, style }) => {
  const selectedTool = useToolBarStore((state) => state.selectedTool);
  const ContextBridge = useContextBridge(window.ReactQueryClientContext);

  const boardObjectsArray = useMemo(() => (boardData.boardObjects ? Object.values(boardData.boardObjects) : []), [boardData.boardObjects]);

  return (
    <Canvas style={{ ...style, ...styles.canvas }}>
      <ContextBridge>
        <Suspense fallback={null}>
          <CameraWithControls position={[0, 0, 10]} fov={30} dragTool={selectedTool === 1} />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {boardObjectsArray.map((boardObject) => {
            return <BoardObject boardObject={boardObject} boardUID={boardData.uid} draggable={selectedTool === 0} />;
          })}
          <WhiteboardSurface size={128} />
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
