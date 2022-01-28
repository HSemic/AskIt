import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    htmlFontSize: 10 // Together with font-size setting in base.css, this sets 1rem to equal 10px
  }
});

export default responsiveFontSizes(theme);
