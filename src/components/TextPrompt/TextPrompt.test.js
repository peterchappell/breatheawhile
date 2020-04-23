import React from 'react';
import { render, cleanup } from 'utils/test-utils';

import TextPrompt from './index';

describe('TextPrompt', () => {
  afterEach(cleanup);

  it('renders', () => {
    const { asFragment } = render(<TextPrompt />);
    expect(asFragment).toMatchSnapshot();
  });

  it('renders the props', () => {
    const props = {
      currentInstruction: 'Breathe In',
      patternName: 'Test',
      count: 6,
    };
    const { getByText } = render(<TextPrompt {...props} />);
    expect(getByText(props.currentInstruction, { exact: false })).toBeTruthy();
    expect(getByText(props.patternName)).toBeTruthy();
    expect(getByText(String(props.count))).toBeTruthy();
  });

  it('renders an elipses for the count if the count is zero', () => {
    const props = {
      currentInstruction: 'Breathe In',
      patternName: 'Test',
      count: 0,
    };
    const { getByText } = render(
      <TextPrompt {...props} />);
    expect(getByText('…')).toBeTruthy();
  });
});
