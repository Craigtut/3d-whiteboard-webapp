import React from 'react';

import { Colors } from '../Theme';

const ToolItem = ({ image, name, selected, onClick }) => {
  const backgroundColor = selected ? Colors.ColorAccentsLightPrimary : Colors.ColorSlate80;

  return (
    <button style={{ ...styles.container, backgroundColor }} onClick={onClick} type="button">
      <img src={image} alt={`${name} tool`} />
    </button>
  );
};

const styles = {
  container: {
    width: '72px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default ToolItem;
