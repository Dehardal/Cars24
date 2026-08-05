import { SduiAction } from '../schema/types';

export interface ActionContext {
  state: Record<string, any>;
  updateStateKey: (key: string, value: any, recomputeKeys?: string[]) => void;
  openSheet: (sheetId: string) => void;
  closeSheet: () => void;
  navigate: (target: string, params?: Record<string, any>) => void;
  refetchSection?: (sectionId: string) => void;
}

export function executeSduiAction(action: SduiAction, ctx: ActionContext) {
  console.log(`[SDUI Action Engine] Executing action type: "${action.type}"`);

  switch (action.type) {
    case 'navigate':
      ctx.navigate(action.target, action.params);
      break;

    case 'update_state':
      ctx.updateStateKey(action.stateKey, action.value, action.recompute);
      if (action.then) {
        executeSduiAction(action.then, ctx);
      }
      break;

    case 'open_sheet':
      ctx.openSheet(action.sheetId);
      break;

    case 'close_sheet':
      ctx.closeSheet();
      break;

    case 'refetch_section':
      console.log(`[SDUI Action Engine] Refetching section "${action.sectionId}" dynamically.`);
      if (ctx.refetchSection) {
        ctx.refetchSection(action.sectionId);
      }
      break;

    case 'api_call':
      console.log(`[SDUI Action Engine] Calling API "${action.url}" via method "${action.method || 'GET'}"`);
      if (action.then) {
        executeSduiAction(action.then, ctx);
      }
      break;

    default:
      // Compile-time exhaustiveness check. Will fail to compile if SduiAction union contains unhandled type
      const _exhaustiveCheck: never = action;
      console.warn(`[SDUI Action Engine] Warning: Unhandled Action:`, _exhaustiveCheck);
  }
}
