import React from 'react';
import { render } from 'utils/test-utils';

import AppHeader from './index';

describe('AppHeader', () => {
  it('renders', () => {
    const { asFragment } = render(<AppHeader />);
    expect(asFragment).toMatchSnapshot();
  });

  it('contains a h1 with the app name', () => {
    const { container } = render(<AppHeader />);
    expect(container.querySelector('h1').textContent).toEqual('Breathonome');
  });
});
