"use client";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Define MUI Theme
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'circular std',
      fontWeight: '450',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: "circular std";
          src: local("Circular Std"), url("/fonts/circular-std-font-family/CircularStd-Book.woff");
        }
      `,
    },
  },
});

const ProvideTheme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      {children}
    </ThemeProvider>
  );
};

export { theme, ProvideTheme };