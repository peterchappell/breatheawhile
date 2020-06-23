import React from 'react';
import { render, cleanup } from 'utils/test-utils';

import SpeedOptions from './index';

describe('SpeedOptions', () => {
  afterEach(cleanup);

  it('renders', () => {
    const { asFragment } = render(
      <SpeedOptions />
    );
    expect(asFragment).toMatchSnapshot();
  });

  it('renders a slider', () => {
    const { container } = render(
      <SpeedOptions />
    );
    expect(container.querySelectorAll('.MuiSlider-root').length).toEqual(1);
  });
});
