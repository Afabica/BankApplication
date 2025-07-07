CREATE TABLE otps (
    id BIGSERIAL PRIMARY KEY, -- Auto-incremented primary key
    phone_number VARCHAR(20) NOT NULL, -- Corresponds to phoneNumber field
    otp_code VARCHAR(10), -- Optional field for OTP code
    created_at TIMESTAMP NOT NULL, -- Corresponds to createdAt field
    expires_at TIMESTAMP NOT NULL, -- Corresponds to expiresAt field
    verified BOOLEAN NOT NULL DEFAULT FALSE, -- Default is false
    customer_id BIGINT NOT NULL, -- Foreign key linking to RegisterUser
    CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);
