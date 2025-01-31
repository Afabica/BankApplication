CREATE TABLE card_limits (
    limit_id SERIAL PRIMARY KEY,
    card_id INT NOT NULL,
    limit_type VARCHAR(10) CHECK (limit_type IN ('Daily', 'Monthly')),
    amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (card_id) REFERENCES bank_cards(card_id)
);

