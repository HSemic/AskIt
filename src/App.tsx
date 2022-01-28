import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/organisms/Navbar';

const App = (): React.ReactElement => {
  return (
    <>
      <CssBaseline />
      <Navbar />
    </>
  );
};

export default App;
