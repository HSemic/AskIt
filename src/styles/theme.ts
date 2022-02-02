import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const config = {
  borderRadius: '10px'
};

// main theme
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif', // font family
    htmlFontSize: 10, // Together with font-size setting in base.css, this sets 1rem to equal 10px
    h1: {
      fontSize: '3rem',
      fontWeight: 500
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#dae0e6', // body background color
          minHeight: '100vh'
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0
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
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          borderRadius: `${config.borderRadius} ${config.borderRadius} 0 0`
        }
      }
    }
  }
});

// applying responsive font size to the theme object before export
export default responsiveFontSizes(theme);
