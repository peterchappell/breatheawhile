import React from 'react';
import { render, cleanup, screen, fireEvent } from 'utils/test-utils';

import breathingPatterns from 'utils/breathingPatterns';
import { OptionsProvider } from "context/OptionsContext";
import PatternOptions from './index';

describe('PatternOptions', () => {
  afterEach(cleanup);

  it('renders', () => {
    const { asFragment } = render(
      <OptionsProvider>
        <PatternOptions />
      </OptionsProvider>
    );
    expect(asFragment).toMatchSnapshot();
  });

  it('renders the list of breathing patterns with the first one selected by default', () => {
    render(
      <OptionsProvider>
        <PatternOptions />
      </OptionsProvider>
    );
    const listItemButtonEls = screen.getAllByRole('button');
    expect(listItemButtonEls.length).toEqual(breathingPatterns.length);
    expect(listItemButtonEls[0].querySelector('svg[title="Selected"]')).toBeTruthy();
    expect(listItemButtonEls[1].querySelector('svg[title="Unselected"]')).toBeTruthy();
  });

  it('calls the onPatternSelected function prop when a selection is made', () => {
    const mockHandler = jest.fn();
    render(
      <OptionsProvider>
        <PatternOptions onPatternSelected={mockHandler} />
      </OptionsProvider>
    );
    fireEvent.click(screen.getByText(breathingPatterns[1].name));
    const listItemButtonEls = screen.getAllByRole('button');

    expect(mockHandler).toBeCalledTimes(1);
    expect(listItemButtonEls[0].querySelector('svg[title="Unselected"]')).toBeTruthy();
    expect(listItemButtonEls[1].querySelector('svg[title="Selected"]')).toBeTruthy();
  });
});
