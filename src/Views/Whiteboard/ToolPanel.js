import React, { useRef } from 'react';
import { Vector3 } from 'three';

import ToolItem from '../../Components/ToolItem';
import { useToolBarStore } from '../../Stores';
import CursorImage from '../../Images/Cursor.svg';
import GrabberImage from '../../Images/Grabber.svg';
import PenImage from '../../Images/Pen.svg';
import ModelImage from '../../Images/Model.svg';

import { uploadFile, useAddBoardObject } from '../../Services/boardObjects';

import { Colors } from '../../Theme';

// All tools in the sidebar - TO-DO extract to seperate file
const toolList = [
  { name: 'Cursor', image: CursorImage, toolUID: 0 },
  { name: 'Grabber', image: GrabberImage, toolUID: 1 },
  { name: 'Pen', image: PenImage, toolUID: 2 },
  { name: 'Model Import', image: ModelImage, toolUID: 3 },
];

const ToolPanel = ({ boardUID }) => {
  const uploaderRef = useRef();
  const addBoardObject = useAddBoardObject(boardUID);
  const selectedTool = useToolBarStore((state) => state.selectedTool);
  const selectTool = useToolBarStore((state) => state.selectTool);

  // called whenever a tool is selected
  const handleSelection = (toolUID) => {
    if (toolUID === 3) {
      uploaderRef.current.click();
      return;
    }
    selectTool(toolUID);
  };

  // called when uploader file changes
  const handleFileUpload = async (e) => {
    if (uploaderRef.current.files.length > 0) {
      const file = uploaderRef.current.files[0];
      const metadata = await uploadFile(file);

      addBoardObject({
        type: 'gltf',
        position: [0, 0, 1],
        scale: 1,
        data: metadata,
      });
    }
  };

  return (
    <div style={styles.toolPanel}>
      {toolList.map((tool) => {
        return <ToolItem image={tool.image} selected={selectedTool === tool.toolUID} onClick={() => handleSelection(tool.toolUID)} key={tool.name} />;
      })}

      <input id="modelUploader" type="file" ref={uploaderRef} style={{ display: 'none' }} onChange={handleFileUpload} />
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
