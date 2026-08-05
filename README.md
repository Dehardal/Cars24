# Cars24 SDUI React Native Workspace

This repository houses the React Native + TypeScript mobile application, powered by Expo and driven by a Server-Driven UI (SDUI) layout engine.

---

## 📁 Repository Structure

```text
├── App.tsx                   # Main entry point bootstrapping state context and viewport
├── schema/
│   ├── cars24_home.json      # Standard home screen layout payload
│   ├── cars24_home_with_unknown.json # Schema with unknown components for fallback demo
│   ├── sdui-schema.json      # JSON schema definitions
│   └── types.ts              # Strictly modeled TS types (Screen, Section, SduiAction)
├── sdui/
│   ├── registry.ts           # Registry mapping type strings to components
│   ├── SduiRenderer.tsx      # Engine mapping bindings and version gates
│   ├── actionEngine.ts       # Unified actions runner (closed discriminated check)
│   ├── SduiStateProvider.tsx # React state context mapping bindings
│   └── computed.ts           # Pure math formulas and computed property resolvers
├── components/
│   ├── HomeScreen.tsx        # Orchestration layer and debug menus
│   ├── SellCarSheet.tsx      # Slide-up modal sheet matching Stitch specs
│   └── [SearchHeader/Carousel/ChipGroup/HorizontalRail/TenureSelector/IconTextRow/CtaBanner].tsx
├── static/
│   └── HomeScreenStatic.tsx  # Hardcoded static JSX twin layout for performance baseline
├── perf/
│   ├── timing.ts             # Instrumentation markers for cold-open, TTR, TTI, and full-page
│   └── metrics.ts            # Timing statistics manager
├── docs/
│   ├── README.md             # Sub-folder documentation backup
│   ├── PERF.md               # Performance timings mappings and metrics
│   ├── COVERAGE.md           # Testing instructions and objectives
│   └── AI_WORKFLOW.md        # Code review guidelines (what to accept/reject)
├── tests/
│   ├── App.test.tsx          # App rendering integrity check
│   ├── computed.test.ts      # EMI amortization calculations suite
│   └── timing.test.ts        # Timings utility tests
└── tsconfig.json             # Self-contained TS compiler rules
```

---

## 🎯 Screen Choice & Design Rationale

### Screen Chosen: Cars24 Home/Landing Page
We chose the **CARS24 Home/Landing Page** because it is the most layout-complex page in the application. It serves as an excellent showcase for an SDUI system:
- **Rich Spacing and Spacing Scale**: Features a dense vertical layout with distinct spacing rules.
- **Section Count**: Contains **7 visually distinct component types** (SearchHeader, Carousel, ChipGroup, HorizontalRail, TenureSelector, IconTextRow, CtaBanner).
- **Layout Complexity**: Contains both horizontal lists (FlatList recommendations rail, Chip scroll decks) and vertical grids.
- **Dynamic Interactions**: Features an interactive **EMI tenure planner** where tapping chip selections dynamically recalculates amortized installments, and a **Slide-Up Bottom Sheet** for selling cars, both triggered entirely via actions declared in the JSON schema.

---

## 🏗️ Architecture & Schema Design

### Schema Design Rationale
The JSON schema defines a page as a collection of `sections`. Each section has:
- `id`: A unique string identifier.
- `type`: Maps to the client-side component registry.
- `minAppVersion`: The minimum client version required to render this component safely.
- `props`: Decoupled visual configuration properties.
- `actions`: Optional event listeners (e.g. `onTap`, `onSelect`) mapping events to `SduiAction` structures.

### Versioning Story
To prevent client-side crashes when rendering newer server payloads, every section contains a `minAppVersion` field. 
- The client maintains a `CURRENT_APP_VERSION = 1` constant.
- During rendering, `SduiRenderer.tsx` filters out any section where `minAppVersion > CURRENT_APP_VERSION`.
- This ensures old app builds ignore new components gracefully, while new app builds render them automatically.

### Architectural Trade-offs
1. **Lightweight React Context vs. Redux**: We chose React Context for state management (`SduiStateProvider.tsx`) as it is lightweight, built-in, and avoids dependencies. However, for a larger multi-page app, Redux would be preferred to manage complex cross-screen state sharing.
2. **Local Simulation vs. Network Endpoints**: Chained action executions (like category updates triggering recommended car rail refetches) are simulated locally inside the context’s state provider. This keeps the prototype zero-dependency and fast, while maintaining a structure that can be easily swapped for `fetch()` calls.

---

## 🚀 Execution & Command Reference

### 1. Install Dependencies
Ensure you have Node.js (v18+) installed. Run from the project root:
```bash
npm install
```

### 2. Linting & Formatting Checks
Verify style alignments:
```bash
npm run lint
npm run format
```

### 3. Execution of Jest Test Suites
Run the tests locally:
```bash
npm run test
```
To run and generate test coverage percentages:
```bash
npm run test:coverage
```

### 4. Running the Dev Server
Launch Expo:
```bash
npm start
```
*Press `a` to run on Android, `i` to run on iOS, or scan the QR code using Expo Go on your mobile device.*

### 5. Running in Google Chrome (Web)
Run the web bundler:
```bash
npm run web
```
*This will boot up the app in a Metro web bundle and launch Chrome directly to show the dynamic SDUI screen.*
