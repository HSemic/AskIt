import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const config = {
  borderRadius: '10px'
};

// main theme
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif', // font family
    htmlFontSize: 10 // Together with font-size setting in base.css, this sets 1rem to equal 10px
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#dae0e6' // body background color
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: config.borderRadius
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          borderRadius: config.borderRadius
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: config.borderRadius
        }
      }
    }
  }
});

// applying responsive font size to the theme object before export
export default responsiveFontSizes(theme);
