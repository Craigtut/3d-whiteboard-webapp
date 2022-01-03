import React, { useMemo } from 'react';
import { useGesture } from '@use-gesture/react';
import { useThree } from '@react-three/fiber';

import CameraWithControls from '../../../Components/Three/CameraWithControls';
import { useToolBarStore, useWhiteboardStore } from '../../../Stores';
import WhiteboardSurface from '../../../Components/Three/WhiteboardSurface';
import BoardObject from './BoardObject';
import { screenToWorldSpace } from '../../../Utils/screenSpaceConversion';
import { useAddBoardObject } from '../../../Services/boardObjects';

const WhiteboardScene = ({ boardData }) => {
  const { camera, size } = useThree();
  const selectedTool = useToolBarStore((state) => state.selectedTool);
  const selectObject = useWhiteboardStore((state) => state.selectObject);
  const { setNewBoardObject, newBoardObject } = useWhiteboardStore((state) => ({
    setNewBoardObject: state.setNewBoardObject,
    newBoardObject: state.newBoardObject,
  }));
  const addBoardObject = useAddBoardObject(boardData.uid);

  const boardObjectsArray = useMemo(() => (boardData.boardObjects ? Object.values(boardData.boardObjects) : []), [boardData.boardObjects]);

  // Unselect any selected object
  const whiteboardSurfaceClicked = () => {
    selectObject(undefined);
  };

  const onCanvasDrag = ({ xy, active }) => {
    if (selectedTool === 2) {
      const worldSpaceVec = screenToWorldSpace({ xy, z: 0.001, camera, size });

      setNewBoardObject({
        type: 'drawing',
        position: [0, 0, 0],
        scale: 1,
        data: {
          points: newBoardObject ? newBoardObject.data.points.concat([worldSpaceVec.toArray()]) : [worldSpaceVec.toArray()],
        },
      });

      if (!active) {
        // save to db & remove temp new from store
        addBoardObject(newBoardObject);
        setNewBoardObject(undefined);
      }
    }
  };

  const bindGestures = useGesture({ onDrag: onCanvasDrag }, {});

  return (
    <>
      <CameraWithControls position={[0, 0, 10]} fov={30} dragTool={selectedTool === 1} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {newBoardObject ? <BoardObject boardObject={newBoardObject} /> : null}
      {boardObjectsArray.map((boardObject) => {
        return (
          <BoardObject
            key={boardObject.uid}
            boardObject={boardObject}
            boardUID={boardData.uid}
            draggable={selectedTool === 0}
            selectable={selectedTool === 0}
          />
        );
      })}
      <WhiteboardSurface planeSize={128} onClick={whiteboardSurfaceClicked} {...bindGestures()} />
    </>
  );
};

export default WhiteboardScene;
