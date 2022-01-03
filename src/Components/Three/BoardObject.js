import { useThree } from '@react-three/fiber';
import React from 'react';
import { useSpring, animated } from '@react-spring/three';
import { useDrag } from '@use-gesture/react';

import GLTFAsset from './GLTFAsset';
import { useUpdateBoardObject } from '../../Services/boardObjects';
import TextAsset from './TextAsset';

const BoardObject = ({ boardObject, draggable, boardUID }) => {
  const { size, viewport } = useThree();
  const spaceConversion = size.width / viewport.width;
  const updateObject = useUpdateBoardObject(boardUID, boardObject.uid);

  // Object interaction and animtion
  const [currX, currY, currZ] = boardObject.position;
  const [animStyle, api] = useSpring(() => ({ position: boardObject.position, config: { mass: 3, friction: 40, tension: 800 } }));
  // update position if props change
  api.start({ immediate: true, position: [currX, currY, currZ] });

  const bindGestures = useDrag(
    ({ movement: [screenX, xcreenY], down, active }) => {
      api.start({
        immediate: true,
        position: down
          ? [currX + screenX / spaceConversion, currY - xcreenY / spaceConversion, currZ + 1]
          : [currX + screenX / spaceConversion, currY - xcreenY / spaceConversion, currZ],
      });

      // Once released, update position in db
      if (!active) {
        updateObject({
          ...boardObject,
          position: [currX + screenX / spaceConversion, currY - xcreenY / spaceConversion, currZ],
        });
      }
    },
    {
      eventOptions: { pointer: true },
      enabled: draggable,
    }
  );

  // render correct object inside group
  const renderObject = () => {
    switch (boardObject.type) {
      case 'gltf':
        return <GLTFAsset url={boardObject.data.url} />;
      case 'text':
        return <TextAsset text={boardObject.data.text} />;
      default:
        return null;
    }
  };

  return (
    <animated.group position={boardObject.position} scale={boardObject.scale} {...animStyle} {...bindGestures()}>
      {renderObject()}
    </animated.group>
  );
};

export default BoardObject;
