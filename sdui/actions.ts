import { SduiAction } from '../schema/types';

export function handleSduiAction(action: SduiAction, state: any, updateState: (key: string, value: any) => void) {
  console.log('[SDUI Actions] Handling action:', action.type, action);

  switch (action.type) {
    case 'navigate':
      console.log(`[SDUI Navigation] Navigating to: ${action.target}`);
      break;

    case 'update_state':
      if (action.stateKey && action.value !== undefined) {
        updateState(action.stateKey, action.value);
        if (action.then) {
          handleSduiAction(action.then, state, updateState);
        }
      }
      break;

    case 'open_sheet':
      console.log(`[SDUI Overlay] Opening bottom sheet: ${action.sheetId}`);
      break;

    default:
      console.warn(`[SDUI Actions] Unhandled action type: ${action.type}`);
  }
}
