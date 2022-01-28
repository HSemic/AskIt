import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/organisms/Navbar';
import Home from './components/pages/Home';
import VerticalSpacer from './components/atoms/VerticalSpacer';

const App = (): React.ReactElement => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <VerticalSpacer />
      <Home />
    </>
  );
};

export default App;
