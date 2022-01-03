import React, { Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader } from '@react-three/drei';

import BoardRenderer from './BoardRenderer';
import CircleLoadingAnimation from '../../Components/CircleLoadingAnimation';
import { useCreateNewBoard, useSubscribeToBoard } from '../../Services/boards';
import ShortcutListeners from './ShortcutListeners';
import Button from '../../Components/Button';

import Logo from '../../Images/Logo.svg';

import { Colors } from '../../Theme';
import ToolPanel from './ToolPanel';

const Whiteboard = () => {
  const params = useParams();
  const navigate = useNavigate();
  const boardData = useSubscribeToBoard(params.boardUID);
  const createBoard = useCreateNewBoard();

  // create new board on button click and navigate to the new board
  const handleNewBoardClick = () => {
    const uid = createBoard();
    navigate(`/board/${uid}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContents}>
          <img src={Logo} alt="logo" />
          <div style={styles.rightHeader}>
            <Button text="New Board" onClick={handleNewBoardClick} style={styles.button} />
          </div>
        </div>
      </div>
      <ToolPanel boardUID={boardData.uid} />
      <Suspense fallback={<CircleLoadingAnimation />}>
        <BoardRenderer style={styles.board} boardData={boardData} />
      </Suspense>
      <ShortcutListeners />
      <Loader />
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
  },
  header: {
    position: 'absolute',
    zIndex: 1,
    display: 'flex',
    width: '100%',
    height: 72,
    backgroundColor: Colors.ColorWhite0,
    boxShadow: '0px 4px 20px rgba(11, 11, 13, 0.08)',
    borderRadius: '0 0 20px 20px',
    alignItems: 'center',
  },
  headerContents: {
    margin: '0 44px',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    margin: '0 16px',
  },
  board: {
    width: '100%',
    height: '100vh',
  },
};

export default Whiteboard;
