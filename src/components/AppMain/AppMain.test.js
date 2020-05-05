import React from 'react';
import { render } from 'utils/test-utils';
import breathingPatterns from 'utils/breathingPatterns';

import { OptionsProvider } from 'context/OptionsContext';
import AppMain from './index';

describe('AppMain', () => {
  it('renders', () => {
    const { asFragment } = render(
      <OptionsProvider>
        <AppMain pattern={breathingPatterns[0]} />
      </OptionsProvider>
    );
    expect(asFragment).toMatchSnapshot();
  });
});
