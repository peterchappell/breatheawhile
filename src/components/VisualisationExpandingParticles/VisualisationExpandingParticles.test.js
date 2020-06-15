import React from 'react';
import { render, screen } from 'utils/test-utils';

import VisualisationExpandingParticles from './index';

describe('VisualisationExpandingParticles', () => {
  it('renders', () => {
    const { asFragment } = render(<VisualisationExpandingParticles />);
    expect(asFragment).toMatchSnapshot();
  });

  it('renders a canvas', () => {
    render(<VisualisationExpandingParticles />);
    expect(screen.queryByTestId('viz_canvas')).toBeTruthy();
  });
});
