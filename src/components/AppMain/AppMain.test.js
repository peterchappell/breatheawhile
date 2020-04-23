import React from 'react';
import { render, cleanup } from 'utils/test-utils';

import AppMain from './index';
import breathingPatterns from 'utils/breathingPatterns';

describe('AppMain', () => {
  afterEach(cleanup);

  it('renders', () => {
    const { asFragment } = render(<AppMain pattern={breathingPatterns[0]} />);
    expect(asFragment).toMatchSnapshot();
  });
});
