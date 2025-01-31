CREATE TABLE card_status_history (
    history_id SERIAL PRIMARY KEY,
    card_id INT NOT NULL,
    previous_status VARCHAR(10),
    new_status VARCHAR(10) CHECK (new_status IN ('Active', 'Blocked', 'Expired')),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (card_id) REFERENCES bank_cards(card_id)
);

