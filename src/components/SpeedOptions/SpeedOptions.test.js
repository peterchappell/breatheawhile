import React from 'react';
import { render, cleanup } from 'utils/test-utils';

import SpeedOptions, { normaliseSliderValue } from './index';

const defaultSpeed = 1;

describe('SpeedOptions', () => {
  afterEach(cleanup);

  it('renders', () => {
    const { asFragment } = render(<SpeedOptions timeUnitInSeconds={defaultSpeed} />);
    expect(asFragment).toMatchSnapshot();
  });

  it('renders a slider', () => {
    const { container } = render(<SpeedOptions timeUnitInSeconds={defaultSpeed} />);
    expect(container.querySelectorAll('.MuiSlider-root').length).toEqual(1);
  });

  it('calls the setTimeUnitInSeconds prop with value inverse to what is set', () => {
    const mockHandler = jest.fn();
    const newValue = 0.8;
    const { container, rerender } = render(<SpeedOptions setTimeUnitInSeconds={mockHandler} timeUnitInSeconds={defaultSpeed} />);
    const inputEl = container.querySelector('input');
    expect(inputEl.value).toEqual(String(normaliseSliderValue(defaultSpeed)));
    rerender(<SpeedOptions setTimeUnitInSeconds={mockHandler} timeUnitInSeconds={newValue} />);
    expect(inputEl.value).toEqual(String(normaliseSliderValue(newValue)));
  });
});
