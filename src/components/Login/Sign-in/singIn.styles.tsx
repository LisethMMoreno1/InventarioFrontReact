import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    background: {
      default: 'hsl(0, 0%, 100%)',
      paper: 'hsl(0, 0%, 100%)',
    },
    text: {
      primary: 'hsl(240, 10%, 3.9%)',
      secondary: 'hsl(240, 5.9%, 10%)',
      disabled: 'hsl(240, 3.8%, 45%)',
    },
    primary: {
      main: 'hsl(240, 5.9%, 10%)',
      contrastText: 'hsl(0, 0%, 98%)',
    },
    secondary: {
      main: 'hsl(240, 4.8%, 95.9%)',
      contrastText: 'hsl(240, 5.9%, 10%)',
    },
    error: {
      main: 'hsl(0, 72%, 51%)',
      contrastText: 'hsl(0, 0%, 98%)',
    },
    divider: 'hsl(240, 5.9%, 90%)',
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: 'YourFontFamily',
    h1: {
      fontFamily: 'YourHeadingFontFamily',
    },
    h2: {
      fontFamily: 'YourHeadingFontFamily',
    },
    h3: {
      fontFamily: 'YourHeadingFontFamily',
    },
    h4: {
      fontFamily: 'YourHeadingFontFamily',
    },
    h5: {
      fontFamily: 'YourHeadingFontFamily',
    },
    h6: {
      fontFamily: 'YourHeadingFontFamily',
    },
  },
});

