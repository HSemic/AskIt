import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from '../src/app/_redux/store';

import { ThemeProvider } from '@mui/material/styles';

import './styles/base.css';
import theme from './styles/theme';

import App from './App';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
