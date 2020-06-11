import React from 'react';
import {fireEvent, render, screen} from 'utils/test-utils';

import AppHeader from './index';

describe('AppHeader', () => {
  it('renders', () => {
    const { asFragment } = render(<AppHeader />);
    expect(asFragment).toMatchSnapshot();
  });

  it('contains a h1 with the app name', () => {
    const { container } = render(<AppHeader />);
    expect(container.querySelector('h1').textContent).toEqual('Breatheawhile');
  });

  it('calls the handler when the info button is clicked', () => {
    const mockHandler = jest.fn();
    render(<AppHeader infoButtonHandler={mockHandler} />);
    fireEvent.click(screen.getByLabelText('information'));
    expect(mockHandler).toBeCalledTimes(1);
  });
});
