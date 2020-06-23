import React from 'react';
import { render, fireEvent } from 'utils/test-utils';

import DisplayOptions from './index';

describe('DisplayOptions', () => {
  it('renders', () => {
    const { asFragment } = render(
      <DisplayOptions />
    );
    expect(asFragment).toMatchSnapshot();
  });

  it('renders a checkbox that is checked by default', () => {
    const { container } = render(
      <DisplayOptions />
    );
    expect(container.querySelector('input[type=checkbox]').checked).toBeTruthy();
  });

  it('changes the value for the checkbox when checkbox is clicked', () => {
    const { getByLabelText } = render(
      <DisplayOptions />
    );
    const checkboxEl = getByLabelText('Show instruction text');
    expect(checkboxEl.checked).toBeTruthy();
    fireEvent.click(checkboxEl);
    expect(checkboxEl.checked).toBeFalsy();
  });
});
