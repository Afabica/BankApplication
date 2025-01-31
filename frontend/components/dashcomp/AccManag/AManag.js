// pages/account-management.js
import React, { useState } from 'react';

export default function AccountManagement() {
  // Example state data
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: 'John Doe',
      accountNumber: '123456789',
      bankKey: '987654321',
      type: 'Savings',
      currency: 'USD',
      balance: 5000,
      availableBalance: 4800,
      transactions: [
        { id: 1, date: '2024-12-10', type: 'Deposit', amount: 200 },
        { id: 2, date: '2024-12-12', type: 'Withdrawal', amount: 100 },
      ],
    },
  ]);

  const [filters, setFilters] = useState({ date: '', type: '' });

  return (
    <div>
      <h1>Account Management</h1>
      
      {/* Account Overview */}
      {accounts.map((account) => (
        <div key={account.id}>
          <h2>Account Overview</h2>
          <p><strong>Account Holder:</strong> {account.name}</p>
          <p><strong>Account Number:</strong> {account.accountNumber}</p>
          <p><strong>Bank Key:</strong> {account.bankKey}</p>
          <p><strong>Type:</strong> {account.type}</p>
          <p><strong>Currency:</strong> {account.currency}</p>

          {/* Account Balances */}
          <h3>Balances</h3>
          <p><strong>Current Balance:</strong> ${account.balance}</p>
          <p><strong>Available Balance:</strong> ${account.availableBalance}</p>

          {/* Recent Transactions */}
          <h3>Recent Transactions</h3>
          <input
            type="text"
            placeholder="Filter by date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Filter by type"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          />
          <ul>
            {account.transactions
              .filter(
                (tx) =>
                  (!filters.date || tx.date.includes(filters.date)) &&
                  (!filters.type || tx.type.includes(filters.type))
              )
              .map((tx) => (
                <li key={tx.id}>
                  {tx.date} - {tx.type} - ${tx.amount}
                </li>
              ))}
          </ul>

          {/* Account Management Options */}
          <h3>Account Management</h3>
          <button onClick={() => alert('Add Account')}>Add Account</button>
          <button onClick={() => alert('Edit Account')}>Edit Account</button>
          <button onClick={() => alert('Close Account')}>Close Account</button>

          {/* Authorization and Signatures */}
          <h3>Authorization and Signatures</h3>
          <button onClick={() => alert('Manage Authorizations')}>
            Manage Authorizations
          </button>

          {/* Notifications */}
          <h3>Notifications</h3>
          <p>No unusual activity detected.</p>
        </div>
      ))}
    </div>
  );
}

