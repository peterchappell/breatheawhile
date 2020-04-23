import React from 'react';
import { render, cleanup, screen, fireEvent } from 'utils/test-utils';

import PatternOptions from './index';
import breathingPatterns from 'utils/breathingPatterns';

describe('PatternOptions', () => {
  afterEach(cleanup);

  it('renders', () => {
    const { asFragment } = render(<PatternOptions />);
    expect(asFragment).toMatchSnapshot();
  });

  it('renders the list of breathing patterns', () => {
    render(<PatternOptions />);
    const listItemButtonEls = screen.getAllByRole('button');
    expect(listItemButtonEls.length).toEqual(breathingPatterns.length);
  });

  it('uses the selectedPattern prop to select the correct pattern in the list', () => {
    const selectedBreathingPatternIndex = 1;
    render(<PatternOptions selectedPattern={breathingPatterns[selectedBreathingPatternIndex]} />);
    const listItemButtonEls = screen.getAllByRole('button');
    expect(listItemButtonEls[selectedBreathingPatternIndex].classList.contains('Mui-selected')).toEqual(true);
    expect(listItemButtonEls[0].classList.contains('Mui-selected')).toEqual(false);
  });

  it('calls the handlePatternSelect function prop when a selection is made', () => {
    const selectedBreathingPatternIndex = 1;
    const clickedBreathingPattern = breathingPatterns[0];
    const mockHandler = jest.fn();
    render(<PatternOptions selectedPattern={breathingPatterns[selectedBreathingPatternIndex]} handlePatternSelect={mockHandler} />);
    fireEvent.click(screen.getByText(clickedBreathingPattern.name));
    expect(mockHandler).toBeCalledTimes(1);
    expect(mockHandler).toBeCalledWith(expect.any(Object), clickedBreathingPattern);
  });
});
