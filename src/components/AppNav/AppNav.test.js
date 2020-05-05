import React from 'react';
import { render, fireEvent, screen } from 'utils/test-utils';

import AppNav from './index';

describe('AppHeader', () => {
  it('renders', () => {
    const { asFragment } = render(<AppNav />);
    expect(asFragment).toMatchSnapshot();
  });

  it('calls the handleNavChange prop when a nav button is clicked', () => {
    const mockHandleNavChange = jest.fn();
    render(<AppNav handleNavChange={mockHandleNavChange} />);
    const displayButtonEl = screen.queryByText('Display');
    fireEvent.click(displayButtonEl);
    expect(mockHandleNavChange).toHaveBeenCalledTimes(1);
  });

  it('shows the correct nav as selected using the navValue prop', () => {
    const { container } = render(<AppNav navValue="display" />);
    const displayButtonEl = screen.queryByText('Display');
    expect(displayButtonEl).toHaveClass('Mui-selected');
    expect(container.querySelectorAll('button.Mui-selected').length).toEqual(1);
  });
});
