#!/bin/bash

# Prompt user for inputs
read -p "Enter the HOST (default: backend-service.https-con.svc.cluster.local): " HOST
HOST=${HOST:-backend-service.https-con.svc.cluster.local}  # Default value if empty input

read -p "Enter the PORT (default: 8443): " PORT
PORT=${PORT:-8443}  # Default value if empty input

read -p "Enter the PROTOCOL (default: https): " PROTOCOL
PROTOCOL=${PROTOCOL:-https}  # Default value if empty input

read -p "Enter the username (default: testuser): " USERNAME
USERNAME=${USERNAME:-testuser}  # Default value if empty input

read -sp "Enter the password (default: testpass): " PASSWORD
echo  # for new line after password input
PASSWORD=${PASSWORD:-testpass}  # Default value if empty input

# Define the path to the JMX file and result file
JMX_FILE="./test/login_test.jmx"
RESULT_FILE="./results/results.jtl"

# Run the JMeter test with the provided inputs
jmeter -n -t $JMX_FILE \
  -JHOST=$HOST \
  -JPORT=$PORT \
  -JPROTOCOL=$PROTOCOL \
  -Jusername=$USERNAME \
  -Jpassword=$PASSWORD \
  -l $RESULT_FILE

echo "JMeter test completed. Results saved to $RESULT_FILE"

