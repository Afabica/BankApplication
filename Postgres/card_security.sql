CREATE TABLE card_security (
    card_security_id SERIAL PRIMARY KEY,
    card_id INT NOT NULL UNIQUE,
    cvv_hash VARCHAR(255) NOT NULL,           -- CVV should ideally be hashed and never stored in plain text
    encrypted_card_number BYTEA,              -- Optionally, store an encrypted version of the card number
    FOREIGN KEY (card_id) REFERENCES bank_cards(card_id)
);

