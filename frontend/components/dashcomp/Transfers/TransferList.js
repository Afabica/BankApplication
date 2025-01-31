'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';


const MOCK_TRANSFERS = [
  { id: 1, recipient: 'Alice', amount: 50, date: '2023-12-01', type: 'Sent' },
  { id: 2, recipient: 'Bob', amount: 100, date: '2023-12-02', type: 'Received' },
  // More mock data...
];



const TransferList = () => {
  const [transfers, setTransfers] = useState(MOCK_TRANSFERS);

  useEffect(() => {
    const fetchData = async () => {
        const cookies = parseCookies();
        const token = cookies.jwt;

        const response = await axios.get('http://localhost:8080/', {
                headers: {
                    'Authentication': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
        });
    }
  }, []);





  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Transfers</h2>
      <ul className="space-y-4">
        {transfers.map((transfer) => (
          <li
            key={transfer.id}
            className="p-4 border rounded-lg shadow-sm flex justify-between"
          >
            <span>
              {transfer.type} to/from <strong>{transfer.recipient}</strong>
            </span>
            <span>${transfer.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransferList;

