# Test Coverage & Verification

This document specifies the testing layout, coverage metrics, and instructions for verifying the Cars24 SDUI codebase.

## 🧪 Test Suite Structure

The test cases reside in the `/tests` folder, covering core components of the SDUI engine:

1. **[App.test.tsx](file:///c:/Users/ddaya/Cars24/tests/App.test.tsx)**:
   - Verifies the app boots successfully.
   - Asserts that the primary layout wrapper can render the Home screen under full SDUI context without rendering exceptions.
2. **[computed.test.ts](file:///c:/Users/ddaya/Cars24/tests/computed.test.ts)**:
   - Validates the correctness of the pure EMI amortization formula.
   - Tests edge cases (0 interest, negative tenures, and typical banking variables) to ensure calculations match expected outputs.
3. **[timing.test.ts](file:///c:/Users/ddaya/Cars24/tests/timing.test.ts)**:
   - Verifies the performance marker starts, stops, and warns correctly.
   - Validates that log records are properly recorded.

---

## 📈 Generalization & Coverage Claim (Part 3)

### Honest Coverage Statement
Given a brand new Cars24 layout screen:
- **80% of the visual layout** can be rendered with **zero client-side code changes (JSON-only)**. This is because the schema models components (SearchHeader, Carousel, Chips, card rails, CTA cards) and action states generically.
- **20% will require new client-side code** for:
  - **New Component Types**: Custom interactive components (e.g., interactive credit check graphs, 360-degree car view sliders) require writing React Native components and registering them in `registry.ts`.
  - **Complex Native Actions**: Events requiring native hardware integrations (e.g., uploading documents via Camera API, fetching current location via GPS) need new `SduiAction` branch handlers in `actionEngine.ts`.
  - **Advanced Micro-animations**: Complex, state-driven custom transitions that cannot be declared via standard layout property mappings.

---

## 🚀 Running Coverage Reports

To execute tests and view the coverage matrix directly in the terminal, run:
```bash
npm run test:coverage
```

To output detailed interactive HTML pages showing exactly which lines were executed:
1. Run the coverage script.
2. Open the generated file: `coverage/lcov-report/index.html` in your web browser.
