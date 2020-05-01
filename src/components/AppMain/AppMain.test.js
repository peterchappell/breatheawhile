import React from 'react';
import { render, cleanup } from 'utils/test-utils';
import breathingPatterns from 'utils/breathingPatterns';

import { SoundOptionsProvider } from 'context/SoundOptionsContext';
import AppMain from './index';

describe('AppMain', () => {
  afterEach(cleanup);

  it('renders', () => {
    const { asFragment } = render(
      <SoundOptionsProvider>
        <AppMain pattern={breathingPatterns[0]} />
      </SoundOptionsProvider>
    );
    expect(asFragment).toMatchSnapshot();
  });
});
