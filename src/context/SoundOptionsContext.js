// @flow
import React, { useReducer, Node as ReactNode } from 'react';
import actions from './actions';

type Action = {
  type: actions.TOGGLE_SOUND_OPTION,
  payload: {
    option: 'soundOnCount' | 'soundOnChange' | 'vibrateOnCount' | 'vibrateOnChange',
  }
}

const SoundOptionsStateContext = React.createContext();
const SoundOptionsDispatchContext = React.createContext();

const initialState = {
  soundOnCount: false,
  soundOnChange: false,
  vibrateOnCount: false,
  vibrateOnChange: false,
}

const soundOptionsReducer = (state, action: Action) => {
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
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const SoundOptionsProvider = (props: ({ children: ReactNode })) => {
  const { children } = props;
  const [state, dispatch] = useReducer(soundOptionsReducer, initialState)
  return (
    <SoundOptionsStateContext.Provider value={state}>
      <SoundOptionsDispatchContext.Provider value={dispatch}>
        {children}
      </SoundOptionsDispatchContext.Provider>
    </SoundOptionsStateContext.Provider>
  );
};

const useSoundOptionsState = () => {
  const context = React.useContext(SoundOptionsStateContext);
  if (context === undefined) {
    throw new Error('useSoundOptionsState must be used within a SoundOptionsProvider');
  }
  return context;
};

function useSoundOptionsDispatch() {
  const context = React.useContext(SoundOptionsDispatchContext)
  if (context === undefined) {
    throw new Error('useSoundOptionsDispatch must be used within a SoundOptionsProvider');
  }
  return context;
}

export { SoundOptionsProvider, useSoundOptionsState, useSoundOptionsDispatch };