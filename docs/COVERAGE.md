# Test Coverage & Verification

This document specifies the testing layout, coverage metrics, and instructions for verifying the Cars24 SDUI codebase.

---

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

## 📈 Coverage Targets

| File / Section | Target Statement Coverage | Focus Areas |
| :--- | :--- | :--- |
| **`sdui/computed.ts`** | **100%** | Pure calculation math and input path resolutions |
| **`perf/timing.ts`** | **95%** | Performance markers duration measurements and logs |
| **`sdui/actionEngine.ts`** | **90%** | Exhaustive actions branching and parameter mapping |
| **`components/*`** | **80%** | Component rendering tree tests and press events |

---

## 🚀 Running Coverage Reports

To execute tests and view the coverage matrix directly in the terminal, run:
```bash
npm run test:coverage
```

To output detailed interactive HTML pages showing exactly which lines were executed:
1. Run the coverage script.
2. Open the generated file: `coverage/lcov-report/index.html` in your web browser.
