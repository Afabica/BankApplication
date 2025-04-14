#!/bin/bash 


APP_DIR=/home/Afabica/Programming/Bankapplication/BankApplication/Backend/src/main/resources
JAR_FILR="/home/Afabica/Programming/Bankapplication/BankApplication/backend/build/libs"

java -jat $JAR_FILE --spring.config.location=file:$APP_DIR/application.properties

