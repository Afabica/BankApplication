FROM openjdk:11-jre-slim

# Set environment variables
ENV JMETER_VERSION=5.6.2
ENV JMETER_HOME=/opt/jmeter
ENV PATH=$JMETER_HOME/bin:$PATH

# Install dependencies and download JMeter
RUN apt-get update && \
    apt-get install -y wget unzip && \
    wget https://dlcdn.apache.org/jmeter/binaries/apache-jmeter-${JMETER_VERSION}.tgz && \
    tar -xvzf apache-jmeter-${JMETER_VERSION}.tgz && \
    rm apache-jmeter-${JMETER_VERSION}.tgz && \
    mv apache-jmeter-${JMETER_VERSION} /opt/jmeter

# Set JMeter as the default command
CMD ["jmeter"]

