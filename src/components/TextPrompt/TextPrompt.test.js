import React from 'react';
import { render, cleanup } from 'utils/test-utils';

import { OptionsProvider } from "context/OptionsContext";
import TextPrompt from './index';

describe('TextPrompt', () => {
  afterEach(cleanup);

  it('renders', () => {
    const { asFragment } = render(
      <OptionsProvider>
        <TextPrompt />
      </OptionsProvider>
    );
    expect(asFragment).toMatchSnapshot();
  });

  it('renders the props', () => {
    const props = {
      currentInstruction: 'Breathe In',
      patternName: 'Test',
      count: 6,
      progress: 0,
    };
    const { getByText } = render(
      <OptionsProvider>
        <TextPrompt
          currentInstruction={props.currentInstruction}
          patternName={props.patternName}
          count={props.count}
          progress={props.progress}
        />
      </OptionsProvider>
    );
    expect(getByText(props.currentInstruction, { exact: false })).toBeTruthy();
    expect(getByText(props.patternName)).toBeTruthy();
    expect(getByText(String(props.count))).toBeTruthy();
  });

  it('renders an elipses for the count if the count is zero', () => {
    const props = {
      currentInstruction: 'Breathe In',
      patternName: 'Test',
      count: 0,
      progress: 0,
    };
    const { getByText } = render(
      <OptionsProvider>
        <TextPrompt props={props} />
      </OptionsProvider>
    );
    expect(getByText('…')).toBeTruthy();
  });
});
