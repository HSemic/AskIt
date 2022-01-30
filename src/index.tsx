import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../src/app/_redux/store';
import { fetchUserListRequest } from './app/_redux/actions/userActions';

import { ThemeProvider } from '@mui/material/styles';

import './styles/base.css';
import theme from './styles/theme';

import { AuthProvider } from './components/providers/AuthProvider';

import App from './App';

store.dispatch(fetchUserListRequest());

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
