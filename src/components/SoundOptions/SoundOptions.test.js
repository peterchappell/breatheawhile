import React from 'react';
import { render, cleanup, screen, fireEvent } from 'utils/test-utils';

import SoundOptions from './index';

describe('SoundOptions', () => {
  afterEach(cleanup);

  it('renders', () => {
    const { asFragment } = render(<SoundOptions />);
    expect(asFragment).toMatchSnapshot();
  });

  it('renders all the sound options', () => {
    const { container } = render(<SoundOptions />);
    expect(container.querySelectorAll('input[type=checkbox]').length).toEqual(4);
  });

  it('renders the checkboxes as checked according to the props', () => {
    const { container, rerender } = render(<SoundOptions beepOnSecond={false} beepOnChange={false} buzzOnSecond={false} buzzOnChange={false} />);
    expect(container.querySelectorAll('input:checked').length).toEqual(0);
    rerender(<SoundOptions beepOnSecond beepOnChange buzzOnSecond buzzOnChange />)
    expect(container.querySelectorAll('input:checked').length).toEqual(4);
  });

  it('calls the corresponding handlers (prop functions) when checkboxes are clicked', () => {
    const toggleBeepOnSecond = jest.fn();
    const toggleBeepOnChange = jest.fn();
    const toggleBuzzOnSecond = jest.fn();
    const toggleBuzzOnChange = jest.fn();
    render(
      <SoundOptions
        beepOnSecond={false}
        toggleBeepOnSecond={toggleBeepOnSecond}
        beepOnChange={false}
        toggleBeepOnChange={toggleBeepOnChange}
        buzzOnSecond={false}
        toggleBuzzOnSecond={toggleBuzzOnSecond}
        buzzOnChange={false}
        toggleBuzzOnChange={toggleBuzzOnChange}
      />
    );
    fireEvent.click(screen.queryByTestId('toggleSoundOnCount'));
    fireEvent.click(screen.queryByTestId('toggleSoundOnChange'));
    fireEvent.click(screen.queryByTestId('toggleVibrateOnCount'));
    fireEvent.click(screen.queryByTestId('toggleVibrateOnChange'));
    expect(toggleBeepOnSecond).toBeCalledTimes(1);
    expect(toggleBeepOnChange).toBeCalledTimes(1);
    expect(toggleBuzzOnSecond).toBeCalledTimes(1);
    expect(toggleBuzzOnChange).toBeCalledTimes(1);
  });
});
