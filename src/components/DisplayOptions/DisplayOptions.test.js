import React from 'react';
import { render, cleanup, fireEvent } from 'utils/test-utils';

import DisplayOptions from './index';

describe('DisplayOptions', () => {
  afterEach(cleanup);

  it('renders', () => {
    const { asFragment } = render(<DisplayOptions />);
    expect(asFragment).toMatchSnapshot();
  });

  it('renders a checkbox that is checked depending on the showInstructions prop', () => {
    const { container, rerender } = render(<DisplayOptions showInstructions />);
    expect(container.querySelector('input[type=checkbox]').checked).toBeTruthy();
    rerender(<DisplayOptions showInstructions={false} />);
    expect(container.querySelector('input[type=checkbox]').checked).toBeFalsy();
  });

  it('calls the toggleShowInstructions prop function when the checkbox is clicked', () => {
    const mockToggleFunction = jest.fn();
    const { container } = render(<DisplayOptions showInstructions toggleShowInstructions={mockToggleFunction} />);
    const checkboxEl = container.querySelector('input[type=checkbox]');
    fireEvent.click(checkboxEl);
    expect(mockToggleFunction).toHaveBeenCalledTimes(1);
  });
});
