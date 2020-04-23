import React from 'react';
import { render, cleanup } from 'utils/test-utils';

import VisualisationSimple from './index';

describe('VisualisationSimple', () => {
  afterEach(cleanup);

  it('renders', () => {
    const { asFragment } = render(<VisualisationSimple />);
    expect(asFragment).toMatchSnapshot();
  });

  it('displays only the svg that corresponds to the phase', () => {
    const { getByTestId, rerender } = render(<VisualisationSimple currentPhase="in" />);
    expect(getByTestId('in_visual').style.display).toEqual('block');
    expect(getByTestId('out_visual').style.display).toEqual('none');
    expect(getByTestId('pause_visual').style.display).toEqual('none');
    rerender(<VisualisationSimple currentPhase="out" />);
    expect(getByTestId('in_visual').style.display).toEqual('none');
    expect(getByTestId('out_visual').style.display).toEqual('block');
    expect(getByTestId('pause_visual').style.display).toEqual('none');
    rerender(<VisualisationSimple currentPhase="pause" />);
    expect(getByTestId('in_visual').style.display).toEqual('none');
    expect(getByTestId('out_visual').style.display).toEqual('none');
    expect(getByTestId('pause_visual').style.display).toEqual('block');
  });
});
