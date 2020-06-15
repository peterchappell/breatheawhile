// @flow
import React, { useEffect, useRef, useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    margin: [[0, 'auto']],
    maxWidth: '340px',
    position: 'relative',
    width: '100%',
  }
}));

type Props = {
  currentPhase: string,
  progress: number,
};

const VisualisationExpandingParticles = (props: Props) => {
  const {
    currentPhase,
    progress,
  } = props;

  const useEffectOnlyOnMount = (mountFunction) => useEffect(mountFunction, []);
  const classes = useStyles();

  const canvasRef = useRef();
  const ctx = useRef();
  const previousPhase = useRef();
  const counter = useRef(0);
  const spreadFactor = useRef();

  const randomNumber = max => Math.floor(Math.random() * max);

  const drawCircle = useCallback(() => {
    const maxRadius = 120;
    const angle = Math.random()*Math.PI*2;
    const particleRadius = randomNumber(20) + 5;
    const radiusFromCentre = spreadFactor.current * maxRadius + randomNumber(10);
    const centreX = Math.cos(angle) * radiusFromCentre;
    const centreY = Math.sin(angle) * radiusFromCentre;
    const gradient = ctx.current.createRadialGradient(centreX, centreY,particleRadius/5, centreX, centreY, particleRadius);
    gradient.addColorStop(0, `hsla(${randomNumber(360)}, 95%, 60%, ${1 - particleRadius/20 + 0.05})`);
    gradient.addColorStop(.7, `hsla(${randomNumber(360)}, 95%, 60%, 0.25)`);
    gradient.addColorStop(.9, `hsla(${randomNumber(360)}, 95%, 60%, 0)`);
    ctx.current.beginPath();
    ctx.current.arc(centreX, centreY, particleRadius, 0, 2 * Math.PI, false);
    ctx.current.fillStyle = gradient;
    ctx.current.fill();
  }, [spreadFactor]);

  useEffect(() => {
    if (!ctx.current || progress > 1) {
      return;
    }
    if (currentPhase === 'in' || currentPhase === 'out') {
      if (previousPhase.current !== currentPhase) {
        previousPhase.current = currentPhase;
      }
      spreadFactor.current = (currentPhase === 'in') ? progress : (1 - progress);
    } else if (currentPhase === 'pause') {
      spreadFactor.current = (previousPhase.current === 'in') ? 1 : 0;
    }
    if (counter.current % 5 === 0) {
      ctx.current.clearRect(-150, -150, 300, 300);
      [...Array(70).keys()].forEach(() => {
        drawCircle();
      });
    }

    counter.current += 1;
  }, [progress, currentPhase, drawCircle]);

  useEffectOnlyOnMount(() => {
    ctx.current = canvasRef.current.getContext('2d');
    ctx.current.clearRect(0, 0, 300, 300);
    ctx.current.translate(150, 150);
  });

  return (
    <canvas
      height={300}
      width={300}
      className={classes.container}
      ref={canvasRef}
      data-testid="viz_canvas"
    />
  );
};

VisualisationExpandingParticles.defaultProps = {
  currentPhase: 'in',
  progress: 0,
};

export default VisualisationExpandingParticles;
