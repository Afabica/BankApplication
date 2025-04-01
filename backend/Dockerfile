# Use OpenJDK 21 slim image
FROM openjdk:21-jdk-slim

# Set working directory
WORKDIR /app 

# Copy built JAR file from the correct location
COPY build/libs/demo-0.0.1-SNAPSHOT.jar app.jar

# Ensure the JAR file is executable
RUN chmod +x app.jar

# Expose the application port
EXPOSE 8080

# Use ENTRYPOINT for better container behavior
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

