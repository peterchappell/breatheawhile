import React from 'react';
import { render, cleanup, screen, fireEvent } from 'utils/test-utils';

import breathingPatterns from 'utils/breathingPatterns';
import PatternOptions from './index';

describe('PatternOptions', () => {
  afterEach(cleanup);

  it('renders', () => {
    const { asFragment } = render(
      <PatternOptions />
    );
    expect(asFragment).toMatchSnapshot();
  });

  it('renders the list of breathing patterns with the first one selected by default', () => {
    render(
      <PatternOptions />
    );
    const listItemButtonEls = screen.getAllByRole('button');
    expect(listItemButtonEls.length).toEqual(breathingPatterns.length);
    expect(listItemButtonEls[0].querySelector('svg[title="Selected"]')).toBeTruthy();
    expect(listItemButtonEls[1].querySelector('svg[title="Unselected"]')).toBeTruthy();
  });

  it('calls the onPatternSelected function prop when a selection is made', () => {
    const mockHandler = jest.fn();
    render(
      <PatternOptions onPatternSelected={mockHandler} />
    );
    fireEvent.click(screen.getByText(breathingPatterns[1].name));

    expect(mockHandler).toBeCalledTimes(1);
  });
});
