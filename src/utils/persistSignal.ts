import { effect, signal } from '@preact/signals-react';
import { useEffect } from 'react';

interface PersistedState<T> {
  version: string;
  value: T;
}

const persistSignal = <T>(key: string, version: string, initialValue: T) => {
  // for ssr return inital state
  if (typeof window == 'undefined') {
    const state = signal<T>(initialValue);
    return state;
  }
  
  // Retrieve the stored value from localStorage
  const storedValue = localStorage.getItem(key);
  let parsedValue: T;

  if (storedValue) {
    const parsedStoredValue: PersistedState<T> = JSON.parse(storedValue);

    // Check if the stored version matches the current version
    if (parsedStoredValue.version === version) {
      parsedValue = parsedStoredValue.value;
    } else {
      parsedValue = initialValue;
    }
  } else {
    parsedValue = initialValue;
  }

  // Create the signal with the initial or stored value
  const state = signal<T>(parsedValue);

  // Use an effect to update localStorage whenever the state changes
  effect(() => {
    const stateToStore: PersistedState<T> = {
      version: version,
      value: state.value,
    };
    localStorage.setItem(key, JSON.stringify(stateToStore));
  });

  return state;
};

export default persistSignal;
