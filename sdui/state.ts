import { useState } from 'react';

export function useSduiState(initialState: Record<string, any> = {}) {
  const [state, setState] = useState<Record<string, any>>(initialState);

  const updateState = (key: string, value: any) => {
    setState(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    state,
    updateState,
  };
}
