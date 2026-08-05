// Pure function for EMI amortization calculation
export function calculateEmiAmortization(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number
): number {
  if (tenureMonths <= 0) return 0;
  const monthlyRate = annualRatePercent / 12 / 100;
  if (monthlyRate === 0) return Math.round(principal / tenureMonths);
  
  const emi = 
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    
  return Math.round(emi);
}

// Helper to resolve input value from state or defaults
function resolveInputValue(
  path: string, 
  state: Record<string, any>, 
  defaultValue: number
): number {
  if (path.startsWith('state.')) {
    const stateKey = path.substring(6);
    return state[stateKey] !== undefined ? Number(state[stateKey]) : defaultValue;
  }
  if (state[path] !== undefined) {
    return Number(state[path]);
  }
  return defaultValue;
}

// Resolver for computed fields defined in SDUI sections
export function resolveComputedFields(
  computedDef: Record<string, any> | undefined, 
  state: Record<string, any>
): Record<string, any> {
  const computedValues: Record<string, any> = {};
  if (!computedDef) return computedValues;

  for (const [key, fieldDef] of Object.entries(computedDef)) {
    if (fieldDef.formula === 'principal_rate_tenure_amortization') {
      const principal = resolveInputValue(fieldDef.inputs[0], state, 500000);
      const rate = resolveInputValue(fieldDef.inputs[1], state, 9.5);
      const tenure = resolveInputValue(fieldDef.inputs[2], state, 36);
      
      computedValues[key] = calculateEmiAmortization(principal, rate, tenure);
    }
  }

  return computedValues;
}
