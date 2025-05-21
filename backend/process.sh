#!/bin/bash

# Ask for JWT
read -p "Do you want to use JWT authentication? (y/n): " USE_JWT

# Prompt for transaction data
read -p "Enter source IBAN: " IBAN
read -p "Enter destination IBAN: " DEST_IBAN
read -p "Enter source card number: " SOURCE_CARD
read -p "Enter destination card number: " DEST_CARD
read -p "Enter amount (e.g., 100.00): " AMOUNT
read -p "Enter transaction type (e.g., TRANSFER): " TX_TYPE
read -p "Enter transaction description: " DESCRIPTION

# Set API endpoint
API_URL="https://localhost:8443/operations/process"

# Build JSON payload
read -r -d '' JSON_PAYLOAD << EOM
{
  "amount": $AMOUNT,
  "transactionType": "$TX_TYPE",
  "description": "$DESCRIPTION",
  "iban": "$IBAN",
  "destinationIban": "$DEST_IBAN",
  "sourceCardNumber": "$SOURCE_CARD",
  "destinationCardNumber": "$DEST_CARD"
}
EOM

# Skip SSL for localhost
CURL_OPTS="-k"

# Prepare output capture
RESPONSE_FILE=$(mktemp)

# Run curl and capture HTTP code and response
if [[ "$USE_JWT" == "y" ]]; then
    read -p "Enter your JWT token: " JWT_TOKEN
    echo "Sending request WITH JWT..."
    HTTP_CODE=$(curl -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $JWT_TOKEN" \
        -d "$JSON_PAYLOAD" \
        $CURL_OPTS \
        -w "%{http_code}" -o "$RESPONSE_FILE" -s)
else
    echo "Sending request WITHOUT JWT..."
    HTTP_CODE=$(curl -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "$JSON_PAYLOAD" \
        $CURL_OPTS \
        -w "%{http_code}" -o "$RESPONSE_FILE" -s)
fi

# Print the response
echo "---------------------"
echo "HTTP Status Code: $HTTP_CODE"
echo "Response Body:"
cat "$RESPONSE_FILE"
echo
echo "---------------------"

# Clean up
rm "$RESPONSE_FILE"

