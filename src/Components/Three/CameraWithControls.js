/* eslint-disable no-undef */

import React, { useRef, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { useGesture } from '@use-gesture/react';

const AnimatedCamera = animated(PerspectiveCamera);

const CameraWithControls = ({ dragTool, ...props }) => {
  const camRef = useRef();
  const [{ x, y }, api] = useSpring(() => ({ from: { y: 0, x: 0 }, config: { mass: 0.01, tension: 100, friction: 5 } }));

  const dragSpeed = 0.011;
  const fn = useCallback(
    ({ offset }) => {
      api.start({ x: -offset[0] * dragSpeed, y: offset[1] * dragSpeed });
    },
    [api]
  );

  const scrollSpeed = 0.02;
  const handleScroll = useCallback(
    ({ offset }) => {
      api.start({ x: offset[0] * scrollSpeed, y: -offset[1] * scrollSpeed });
    },
    [api]
  );

  const dragOptions = { pointer: { buttons: dragTool ? [1, 4] : [4] } };
  useGesture({ onWheel: handleScroll, onDrag: fn }, { target: window, drag: dragOptions });

  useFrame(() => {
    camRef.current.position.set(x.get(), y.get(), 20);
  });
  return <AnimatedCamera ref={camRef} makeDefault {...props} position={[0, 0, 20]} />;
};

export default CameraWithControls;
