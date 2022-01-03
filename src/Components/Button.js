import { useSpring, animated } from '@react-spring/web';
import { useHover } from '@use-gesture/react';
import React from 'react';

import { Colors, Typography } from '../Theme';

const Button = ({ text, color, onClick, style }) => {
  const [{ opacity }, api] = useSpring(() => ({ opacity: 1 }));
  const bindGestures = useHover(({ active }) => {
    api.update({ opacity: active ? 0.56 : 1 }); // To-Do investigate why anim isn't working
  });

  return (
    <animated.button type="button" style={{ ...styles.button, ...style, backgroundColor: color, opacity }} onClick={onClick} {...bindGestures()}>
      {text}
    </animated.button>
  );
};

const styles = {
  button: {
    padding: '12px 24px',
    ...Typography.bodyAlt,
    color: Colors.ColorTextDark,
    borderRadius: '8px',
  },
};

Button.defaultProps = {
  color: Colors.ColorSlate80,
  text: 'Button',
};

export default Button;
