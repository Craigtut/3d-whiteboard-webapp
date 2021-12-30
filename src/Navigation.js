import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './Views/Onboarding/LandingPage';
import Whiteboard from './Views/Whiteboard/Whiteboard';

const Navigation = () => {
  const isAuthed = true;
  return <BrowserRouter>{isAuthed ? <AppNavigation /> : <OnboardingNavigation />}</BrowserRouter>;
};

const AppNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="board/:boardUID" element={<Whiteboard />} />
    </Routes>
  );
};

const OnboardingNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default Navigation;
