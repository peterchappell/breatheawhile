import React from 'react';
import { render } from '@testing-library/react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

type Props = {
  children: Object,
};

const Wrapper = (props: Props) => {
  const { children } = props;
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#01579b',
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

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: Wrapper, ...options });

// re-export everything
export {
  cleanup,
  screen,
  fireEvent,
} from '@testing-library/react';

// override render method
export { customRender as render };
