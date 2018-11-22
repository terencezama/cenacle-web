import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ff5131',
      main: '#d50000',
      dark: '#9b0000',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ff7961',
      main: '#9b0000',
      dark: '#ba000d',
      contrastText: '#ffffff',
    },
  },
});

export default theme;