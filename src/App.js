import React, { Suspense } from 'react';
import Navigation from './Navigation';

function App() {
  return (
    <div>
      <Suspense fallback={null}>
        <Navigation />
      </Suspense>
    </div>
  );
}

export default App;
