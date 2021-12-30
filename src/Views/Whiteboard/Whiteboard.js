import React, { Suspense } from 'react';

import BoardRenderer from './Three/BoardRenderer';
import CircleLoadingAnimation from '../../Components/CircleLoadingAnimation';

import Logo from '../../Images/Logo.svg';

import { Colors } from '../../Theme';

const Whiteboard = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContents}>
          <img src={Logo} alt="logo" />
        </div>
      </div>
      <Suspense fallback={<CircleLoadingAnimation />}>
        <BoardRenderer style={styles.board} />
      </Suspense>
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
  },
  board: {
    width: '100%',
    height: '100vh',
  },
};

export default Whiteboard;