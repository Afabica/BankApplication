package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Collections;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.demo.controller", "com.example.demo.model", "com.example.demo.repository", "com.example.demo.service", "com.example.demo.config", "com.example.demo.jwtsecurity", "com.example.demo.blobservice"})
public class MainApp {
	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(MainApp.class, args);
        String sslEnabled = context.getEnvironment().getProperty("server.ssl.enabled");
        String sslPort = context.getEnvironment().getProperty("server-port");
        String keystore = context.getEnvironment().getProperty("server.ssl.key-store");
    
        System.out.println("Ssl Enabled: " + sslEnabled);
        System.out.println("Running on port: " + sslPort);
        System.out.println("Keystore path: " + keystore);
	}
}


