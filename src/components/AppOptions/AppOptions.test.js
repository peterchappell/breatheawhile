import React from 'react';
import { render, cleanup, screen } from 'utils/test-utils';

import AppOptions from './index';

describe('AppOptions', () => {
  afterEach(cleanup);

  it('renders', () => {
    const ref = { current: document.createElement('div') }
    const { asFragment } = render(<AppOptions popoverAnchorRef={ref} />);
    expect(asFragment).toMatchSnapshot();
  });

  it('shows no panel as open if the navValue prop is empty', () => {
    const ref = { current: document.createElement('div') }
    render(<AppOptions popoverAnchorRef={ref} />);
    expect(screen.queryByTestId('popover_', { exact: false })).toBeFalsy();
  });

  it('shows the an options panel that matches the navValue prop', () => {
    const ref = { current: document.createElement('div') }
    render(<AppOptions navValue="display" popoverAnchorRef={ref} />);
    expect(screen.queryByTestId('popover_display')).toBeTruthy();
    expect(screen.queryByTestId('popover_', { exact: false })).toBeTruthy();
  });
});
