import { makeStyles } from '@material-ui/core/styles';

const useVisualisationStyles = makeStyles(() => ({
  container: {
    position: 'relative'
  },
  phase: {
    alignItems: 'center',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    height: '280px',
    justifyContent: 'center',
    left: 0,
    lineHeight: '60px',
    position: 'absolute',
    right: 0,
    textAlign: 'center'
  },
  phaseVisual: {
    height: '100px',
    opacity: '0.7',
    width: '100px'
  },
  phaseInstruction: {
    color: '#f5f5f5',
    fontSize: '18px',
    marginTop: '20px',
    textAlign: 'center'
  },
  circle: {
    width: '280px',
    height: '280px',
    position: 'relative'
  },
  progress: {
    bottom: 0,
    fill: 'none',
    left: 0,
    position: 'absolute',
    right: 0,
    strokeWidth: '6',
    top: 0,
    transform: 'rotate(-90deg)',
    transformOrigin: '50% 50%',
    transition: '0.25s stroke',
    zIndex: '10'
  },
  background: {
    bottom: 0,
    fill: 'none',
    left: 0,
    position: 'absolute',
    right: 0,
    strokeWidth: '6',
    top: 0,
    transform: 'rotate(-90deg)',
    transformOrigin: '50% 50%',
    zIndex: '5'
  },
  fadeOut: {
    opacity: 0,
    transition: '0.35s opacity',
  },
  fadeIn: {
    opacity: 1,
    transition: '0.2s opacity',
  },
}));

export default useVisualisationStyles;
