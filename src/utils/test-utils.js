import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/core/styles';

import { OptionsProvider } from 'context/OptionsContext';
import theme from './muiTheme';

type Props = {
  children: Object,
};

// note: we could allow for specific options to be passed in here (e.g. initial state)
const customRender = (ui, options) => {
  const Wrapper = (props: Props) => {
    const { children } = props;

    return (
      <ThemeProvider theme={theme}>
        <OptionsProvider>
          {children}
        </OptionsProvider>
      </ThemeProvider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

// re-export everything
export {
  cleanup,
  screen,
  fireEvent,
} from '@testing-library/react';

// override render method
export { customRender as render };
