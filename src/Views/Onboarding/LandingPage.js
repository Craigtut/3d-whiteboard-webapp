import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../Components/Button';
import Logo from '../../Images/Logo.svg';
import { useCreateNewBoard } from '../../Services/boards';

import { Colors, Typography } from '../../Theme';

const LandingPage = () => {
  const createBoard = useCreateNewBoard();
  const navigate = useNavigate();

  // create new board on button click and navigate to the new board
  const handleNewBoardClick = () => {
    const uid = createBoard();
    navigate(`/board/${uid}`);
  };

  return (
    <div style={styles.hero}>
      <img style={styles.logo} src={Logo} alt="Canvas Logo" />
      <h2 style={{ ...Typography.subtitle, opacity: '0.72', margin: '4px 0 48px' }}>Your 3 dimensional whiteboard</h2>
      <Button text="Create New Board" color={Colors.ColorAccentsLightPrimary} onClick={handleNewBoardClick} />
    </div>
  );
};

const styles = {
  hero: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '360px',
  },
};

export default LandingPage;
