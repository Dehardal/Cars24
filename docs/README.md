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
│   ├── README.md             # This document
│   ├── PERF.md               # Performance timings mappings and metrics
│   ├── COVERAGE.md           # Testing instructions and objectives
│   └── AI_WORKFLOW.md        # Code review guidelines (what to accept/reject)
└── tests/
    ├── App.test.tsx          # App rendering integrity check
    ├── computed.test.ts      # EMI amortization calculations suite
    └── timing.test.ts        # Timings utility tests
```

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
