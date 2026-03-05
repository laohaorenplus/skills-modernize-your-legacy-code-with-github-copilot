'use strict';

const {
  resetStorage,
  getBalance,
  creditAccount,
  debitAccount,
  validateChoice,
} = require('./index');

// Reset account balance to $1,000.00 before every test to ensure isolation.
beforeEach(() => {
  resetStorage();
});

// =============================================================================
// Menu Navigation — TC-001 to TC-009
// =============================================================================
describe('Menu Navigation (TC-001 to TC-009)', () => {
  // TC-002: Option 1 is a valid selection
  test('TC-002: validateChoice returns 1 for "1"', () => {
    expect(validateChoice('1')).toBe(1);
  });

  // TC-003: Option 2 is a valid selection
  test('TC-003: validateChoice returns 2 for "2"', () => {
    expect(validateChoice('2')).toBe(2);
  });

  // TC-004: Option 3 is a valid selection
  test('TC-004: validateChoice returns 3 for "3"', () => {
    expect(validateChoice('3')).toBe(3);
  });

  // TC-005: Option 4 (Exit) is a valid selection
  test('TC-005: validateChoice returns 4 for "4"', () => {
    expect(validateChoice('4')).toBe(4);
  });

  // TC-006: Non-numeric input is rejected
  test('TC-006: validateChoice returns null for non-numeric "A"', () => {
    expect(validateChoice('A')).toBeNull();
  });

  // TC-007: Out-of-range option 5 is rejected
  test('TC-007: validateChoice returns null for out-of-range "5"', () => {
    expect(validateChoice('5')).toBeNull();
  });

  // TC-008: Out-of-range option 0 is rejected
  test('TC-008: validateChoice returns null for out-of-range "0"', () => {
    expect(validateChoice('0')).toBeNull();
  });

  // TC-009: All four valid choices are accepted (menu loop prerequisite)
  test('TC-009: all valid menu choices (1-4) are accepted', () => {
    expect(validateChoice('1')).toBe(1);
    expect(validateChoice('2')).toBe(2);
    expect(validateChoice('3')).toBe(3);
    expect(validateChoice('4')).toBe(4);
  });
});

// =============================================================================
// View Balance — TC-002, TC-010, TC-030
// =============================================================================
describe('View Balance (TC-002, TC-010, TC-030)', () => {
  // TC-010: Fresh start balance is $1,000.00
  test('TC-010: initial balance is 1000.00', () => {
    expect(getBalance()).toBe(1000.00);
  });

  // TC-030: Multiple consecutive reads do not alter the balance
  test('TC-030: three consecutive getBalance() calls all return 1000.00', () => {
    expect(getBalance()).toBe(1000.00);
    expect(getBalance()).toBe(1000.00);
    expect(getBalance()).toBe(1000.00);
  });
});

// =============================================================================
// Credit Operations — TC-003, TC-011 to TC-014, TC-019, TC-023, TC-027, TC-028, TC-032
// =============================================================================
describe('Credit Operations (TC-011 to TC-014, TC-019, TC-023, TC-027, TC-028, TC-032)', () => {
  // TC-011: Credit 500 → new balance 1500.00
  test('TC-011: credit 500 results in balance 1500.00', () => {
    const result = creditAccount(500);
    expect(result.success).toBe(true);
    expect(result.balance).toBe(1500.00);
    expect(getBalance()).toBe(1500.00);
  });

  // TC-012: Two credits of 250 each → final balance 1500.00
  test('TC-012: two credits of 250 result in balance 1500.00', () => {
    creditAccount(250);
    creditAccount(250);
    expect(getBalance()).toBe(1500.00);
  });

  // TC-013: Credit of 0 is rejected — balance stays 1000.00
  test('TC-013: credit 0 is rejected and balance remains 1000.00', () => {
    const result = creditAccount(0);
    expect(result.success).toBe(false);
    expect(getBalance()).toBe(1000.00);
  });

  // TC-014: Credit max representable amount 999999.99
  test('TC-014: credit 999999.99 results in balance 1000999.99', () => {
    const result = creditAccount(999999.99);
    expect(result.success).toBe(true);
    expect(getBalance()).toBeCloseTo(1000999.99, 2);
  });

  // TC-019: Credit 500 then debit 300 → balance 1200.00
  test('TC-019: credit 500 then debit 300 results in balance 1200.00', () => {
    creditAccount(500);
    debitAccount(300);
    expect(getBalance()).toBe(1200.00);
  });

  // TC-023: Balance persistence confirmed after credit of 250
  test('TC-023: getBalance returns 1250.00 after crediting 250', () => {
    creditAccount(250);
    expect(getBalance()).toBe(1250.00);
  });

  // TC-027: Large credit amount 500000 → balance 501000.00
  test('TC-027: credit 500000 results in balance 501000.00', () => {
    const result = creditAccount(500000);
    expect(result.success).toBe(true);
    expect(getBalance()).toBe(501000.00);
  });

  // TC-028: Decimal precision — credit 250.50 → balance 1250.50
  test('TC-028: credit 250.50 results in balance 1250.50', () => {
    const result = creditAccount(250.50);
    expect(result.success).toBe(true);
    expect(getBalance()).toBeCloseTo(1250.50, 2);
  });

  // TC-032: Positive credit amount is accepted
  test('TC-032: credit of a valid positive amount returns success: true', () => {
    const result = creditAccount(100);
    expect(result.success).toBe(true);
  });
});

// =============================================================================
// Debit Operations — TC-004, TC-015 to TC-022, TC-024, TC-026, TC-029, TC-033
// =============================================================================
describe('Debit Operations (TC-015 to TC-022, TC-024, TC-026, TC-029, TC-033)', () => {
  // TC-015: Debit 500 with sufficient funds → balance 500.00
  test('TC-015: debit 500 results in balance 500.00', () => {
    const result = debitAccount(500);
    expect(result.success).toBe(true);
    expect(result.balance).toBe(500.00);
    expect(getBalance()).toBe(500.00);
  });

  // TC-016: Debit exact balance 1000 → balance 0.00
  test('TC-016: debit exact balance (1000) results in balance 0.00', () => {
    const result = debitAccount(1000);
    expect(result.success).toBe(true);
    expect(result.balance).toBe(0.00);
    expect(getBalance()).toBe(0.00);
  });

  // TC-017: Debit more than balance → insufficient funds, balance unchanged
  test('TC-017: debit 1500 when balance is 1000 returns insufficient funds error', () => {
    const result = debitAccount(1500);
    expect(result.success).toBe(false);
    expect(result.message).toBe('Insufficient funds for this debit.');
    expect(getBalance()).toBe(1000.00);
  });

  // TC-018: Debit 0 is rejected — balance unchanged
  test('TC-018: debit 0 is rejected and balance remains 1000.00', () => {
    const result = debitAccount(0);
    expect(result.success).toBe(false);
    expect(getBalance()).toBe(1000.00);
  });

  // TC-020: Two debits (200 + 300) → final balance 500.00
  test('TC-020: two debits of 200 and 300 result in balance 500.00', () => {
    debitAccount(200);
    debitAccount(300);
    expect(getBalance()).toBe(500.00);
  });

  // TC-021: Reduce balance, then attempt overdraft → rejected
  test('TC-021: debit 400 (balance → 100), then debit 200 is rejected as insufficient funds', () => {
    debitAccount(500);              // balance = 500
    debitAccount(400);              // balance = 100
    const result = debitAccount(200);
    expect(result.success).toBe(false);
    expect(result.message).toBe('Insufficient funds for this debit.');
    expect(getBalance()).toBe(100.00);
  });

  // TC-022: Balance is persisted after debit operation
  test('TC-022: debit updates persisted balance correctly', () => {
    debitAccount(200);
    expect(getBalance()).toBe(800.00);
  });

  // TC-024: Balance persistence confirmed after debit of 250
  test('TC-024: getBalance returns 750.00 after debiting 250', () => {
    debitAccount(250);
    expect(getBalance()).toBe(750.00);
  });

  // TC-026: Overdraft protection — debit 1001 rejected, balance unchanged
  test('TC-026: debit 1001 is rejected and balance remains 1000.00', () => {
    const result = debitAccount(1001);
    expect(result.success).toBe(false);
    expect(result.message).toBe('Insufficient funds for this debit.');
    expect(getBalance()).toBe(1000.00);
  });

  // TC-029: Decimal precision — from balance 1250.50, debit 150.25 → 1100.25
  test('TC-029: debit 150.25 from balance 1250.50 results in 1100.25', () => {
    creditAccount(250.50);             // balance = 1250.50
    const result = debitAccount(150.25);
    expect(result.success).toBe(true);
    expect(getBalance()).toBeCloseTo(1100.25, 2);
  });

  // TC-033: Positive debit with sufficient funds is accepted
  test('TC-033: debit of a valid positive amount with sufficient funds returns success: true', () => {
    const result = debitAccount(100);
    expect(result.success).toBe(true);
  });
});

// =============================================================================
// Data Persistence — TC-023, TC-024, TC-025, TC-034
// =============================================================================
describe('Data Persistence (TC-025, TC-034)', () => {
  // TC-025: Full transaction sequence preserves correct running balance
  test('TC-025: credit 500, debit 300, credit 100, debit 500 → final balance 800.00', () => {
    creditAccount(500);   // 1000 + 500 = 1500
    debitAccount(300);    // 1500 - 300 = 1200
    creditAccount(100);   // 1200 + 100 = 1300
    debitAccount(500);    // 1300 - 500 = 800
    expect(getBalance()).toBe(800.00);
  });

  // TC-034: Application reset restores initial balance of $1,000.00
  test('TC-034: after resetStorage(), balance is restored to 1000.00', () => {
    creditAccount(500);
    debitAccount(200);
    expect(getBalance()).toBe(1300.00);

    resetStorage();
    expect(getBalance()).toBe(1000.00);
  });
});

// =============================================================================
// Data Integrity and Formatting — TC-025, TC-031, TC-035
// =============================================================================
describe('Data Integrity and Formatting (TC-031, TC-035)', () => {
  // TC-031: Invalid menu choice does not alter balance
  test('TC-031: invalid menu choice (null from validateChoice) does not affect balance', () => {
    expect(validateChoice('10')).toBeNull();
    expect(getBalance()).toBe(1000.00);
  });

  // TC-035: Balance displays with correct two-decimal-place precision
  test('TC-035: credit 1.50 then debit 0.75 produces correctly formatted balances', () => {
    const afterCredit = creditAccount(1.50);
    expect(afterCredit.balance.toFixed(2)).toBe('1001.50');

    const afterDebit = debitAccount(0.75);
    expect(afterDebit.balance.toFixed(2)).toBe('1000.75');
  });
});

// =============================================================================
// Result message format validation
// =============================================================================
describe('Result message format', () => {
  test('creditAccount result message contains the new balance', () => {
    const result = creditAccount(500);
    expect(result.message).toBe('Amount credited. New balance: $1500.00');
  });

  test('debitAccount result message contains the new balance', () => {
    const result = debitAccount(500);
    expect(result.message).toBe('Amount debited. New balance: $500.00');
  });

  test('debitAccount insufficient-funds message is correct', () => {
    const result = debitAccount(9999);
    expect(result.message).toBe('Insufficient funds for this debit.');
  });
});
