CREATE TABLE transactions (
    id BIGSERIAL PRIMARY KEY,
    transaction_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    amount NUMERIC(15, 2) NOT NULL CHECK (amount >= 0),
    currency_code CHAR(3) NOT NULL DEFAULT 'USD', -- ISO currency code
    transaction_type VARCHAR(50) NOT NULL, -- consider enum or FK to type table
    description TEXT,
    account_id BIGINT NOT NULL REFERENCES user_authentication(account_id) ON DELETE CASCADE,
    destination_account_id BIGINT REFERENCES user_authentication(account_id) ON DELETE SET NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED')),
    source_iban VARCHAR(34), -- optional if not redundant
    destination_iban VARCHAR(34),
    source_card_number VARCHAR(20),
    destination_card_number VARCHAR(20),
    related_transaction_id BIGINT REFERENCES transactions(id), -- for linking related txns
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    CHECK (amount > 0)
);

CREATE INDEX idx_transactions_account_id ON transactions(account_id);
CREATE INDEX idx_transactions_destination_account_id ON transactions(destination_account_id);
CREATE INDEX idx_transactions_transaction_date ON transactions(transaction_date);

