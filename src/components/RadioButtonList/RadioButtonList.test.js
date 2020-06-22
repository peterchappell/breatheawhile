import React from 'react';
import { render, cleanup, screen, fireEvent } from 'utils/test-utils';

import breathingPatterns from 'utils/breathingPatterns';
import RadioButtonList from './index';

describe('RadioButtonList', () => {
  afterEach(cleanup);
  const mockHandler = jest.fn();

  it('renders', () => {
    const { asFragment } = render(
      <RadioButtonList
        options={breathingPatterns}
        selectedId={breathingPatterns[0].id}
        selectHandler={mockHandler}
      />
    );
    expect(asFragment).toMatchSnapshot();
  });

  it('renders the list', () => {
    render(
      <RadioButtonList
        options={breathingPatterns}
        selectedId={breathingPatterns[0].id}
        selectHandler={mockHandler}
      />
    );
    const listItemButtonEls = screen.getAllByRole('button');
    expect(listItemButtonEls.length).toEqual(breathingPatterns.length);
    expect(listItemButtonEls[0].querySelector('svg[title="Selected"]')).toBeTruthy();
    expect(listItemButtonEls[1].querySelector('svg[title="Unselected"]')).toBeTruthy();
  });

  it('calls the handler function prop when a selection is made', () => {
    render(
      <RadioButtonList
        options={breathingPatterns}
        selectedId={breathingPatterns[0].id}
        selectHandler={mockHandler}
      />
    );
    fireEvent.click(screen.getByText(breathingPatterns[1].name));

    expect(mockHandler).toBeCalledTimes(1);
    expect(mockHandler).toBeCalledWith(breathingPatterns[1]);
  });
});
