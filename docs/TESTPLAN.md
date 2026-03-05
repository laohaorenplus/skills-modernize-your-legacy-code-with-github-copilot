# Student Account Management System - Test Plan

## Test Plan Overview

This test plan validates the business logic and functionality of the COBOL-based Student Account Management System. It covers menu navigation, account operations (balance inquiry, credits, and debits), data persistence, and error handling.

---

## Test Cases

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
|--------------|----------------------|----------------|-----------|-----------------|---------------|--------|----------|
| TC-001 | Display main menu on application start | Application not running | 1. Execute the application | Menu displays with options 1-4, prompt for user choice | | | |
| TC-002 | Valid menu selection - View Balance (Option 1) | Application is running, menu is displayed | 1. Select option 1 | Current balance (1000.00) is displayed | | | |
| TC-003 | Valid menu selection - Credit Account (Option 2) | Application is running, menu is displayed | 1. Select option 2 | Prompt displays asking for credit amount | | | |
| TC-004 | Valid menu selection - Debit Account (Option 3) | Application is running, menu is displayed | 1. Select option 3 | Prompt displays asking for debit amount | | | |
| TC-005 | Valid menu selection - Exit (Option 4) | Application is running, menu is displayed | 1. Select option 4 | Program displays goodbye message and terminates | | | |
| TC-006 | Invalid menu selection - Non-numeric input | Application is running, menu is displayed | 1. Enter non-numeric input (e.g., "A") | Error message "Invalid choice, please select 1-4." displays, menu reappears | | | |
| TC-007 | Invalid menu selection - Out of range (5) | Application is running, menu is displayed | 1. Enter option 5 | Error message "Invalid choice, please select 1-4." displays, menu reappears | | | |
| TC-008 | Invalid menu selection - Out of range (0) | Application is running, menu is displayed | 1. Enter option 0 | Error message "Invalid choice, please select 1-4." displays, menu reappears | | | |
| TC-009 | Menu continues to loop until exit | Application is running | 1. Select option 1, 2. Select option 2, 3. Select option 3, 4. Select option 4 | Menu displays after each operation, program exits after option 4 | | | |
| TC-010 | View balance on fresh start | Application initialized for first time | 1. Select option 1 | Balance of 1000.00 is displayed | | | |
| TC-011 | Credit valid amount (500.00) | Application is running, initial balance is 1000.00 | 1. Select option 2, 2. Enter amount 500, 3. Verify balance with option 1 | New balance of 1500.00 is displayed | | | |
| TC-012 | Credit multiple times | Application is running, initial balance is 1000.00 | 1. Select option 2, enter 250, 2. Select option 2, enter 250, 3. Select option 1 | Final balance of 1500.00 is displayed | | | |
| TC-013 | Credit zero amount | Application is running, initial balance is 1000.00 | 1. Select option 2, 2. Enter amount 0, 3. Select option 1 | Balance remains 1000.00 (no change) | | | |
| TC-014 | Credit maximum amount (999999.99) | Application is running, initial balance is 1000.00 | 1. Select option 2, 2. Enter amount 999999.99, 3. Select option 1 | New balance displays (may overflow depending on system) | | | |
| TC-015 | Debit valid amount with sufficient funds (500.00) | Application is running, initial balance is 1000.00 | 1. Select option 3, 2. Enter amount 500, 3. Select option 1 | New balance of 500.00 is displayed, transaction succeeds | | | |
| TC-016 | Debit exact amount equal to balance | Application is running, initial balance is 1000.00 | 1. Select option 3, 2. Enter amount 1000, 3. Select option 1 | New balance of 0.00 is displayed, transaction succeeds | | | |
| TC-017 | Debit amount greater than balance (insufficient funds) | Application is running, initial balance is 1000.00 | 1. Select option 3, 2. Enter amount 1500 | Error message "Insufficient funds for this debit." displays, balance remains 1000.00 | | | |
| TC-018 | Debit zero amount | Application is running, initial balance is 1000.00 | 1. Select option 3, 2. Enter amount 0, 3. Select option 1 | Balance remains 1000.00 (no change) | | | |
| TC-019 | Debit after successful credit | Application is running, initial balance is 1000.00 | 1. Select option 2, enter 500 (balance = 1500), 2. Select option 3, enter 300, 3. Select option 1 | New balance of 1200.00 is displayed | | | |
| TC-020 | Multiple debits reducing balance | Application is running, initial balance is 1000.00 | 1. Select option 3, enter 200 (balance = 800), 2. Select option 3, enter 300 (balance = 500), 3. Select option 1 | Final balance of 500.00 is displayed | | | |
| TC-021 | Debit after balance reduced to minimum | Application is running, balance = 500.00 | 1. Select option 3, enter 400 (balance = 100), 2. Select option 3, enter 200 | Error message "Insufficient funds for this debit." displays, balance remains 100.00 | | | |
| TC-022 | Operations menu persistence | Application is running | 1. Select option 1, 2. Observe menu, 3. Select option 2, 4. Observe menu | Menu reappears after each operation with all options visible | | | |
| TC-023 | Balance persistence after credit | Application is running, initial balance is 1000.00 | 1. Select option 2, enter 250, 2. Select option 1 | Balance shows 1250.00, confirming credit was persisted | | | |
| TC-024 | Balance persistence after debit | Application is running, initial balance is 1000.00 | 1. Select option 3, enter 250, 2. Select option 1 | Balance shows 750.00, confirming debit was persisted | | | |
| TC-025 | Data integrity across transaction sequence | Application is running, initial balance is 1000.00 | 1. Credit 500 (balance = 1500), 2. Debit 300 (balance = 1200), 3. Credit 100 (balance = 1300), 4. Debit 500 (balance = 800), 5. View balance | Final balance of 800.00 is displayed, all operations successful | | | |
| TC-026 | Overdraft protection prevents negative balance | Application is running, initial balance is 1000.00 | 1. Select option 3, enter 1001 | Error message "Insufficient funds for this debit." displays, balance remains 1000.00 | | | |
| TC-027 | Large credit amount handling | Application is running, initial balance is 1000.00 | 1. Select option 2, enter 500000, 2. Select option 1 | New balance displays (501000.00), confirming large amounts accepted | | | |
| TC-028 | Decimal precision in credit (two decimal places) | Application is running, initial balance is 1000.00 | 1. Select option 2, enter 250.50, 2. Select option 1 | Balance displays as 1250.50 with correct decimal precision | | | |
| TC-029 | Decimal precision in debit (two decimal places) | Application is running, balance = 1250.50 | 1. Select option 3, enter 150.25, 2. Select option 1 | Balance displays as 1100.25 with correct decimal precision | | | |
| TC-030 | Consecutive view balance operations | Application is running, initial balance is 1000.00 | 1. Select option 1, 2. Select option 1, 3. Select option 1 | Balance of 1000.00 displays all three times without change | | | |
| TC-031 | View balance after invalid menu selection | Application is running, initial balance is 1000.00 | 1. Select invalid option (10), 2. View balance (option 1) | Error message displays first, then menu reappears with option to view balance | | | |
| TC-032 | Credit validation - accepts positive amounts | Application is running | 1. Select option 2, 2. Enter valid positive amount | Amount is accepted and balance is updated | | | |
| TC-033 | Debit validation - accepts positive amounts | Application is running | 1. Select option 3, 2. Enter valid positive amount with sufficient balance | Amount is accepted and balance is updated | | | |
| TC-034 | Account operation after exit and restart | Exit program, restart application | 1. Exit program with option 4, 2. Restart application, 3. View balance | Balance resets to initial 1000.00 (session-specific storage) | | | |
| TC-035 | Balance format consistency | Application is running | 1. Perform credit of 1.50, 2. View balance, 3. Perform debit of 0.75, 4. View balance | All balances display in format XXX.XX with proper decimal precision | | | |

---

## Test Summary

### Test Coverage by Feature

| Feature | Test Cases | Coverage |
|---------|-----------|----------|
| Menu Navigation | TC-001 to TC-009 | Valid selections, invalid selections, loop control |
| View Balance Operation | TC-002, TC-010, TC-023, TC-024, TC-030 | Initial balance, display accuracy, persistence |
| Credit Operation | TC-003, TC-011 to TC-014, TC-019, TC-023, TC-027 to TC-028, TC-032 | Various amounts, zero, maximum, decimals, persistence |
| Debit Operation | TC-004, TC-015 to TC-022, TC-024 to TC-026, TC-029, TC-033 | Sufficient funds, insufficient funds, overdraft protection |
| Data Persistence | TC-023, TC-024, TC-025, TC-034 | Balance maintained across operations |
| Error Handling | TC-006 to TC-008, TC-017 to TC-018, TC-026, TC-031 | Invalid inputs, insufficient funds, edge cases |
| Data Integrity | TC-025, TC-028 to TC-029, TC-035 | Decimal precision, consistent formatting |

### Business Logic Validation

- **Initial Balance**: Verified in TC-010
- **Overdraft Protection**: Verified in TC-017, TC-018, TC-026
- **Credit Always Succeeds**: Verified in TC-011 to TC-014, TC-019
- **Debit Validation**: Verified in TC-015 to TC-018, TC-020 to TC-022
- **Balance Persistence**: Verified in TC-023 to TC-025, TC-034
- **Menu Loop Control**: Verified in TC-001, TC-009

---

## Notes for Stakeholder Review

1. **Test Environment**: These tests assume a fresh application session starting with a balance of $1,000.00
2. **Data Reset**: The application resets balance data on each session (no persistent database)
3. **Input Validation**: The system validates numeric menu selections (1-4) and rejects invalid choices
4. **Amount Precision**: All amounts support two decimal places (cents)
5. **Overdraft Protection**: The system prevents any debit that would result in a negative balance
6. **Error Messages**: Clear error messages displayed for invalid operations

---

## Migration to Node.js - Test Mapping

These test cases are designed to be migrated to Node.js unit and integration tests. The following mapping is recommended:

| COBOL Test Category | Node.js Test Type | Implementation |
|-------------------|-------------------|-----------------|
| Menu Navigation (TC-001-009) | Unit Tests | Test menu option validation, input handling |
| Balance Operations (TC-002-005, TC-010, TC-030-031) | Unit Tests | Test balance retrieval, display formatting |
| Credit Operations (TC-011-014, TC-019, TC-023, TC-027-028) | Unit Tests | Test transaction processing, decimal precision |
| Debit Operations (TC-015-022, TC-024, TC-026, TC-029) | Unit Tests | Test withdrawal logic, overdraft validation |
| Data Persistence (TC-025, TC-034) | Integration Tests | Test data storage and retrieval across sessions |
| End-to-End Workflows (TC-025, TC-032-035) | Integration Tests | Test complete user scenarios |

