// @flow
import breathingPatterns from "utils/breathingPatterns";

export type State = {
  soundOnCount: boolean,
  soundOnChange: boolean,
  vibrateOnCount: boolean,
  vibrateOnChange: boolean,
  showInstructions: boolean,
  secondsPerCount: number,
  currentPattern: Object,
};

const initialState = {
  soundOnCount: false,
  soundOnChange: false,
  vibrateOnCount: false,
  vibrateOnChange: false,
  showInstructions: true,
  secondsPerCount: 1,
  currentPattern: breathingPatterns[0],
};

export default initialState;
