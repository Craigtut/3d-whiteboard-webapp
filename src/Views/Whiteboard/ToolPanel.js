import React from 'react';

import ToolItem from '../../Components/ToolItem';
import { useToolBarStore } from '../../Stores';
import CursorImage from '../../Images/Cursor.svg';
import GrabberImage from '../../Images/Grabber.svg';
import PenImage from '../../Images/Pen.svg';
import ModelImage from '../../Images/Model.svg';

import { Colors } from '../../Theme';

const toolList = [
  { name: 'Cursor', image: CursorImage, toolUID: 0 },
  { name: 'Grabber', image: GrabberImage, toolUID: 1 },
  { name: 'Pen', image: PenImage, toolUID: 2 },
  { name: 'Model Import', image: ModelImage, toolUID: 3 },
];

const ToolPanel = () => {
  const selectedTool = useToolBarStore((state) => state.selectedTool);
  const selectTool = useToolBarStore((state) => state.selectTool);

  const handleSelection = (toolUID) => {
    if (toolUID === 3) {
      // handle model upload
      return;
    }
    selectTool(toolUID);
  };

  return (
    <div style={styles.toolPanel}>
      {toolList.map((tool) => {
        return <ToolItem image={tool.image} selected={selectedTool === tool.toolUID} onClick={() => handleSelection(tool.toolUID)} key={tool.name} />;
      })}
    </div>
  );
};
const styles = {
  toolPanel: {
    position: 'fixed',
    zIndex: 1,
    top: '50%',
    left: '28px',
    transform: 'translate(0, -50%)',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colors.ColorSlate80,
    borderRadius: '12px',
    overflow: 'hidden',
  },
};

export default ToolPanel;
