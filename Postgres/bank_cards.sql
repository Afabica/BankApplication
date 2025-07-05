CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  card_number VARCHAR(20) NOT NULL UNIQUE,  -- masked: e.g., **** **** **** 1234
  bank_name VARCHAR(100) NOT NULL,
  card_type VARCHAR(50) NOT NULL,           -- e.g., "Debit", "Credit", "Virtual"
  brand VARCHAR(50) NOT NULL,               -- e.g., "Visa", "MasterCard"
  expiry_date DATE NOT NULL,
  cvv_hash TEXT,                            -- only if storing securely, else omit
  balance NUMERIC(12, 2) DEFAULT 0.00,

  is_active BOOLEAN DEFAULT true,
  issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

