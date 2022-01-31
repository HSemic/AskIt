import * as React from 'react';

import { Provider } from 'react-redux';
import store from './app/_redux/store';

import renderer from 'react-test-renderer';

import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';

import theme from './styles/theme';

import { AuthProvider } from './components/providers/AuthProvider';

import App from './App';

it('expect to render App Component', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AuthProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AuthProvider>
        </Provider>
      </ThemeProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
