// @flow
import breathingPatterns from "utils/breathingPatterns";

export const visualisationsList = {
  simple: 'simple',
  expandingParticles: 'expandingParticles',
};

export type State = {
  soundOnCount: boolean,
  soundOnChange: boolean,
  vibrateOnCount: boolean,
  vibrateOnChange: boolean,
  showInstructions: boolean,
  secondsPerCount: number,
  currentPattern: Object,
  currentVisualisation: $Keys<typeof visualisationsList>,
};

const initialState = {
  soundOnCount: false,
  soundOnChange: false,
  vibrateOnCount: false,
  vibrateOnChange: false,
  showInstructions: true,
  secondsPerCount: 1,
  currentPattern: breathingPatterns[0],
  currentVisualisation: visualisationsList.simple,
};

export default initialState;
