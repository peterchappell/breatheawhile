import {createMuiTheme} from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0277bd',
    },
    secondary: {
      main: '#c1185b',
    },
    darkBackground: {
      light: '#37474f',
      main: '#263238',
      dark: '#1d262b',
    }
  },
});

export default theme;