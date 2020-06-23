import React from 'react';
import { render } from 'utils/test-utils';

import TextPrompt from './index';

describe('TextPrompt', () => {
  it('renders', () => {
    const { asFragment } = render(
      <TextPrompt />
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
      <TextPrompt
        currentInstruction={props.currentInstruction}
        patternName={props.patternName}
        count={props.count}
        progress={props.progress}
      />
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
      <TextPrompt props={props} />
    );
    expect(getByText('…')).toBeTruthy();
  });
});
