import ReactDOM from 'react-dom';

import { ThemeProvider } from '@mui/material/styles';

import './styles/base.css';
import theme from './styles/theme';

import App from './App';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
