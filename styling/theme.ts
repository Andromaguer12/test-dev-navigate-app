import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#d9e9eb',
      main: '#006B77',
      dark: '#005059',
      contrastText: '#4c979f',
    },
    secondary: {
      light: '#fff8d9',
      main: '#FFCD03',
      dark: '#bf9a02',
      contrastText: '#ffcd4e',
    },
  },
  typography: {
    h1: { fontSize: '36px', fontWeight: 800 },
    h2: { fontSize: '30px' },
    h3: { fontSize: '24px' },
    h4: { fontSize: '20px' },
    h5: { fontSize: '16px', fontWeight: 600 },
    h6: { fontSize: '14px', fontWeight: 400 },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 770,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
