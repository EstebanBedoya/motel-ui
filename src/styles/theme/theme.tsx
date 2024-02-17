/** @package */
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    violet: Palette['primary'];
  }
  interface PaletteOptions {
    violet?: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0054A3',
    },
    success: {
      main: '#00AA07',
    },
    error: {
      main: '#E40000',
      light: '#E4000080',
    },
    warning: {
      main: '#FFA800',
      light: '#FFA80080',
    },
    violet: {
      main: '#9431D0',
    },
    text: {
      primary: '#000000',
      secondary: '#00000080',
    },
  },
  typography: {
    fontFamily: ['sans-serif'].join(','),
  },
});

export default theme;
