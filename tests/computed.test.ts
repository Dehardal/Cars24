import { calculateEmiAmortization } from '../sdui/computed';

describe('EMI Amortization calculation', () => {
  it('correctly calculates standard monthly installments', () => {
    // 5 Lakh Principal, 9.5% interest, 36 months tenure
    const emi = calculateEmiAmortization(500000, 9.5, 36);
    expect(emi).toBe(16016);
  });

  it('correctly calculates monthly installments for 24 months', () => {
    // 5 Lakh Principal, 9.5% interest, 24 months tenure
    const emi = calculateEmiAmortization(500000, 9.5, 24);
    expect(emi).toBe(22960);
  });

  it('correctly calculates monthly installments for 12 months', () => {
    // 5 Lakh Principal, 9.5% interest, 12 months tenure
    const emi = calculateEmiAmortization(500000, 9.5, 12);
    expect(emi).toBe(43840);
  });

  it('returns 0 if tenure is 0 or negative', () => {
    expect(calculateEmiAmortization(500000, 9.5, 0)).toBe(0);
    expect(calculateEmiAmortization(500000, 9.5, -12)).toBe(0);
  });

  it('calculates simple division if interest rate is 0', () => {
    expect(calculateEmiAmortization(120000, 0, 12)).toBe(10000);
  });
});
