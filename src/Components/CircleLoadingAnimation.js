/* eslint-disable no-shadow */
import React from 'react';
import { useSpring, animated, config } from '@react-spring/web';

import { Colors } from '../Theme';

const CircleLoadingAnimation = ({ dark, size, strokeWidth }) => {
  const spinnerColor = dark ? Colors.ColorPurple30 : Colors.ColorPurple50;

  const { x } = useSpring({
    from: { x: 0 },
    to: { x: 100 },
    config: config.slow,
    loop: true,
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size + strokeWidth} ${size + strokeWidth}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <animated.circle cx={size / 2} cy={size / 2} r={size / 2} stroke={spinnerColor} strokeWidth={strokeWidth} strokeDasharray={50} strokeDashoffset={x} />
    </svg>
  );
};

CircleLoadingAnimation.defaultProps = {
  dark: false,
  size: 36,
  strokeWidth: 8,
};

export default CircleLoadingAnimation;
