import React from 'react';
import { render } from '@testing-library/react';

type Props = {
  children: Object,
};

const Wrapper = (props: Props) => {
  const { children } = props;
  return (
    <div>
      {children}
    </div>
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
