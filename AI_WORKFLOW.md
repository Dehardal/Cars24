# AI-Driven SDUI Code Review & Workflow Evidence

This document outlines the tool stack, context rules, prompts, failure cases, and verification strategies used to build the CARS24 SDUI React Native engine.

---

## 🛠️ Tool Stack & Context Rules

- **AI Assistant**: Antigravity Coding Agent (built by Google DeepMind) running in Planning & Execution Modes.
- **Local Environment**: Windows 11, PowerShell, Node v20, Expo CLI (SDK 51), Jest, and Git.
- **Context Briefs**: Configured global and workspace-scoped rules restricting code placement to `c:\Users\ddaya\Cars24`, and establishing strict type safety guidelines.

---

## 📝 Three Prompt → Outcome Stories

### Story 1: Closed Discriminated Unions for Actions
- **Prompt**: *"Generate TypeScript types in schema/types.ts that model the Screen and Action shape. Ensure Action is a closed union so adding new action types fails compile-time check."*
- **AI Output**: The AI initially generated a loose union using open strings for types and optional parameters (`[key: string]: any`).
- **Why Rejected/Rewritten**: Rejected because loose typing allows developers to introduce new action types (e.g. `share_product`) without modifying the handler blocks. Rewrote to use a strict discriminated union of type-literal interfaces:
  ```typescript
  export type SduiAction = NavigateAction | UpdateStateAction | OpenSheetAction | CloseSheetAction | RefetchSectionAction | ApiCallAction;
  ```
  This forces TypeScript to raise compile errors in `actionEngine.ts` unless a `switch` case handles every union member.

### Story 2: Swapping Dynamic Require to Static ES Imports
- **Prompt**: *"Resolve type errors in HomeScreen.tsx regarding require statements."*
- **AI Output**: Suggested installing `@types/node` to resolve the `require` namespace error.
- **Why Rejected/Rewritten**: Rejected because installing Node typings in a pure mobile React Native environment can leak server-side globals and cause bundler confusion. Rewrote to use static ES module imports:
  ```typescript
  import cars24HomeNormal from '../schema/cars24_home.json';
  ```
  Enabled `"resolveJsonModule": true` and `"esModuleInterop": true` in `tsconfig.json` to handle compilation natively.

### Story 3: Dynamic Layout Refetch Race Conditions
- **Prompt**: *"Clicking a category chip does not update the recommended car cards. Fix the refetch action."*
- **AI Output**: Suggested calling the `refetchSection` handler synchronously right after `updateStateKey` in the action engine execution loop.
- **Why Rejected/Rewritten**: Rejected because React state updates are asynchronous. Calling `refetchSection` synchronously in the same tick reads stale state values, causing it to render the default hatchback cards instead of the selected category. Rewrote the refetch trigger to use a reactive `useEffect` listener inside `SduiStateProvider.tsx` that monitors `state.selected_category` changes and triggers layout refreshes only after changes have successfully committed.

---

## ❌ One AI Failure Story

### The Infinite Rendering Loop Reset
- **Where AI Led Us Wrong**: The AI initially scaffolded the `setScreen` and `updateStateKey` callbacks inside `SduiStateProvider.tsx` as plain arrow functions.
- **How We Caught It**: In the browser, clicking a category chip successfully updated the active style on the chip, but the recommended car cards list flashed and reset back to the default hatchback card. 
- **The Rationale**: Because `setScreen` was a plain arrow function, its reference changed on every single render of the provider. Since `HomeScreenContent`'s initialization `useEffect` array had `setScreen` in its dependencies:
  ```typescript
  useEffect(() => {
    loadScreenData(useUnknownSchema).then(data => { setScreen(data); });
  }, [useUnknownSchema, setScreen]);
  ```
  the reference change triggered the `useEffect` on every render, asynchronously calling `setScreen(normalData)` and resetting the dynamic state back to the static baseline payload!
- **How We Resolved It**: Wrapped all exported provider callbacks in `useCallback` hooks to stabilize function references across render sweeps:
  ```typescript
  const setScreen = useCallback((newScreen: SduiScreen) => {
    setScreenState(newScreen);
  }, []);
  ```

---

## 🔍 Verification Strategy
To maintain reliability, we executed a three-stage verification pipeline:
1. **Compilation Check**: Run `npx tsc --noEmit` to verify zero type mismatches or syntax warnings.
2. **Unit Tests Run**: Execute Jest (`npm run test:coverage`) to check that calculations, timing markers, and mounting components function correctly.
3. **Browser Interactivity Verify**: Spawn a `browser_subagent` to open the app locally (`http://localhost:8081/`), click category chips and EMI selectors, toggle fallback models, and capture real-time visual screenshots to verify correct rendering.
