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
          // backgroundColor: '#dae0e6', // body background color
          minHeight: '100vh',
          backgroundColor: '#FFFF20',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Cdefs%3E%3CradialGradient id='a' cx='396' cy='281' r='514' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%236557DD'/%3E%3Cstop offset='1' stop-color='%23091033'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='400' y1='148' x2='400' y2='333'%3E%3Cstop offset='0' stop-color='%238D83FF' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%238D83FF' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='400'/%3E%3Cg fill-opacity='0.4'%3E%3Ccircle fill='url(%23b)' cx='267.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='532.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='400' cy='30' r='300'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover'
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
