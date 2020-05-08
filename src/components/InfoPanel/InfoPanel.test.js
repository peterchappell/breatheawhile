import React from 'react';
import { render, screen, fireEvent } from 'utils/test-utils';

import InfoPanel from './index';

describe('AppMain', () => {
  it('renders', () => {
    const { asFragment } = render(
      <InfoPanel isOpen />
    );
    expect(asFragment).toMatchSnapshot();
  });

  it('calls the close handler when closing', () => {
    const mockCloseHandler = jest.fn();
    render(<InfoPanel isOpen closeHandler={mockCloseHandler} />);
    fireEvent.click(screen.getByText('Close'));
    expect(mockCloseHandler).toBeCalledTimes(1);
  });
});
