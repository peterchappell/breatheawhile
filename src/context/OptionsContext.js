// @flow
import React, { useReducer } from 'react';
import type { Node as ReactNode } from 'react';
import actions, { actionsNotUsingPayloads } from './actions';
import initialState from './initialState';
import type { State } from './initialState';

type Action =
  | { type: $Keys<typeof actionsNotUsingPayloads> }
  | { type: "SET_PATTERN", payload: Object }
  | { type: "SET_SECONDS_PER_COUNT", payload: number };

type Dispatch = (action: Action) => void;

const OptionsStateContext = React.createContext<State | typeof undefined>(undefined);
const OptionsDispatchContext = React.createContext<Dispatch | typeof undefined>(undefined, );

const optionsReducer = (state, action: Action) => {
  switch (action.type) {
    case actions.TOGGLE_SOUND_ON_COUNT: {
      return {
        ...state,
        soundOnCount: !state.soundOnCount,
      }
    }
    case actions.TOGGLE_SOUND_ON_CHANGE: {
      return {
        ...state,
        soundOnChange: !state.soundOnChange,
      }
    }
    case actions.TOGGLE_VIBRATE_ON_COUNT: {
      return {
        ...state,
        vibrateOnCount: !state.vibrateOnCount,
      }
    }
    case actions.TOGGLE_VIBRATE_ON_CHANGE: {
      return {
        ...state,
        vibrateOnChange: !state.vibrateOnChange,
      }
    }
    case actions.TOGGLE_SHOW_INSTRUCTIONS: {
      return {
        ...state,
        showInstructions: !state.showInstructions,
      }
    }
    case actions.SET_SECONDS_PER_COUNT: {
      return {
        ...state,
        secondsPerCount: action.payload,
      }
    }
    case actions.SET_PATTERN: {
      return {
        ...state,
        currentPattern: action.payload,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const OptionsProvider = (props: ({ children: ReactNode })) => {
  const { children } = props;
  const [state, dispatch] = useReducer(optionsReducer, initialState)
  return (
    <OptionsStateContext.Provider value={state}>
      <OptionsDispatchContext.Provider value={dispatch}>
        {children}
      </OptionsDispatchContext.Provider>
    </OptionsStateContext.Provider>
  );
};

const useOptionsState = () => {
  const context = React.useContext(OptionsStateContext);
  if (context === undefined) {
    throw new Error('useOptionsState must be used within a OptionsProvider');
  }
  return context;
};

function useOptionsDispatch() {
  const context = React.useContext(OptionsDispatchContext)
  if (context === undefined) {
    throw new Error('useOptionsDispatch must be used within a OptionsProvider');
  }
  return context;
}

export { OptionsProvider, useOptionsState, useOptionsDispatch };