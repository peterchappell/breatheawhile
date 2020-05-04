// @flow
import React from 'react';

import useVisualisationStyles from './useVisualisationStyles';
import { ReactComponent as InVisual } from './in.svg';
import { ReactComponent as OutVisual } from './out.svg';
import { ReactComponent as PauseVisual } from './pause.svg';

const radius = 130;
export const circumference = radius * 2 * Math.PI;

type Props = {
  currentPhase: string,
  progress: number,
};

const VisualisationSimple = (props: Props) => {
  const {
    currentPhase,
    progress,
  } = props;

  const classes = useVisualisationStyles();

  return (
    <div className={classes.container}>
      <div className={`${classes.phase} ${progress >= 0.9 ? classes.fadeOut : classes.fadeIn}`}>
        <InVisual
          className={classes.phaseVisual}
          style={{display: currentPhase === 'in' ? 'block' : 'none'}}
          data-testid="in_visual"
        />
        <OutVisual 
          className={classes.phaseVisual}
          style={{display: currentPhase === 'out' ? 'block' : 'none'}}
          data-testid="out_visual"
        />
        <PauseVisual
          className={classes.phaseVisual}
          style={{display: currentPhase === 'pause' ? 'block' : 'none'}}
          data-testid="pause_visual"
        />
      </div>
      <svg className={classes.circle}>
        <circle
          className={classes.background}
          cx="140"
          cy="140"
          r={radius}
          stroke={currentPhase === 'pause' ? '#236385' : '#333'}
        />
        <circle
          className={classes.progress}
          cx="140"
          cy="140"
          r={radius}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - progress * circumference}
          stroke={currentPhase === 'pause' ? '#333' : '#236385'}
        />
        <p>${circumference} : ${progress}</p>
      </svg>
    </div>
  );
};

VisualisationSimple.defaultProps = {
  currentPhase: 'in',
  progress: 0,
};

export default VisualisationSimple;
