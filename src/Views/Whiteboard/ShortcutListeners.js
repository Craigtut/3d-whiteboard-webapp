/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDeleteBoardObject } from '../../Services/boardObjects';
import { useWhiteboardStore } from '../../Stores';

const ShortcutListeners = () => {
  const params = useParams();
  const selectedObject = useWhiteboardStore((state) => state.selectedObject);
  const deleteObject = useDeleteBoardObject(params.boardUID, selectedObject?.uid);

  const handleDeleteCurrentlySelected = () => {
    if (selectedObject) {
      deleteObject();
    }
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      switch (e.key) {
        case 'Delete':
          handleDeleteCurrentlySelected();
          break;
        default:
          console.log('Key Pressed', e.key);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  });
  return null;
};

export default ShortcutListeners;
