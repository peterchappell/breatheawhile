import React from 'react';
import { render, cleanup } from 'utils/test-utils';

import { OptionsProvider } from "context/OptionsContext";
import SpeedOptions from './index';

describe('SpeedOptions', () => {
  afterEach(cleanup);

  it('renders', () => {
    const { asFragment } = render(
      <OptionsProvider>
        <SpeedOptions />
      </OptionsProvider>
    );
    expect(asFragment).toMatchSnapshot();
  });

  it('renders a slider', () => {
    const { container } = render(
      <OptionsProvider>
        <SpeedOptions />
      </OptionsProvider>
    );
    expect(container.querySelectorAll('.MuiSlider-root').length).toEqual(1);
  });
});
