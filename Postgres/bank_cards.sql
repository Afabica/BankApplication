CREATE TABLE bank_cards (
    card_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    card_number VARCHAR(19) NOT NULL UNIQUE,
    card_type VARCHAR(10) CHECK (card_type IN ('Debit', 'Credit', 'Prepaid')),
    expiration_date DATE NOT NULL,
    issue_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(10) DEFAULT 'Active' CHECK (status IN ('Active', 'Blocked', 'Expired')),
    daily_limit DECIMAL(10, 2) DEFAULT 5000.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

