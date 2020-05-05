import React from 'react';
import { render, screen, fireEvent } from 'utils/test-utils';

import { OptionsProvider } from "context/OptionsContext";
import SoundOptions from './index';

describe('SoundOptions', () => {
  it('renders', () => {
    const { asFragment } = render(
      <OptionsProvider>
        <SoundOptions />
      </OptionsProvider>
    );
    expect(asFragment).toMatchSnapshot();
  });

  it('renders all the sound options', () => {
    const { container } = render(
      <OptionsProvider>
        <SoundOptions />
      </OptionsProvider>
    );
    expect(container.querySelectorAll('input[type=checkbox]').length).toEqual(4);
  });

  it('renders the checkboxes as unchecked by default', () => {
    const { container } = render(
      <OptionsProvider>
        <SoundOptions />
      </OptionsProvider>
    );
    expect(container.querySelectorAll('input:checked').length).toEqual(0);
  });

  it('sets the checkboxes as checked (via context/state) when checkboxes are clicked', () => {
    render(
      <OptionsProvider>
        <SoundOptions />
      </OptionsProvider>
    );
    const toggleSoundOnCountCheckboxEl = screen.queryByTestId('toggleSoundOnCount').querySelector('input[type=checkbox]');
    const toggleSoundOnChangeCheckboxEl = screen.queryByTestId('toggleSoundOnChange').querySelector('input[type=checkbox]');
    const toggleVibrateOnCountCheckboxEl = screen.queryByTestId('toggleVibrateOnCount').querySelector('input[type=checkbox]');
    const toggleVibrateOnChangeCheckboxEl = screen.queryByTestId('toggleVibrateOnChange').querySelector('input[type=checkbox]');
    expect(toggleSoundOnChangeCheckboxEl.checked).toBe(false);
    expect(toggleSoundOnChangeCheckboxEl.checked).toBe(false);
    expect(toggleVibrateOnCountCheckboxEl.checked).toBe(false);
    expect(toggleVibrateOnChangeCheckboxEl.checked).toBe(false);
    fireEvent.click(toggleSoundOnCountCheckboxEl);
    fireEvent.click(toggleSoundOnChangeCheckboxEl);
    fireEvent.click(toggleVibrateOnCountCheckboxEl);
    fireEvent.click(toggleVibrateOnChangeCheckboxEl);
    expect(toggleSoundOnChangeCheckboxEl.checked).toBe(true);
    expect(toggleSoundOnChangeCheckboxEl.checked).toBe(true);
    expect(toggleVibrateOnCountCheckboxEl.checked).toBe(true);
    expect(toggleVibrateOnChangeCheckboxEl.checked).toBe(true);
  });
});
