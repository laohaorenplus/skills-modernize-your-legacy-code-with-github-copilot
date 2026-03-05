'use strict';

const readline = require('readline');

// ---------------------------------------------------------------------------
// DataProgram — mirrors data.cob
// Responsible for balance persistence (in-memory, session-scoped).
// Initial balance: $1,000.00
// ---------------------------------------------------------------------------
let storageBalance = 1000.00;

function resetStorage() {
  storageBalance = 1000.00;
}

function dataProgram(operation, value) {
  if (operation === 'READ') return storageBalance;
  if (operation === 'WRITE') storageBalance = value;
}

// ---------------------------------------------------------------------------
// Business logic — mirrors operations.cob (pure, exportable, testable)
// ---------------------------------------------------------------------------

function getBalance() {
  return dataProgram('READ');
}

function creditAccount(amount) {
  if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
    return { success: false, balance: getBalance(), message: 'Invalid amount entered.' };
  }
  let balance = dataProgram('READ');
  balance += amount;
  dataProgram('WRITE', balance);
  return { success: true, balance, message: `Amount credited. New balance: $${balance.toFixed(2)}` };
}

function debitAccount(amount) {
  if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
    return { success: false, balance: getBalance(), message: 'Invalid amount entered.' };
  }
  const balance = dataProgram('READ');
  if (balance >= amount) {
    const newBalance = balance - amount;
    dataProgram('WRITE', newBalance);
    return { success: true, balance: newBalance, message: `Amount debited. New balance: $${newBalance.toFixed(2)}` };
  }
  return { success: false, balance, message: 'Insufficient funds for this debit.' };
}

function validateChoice(choice) {
  const n = parseInt(String(choice).trim(), 10);
  return (n >= 1 && n <= 4) ? n : null;
}

// ---------------------------------------------------------------------------
// I/O layer — only used when running interactively
// ---------------------------------------------------------------------------

async function operations(operationType, question) {
  if (operationType === 'TOTAL') {
    console.log(`Current balance: $${getBalance().toFixed(2)}`);

  } else if (operationType === 'CREDIT') {
    const input = await question('Enter credit amount: ');
    const result = creditAccount(parseFloat(input));
    console.log(result.message);

  } else if (operationType === 'DEBIT') {
    const input = await question('Enter debit amount: ');
    const result = debitAccount(parseFloat(input));
    console.log(result.message);
  }
}

// ---------------------------------------------------------------------------
// MainProgram — mirrors main.cob
// Menu-driven interface; loops until the user selects Exit (option 4).
// ---------------------------------------------------------------------------
async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const question = (prompt) => new Promise((resolve) => rl.question(prompt, resolve));

  let continueFlag = true;

  while (continueFlag) {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');

    const input = await question('Enter your choice (1-4): ');
    const choice = validateChoice(input);

    if (choice === 1) {
      await operations('TOTAL', question);
    } else if (choice === 2) {
      await operations('CREDIT', question);
    } else if (choice === 3) {
      await operations('DEBIT', question);
    } else if (choice === 4) {
      continueFlag = false;
    } else {
      console.log('Invalid choice, please select 1-4.');
    }
  }

  console.log('Exiting the program. Goodbye!');
  rl.close();
}

// ---------------------------------------------------------------------------
// Exports — pure business logic functions (used by unit tests)
// ---------------------------------------------------------------------------
module.exports = { resetStorage, getBalance, creditAccount, debitAccount, validateChoice };

if (require.main === module) {
  main();
}
