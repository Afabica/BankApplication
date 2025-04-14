# Use the official Gradle image as the build stage
FROM gradle:7.6-jdk21 as builder

# Set the working directory inside the container
WORKDIR /app

# Copy the entire project to the container
COPY . .

# Ensure gradlew has execute permissions
RUN chmod +x ./gradlew

# Build the application (Gradle build)
RUN ./gradlew build

# Use OpenJDK image for the final runtime image
FROM openjdk:21-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the compiled JAR file from the build stage
COPY --from=builder /app/build/libs/demo-0.0.1-SNAPSHOT.jar /app/demo-0.0.1-SNAPSHOT.jar

# Copy the keystore from the project (make sure it is in the src/main/resources folder)
COPY src/main/resources/local-ssl.p12 /app/local-ssl.p12

# Expose the HTTPS port
EXPOSE 8443

# Run the Spring Boot application with SSL enabled
ENTRYPOINT ["java", "-jar", "/app/demo-0.0.1-SNAPSHOT.jar"]

