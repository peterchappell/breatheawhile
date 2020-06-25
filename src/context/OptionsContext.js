// @flow
import React, { useReducer } from 'react';
import type { Node as ReactNode } from 'react';
import actions, { actionsNotUsingPayloads } from './actions';
import initialState, { visualisationsList } from './initialState';
import type { State } from './initialState';

type Action =
  | { type: $Keys<typeof actionsNotUsingPayloads> }
  | { type: "SET_PATTERN", payload: Object }
  | { type: "SET_SECONDS_PER_COUNT", payload: number }
  | { type: "SET_VISUALISATION", payload: $Keys<typeof visualisationsList> };

type Dispatch = (action: Action) => void;

const OptionsStateContext = React.createContext<State | typeof undefined>(undefined);
const OptionsDispatchContext = React.createContext<Dispatch | typeof undefined>(undefined, );

const STORAGE_KEY = 'breatheawhile_settings';

const optionsReducer = (state, action: Action) => {
  let newState;
  switch (action.type) {
    case actions.TOGGLE_SOUND_ON_COUNT: {
      newState = {
        ...state,
        soundOnCount: !state.soundOnCount,
      };
      break;
    }
    case actions.TOGGLE_SOUND_ON_CHANGE: {
      newState = {
        ...state,
        soundOnChange: !state.soundOnChange,
      };
      break;
    }
    case actions.TOGGLE_VIBRATE_ON_COUNT: {
      newState = {
        ...state,
        vibrateOnCount: !state.vibrateOnCount,
      };
      break;
    }
    case actions.TOGGLE_VIBRATE_ON_CHANGE: {
      newState = {
        ...state,
        vibrateOnChange: !state.vibrateOnChange,
      };
      break;
    }
    case actions.TOGGLE_SHOW_INSTRUCTIONS: {
      newState = {
        ...state,
        showInstructions: !state.showInstructions,
      };
      break;
    }
    case actions.SET_SECONDS_PER_COUNT: {
      newState = {
        ...state,
        secondsPerCount: action.payload,
      };
      break;
    }
    case actions.SET_PATTERN: {
      newState = {
        ...state,
        currentPattern: action.payload,
      };
      break;
    }
    case actions.SET_VISUALISATION: {
      newState = {
        ...state,
        currentVisualisation: action.payload,
      };
      break;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  window.gtag('event', 'settingschange', {
    'event_category': 'setting',
    'event_label': action.type,
  });
  return newState;
}

const retrieveInitialState = () => {
  const savedStateString = localStorage.getItem(STORAGE_KEY);
  if (!savedStateString) {
    return initialState;
  }
  try {
    const savedState = JSON.parse(savedStateString);
    // never turn on the sound by default even if it was a saved setting
    // (because of potential around auto-play restrictions in browser)
    return {
      ...savedState,
      soundOnCount: false,
      soundOnChange: false,
    }
  } catch {
    return initialState;
  }
};

const OptionsProvider = (props: ({ children: ReactNode })) => {
  const { children } = props;
  const startingState = retrieveInitialState();
  const [state, dispatch] = useReducer(optionsReducer, startingState)
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