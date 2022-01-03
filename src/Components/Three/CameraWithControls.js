/* eslint-disable no-undef */

import React, { useRef } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { useGesture } from '@use-gesture/react';

const CameraWithControls = ({ dragTool, position, ...props }) => {
  const camRef = useRef();
  const [animStyles, api] = useSpring(() => ({ position: position, config: { mass: 0.01, tension: 100, friction: 5 } }));

  const handleDrag = ({ delta: [x, y] }) => {
    const dragSpeed = camRef.current.position.z * 0.0012;
    api.start({ immediate: true, position: [camRef.current.position.x - x * dragSpeed, camRef.current.position.y + y * dragSpeed, camRef.current.position.z] });
  };

  const handleScroll = ({ delta: [x, y], altKey }) => {
    const scrollSpeed = camRef.current.position.z * 0.002;
    if (altKey) {
      api.start({ position: [camRef.current.position.x, camRef.current.position.x, camRef.current.position.z - y] });
    } else {
      api.start({ position: [camRef.current.position.x + x * scrollSpeed, camRef.current.position.y - y * scrollSpeed, camRef.current.position.z] });
    }
  };

  const handlePinch = ({ offset: [d, a] }) => {
    api.start({ position: [camRef.current.position.x, camRef.current.position.y, d] });
  };

  const dragOptions = { pointer: { buttons: dragTool ? [1, 4] : [4] } };
  const pinchOptions = { from: position[2] };
  useGesture({ onWheel: handleScroll, onDrag: handleDrag, onPinch: handlePinch }, { target: window, drag: dragOptions, pinch: pinchOptions });

  return (
    <animated.group ref={camRef} {...animStyles}>
      <PerspectiveCamera makeDefault {...props} />;
    </animated.group>
  );
};

export default CameraWithControls;
