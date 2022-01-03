import { useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import { useSpring, animated } from '@react-spring/three';
import { useDrag } from '@use-gesture/react';

import GLTFAsset from '../../../Components/Three/GLTFAsset';
import LineAsset from '../../../Components/Three/LineAsset';
import TextAsset from '../../../Components/Three/TextAsset';

import { useUpdateBoardObject } from '../../../Services/boardObjects';
import { screenToWorldSpace } from '../../../Utils/screenSpaceConversion';
import { useWhiteboardStore } from '../../../Stores';
import SelectedBorder from '../../../Components/Three/SelectedBorder';

const BoardObject = ({ boardObject, boardUID, draggable, selectable }) => {
  const groupRef = useRef();
  const { size, camera } = useThree();
  const updateObject = useUpdateBoardObject(boardUID, boardObject.uid);
  const { selectObject, selectedObject } = useWhiteboardStore((state) => ({ selectObject: state.selectObject, selectedObject: state.selectedObject }));

  // Object interaction and animtion
  const [currX, currY, currZ] = boardObject.position;
  const [animStyle, api] = useSpring(() => ({ position: boardObject.position, config: { mass: 3, friction: 40, tension: 800 } }));
  // update position if props change
  api.start({ immediate: true, position: [currX, currY, currZ] });

  const bindGestures = useDrag(
    ({ xy: [screenX, screenY], down, active, event }) => {
      event.stopPropagation();
      const worldSpaceMouseVec = screenToWorldSpace({ xy: [screenX, screenY], z: 1, size, camera });
      api.start({
        immediate: true,
        position: down ? screenToWorldSpace({ xy: [screenX, screenY], z: 2, size, camera }).toArray() : worldSpaceMouseVec.toArray(),
      });

      // Once released, update position in db
      if (!active) {
        updateObject({
          ...boardObject,
          position: worldSpaceMouseVec.toArray(),
        });
      }
    },
    {
      eventOptions: { pointer: true },
      enabled: draggable,
    }
  );

  const handleClick = (e) => {
    if (selectable) {
      e.stopPropagation();
      selectObject(boardObject);
    }
  };

  // render correct object inside group
  const renderObject = () => {
    switch (boardObject.type) {
      case 'gltf':
        return <GLTFAsset url={boardObject.data.url} />;
      case 'drawing':
        return <LineAsset points={boardObject.data.points} />;
      case 'text':
        return <TextAsset text={boardObject.data.text} />;
      default:
        return null;
    }
  };

  return (
    <animated.group position={boardObject.position} scale={boardObject.scale} ref={groupRef} onClick={handleClick} {...animStyle} {...bindGestures()}>
      {selectedObject?.uid === boardObject.uid ? <SelectedBorder parentRef={groupRef} /> : null}
      {renderObject()}
    </animated.group>
  );
};

export default BoardObject;
