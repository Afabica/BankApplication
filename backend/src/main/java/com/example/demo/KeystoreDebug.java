package com.example.demo; // Change this to your package

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.InputStream;

@Component
public class KeystoreDebug implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        // Try to load the keystore file from the classpath
        InputStream is = getClass().getClassLoader().getResourceAsStream("local-ssl.p12");
        
        if (is == null) {
            // If the keystore is not found, print a message
            System.out.println("❌ Keystore not found in classpath!");
        } else {
            // If the keystore is found, print a success message
            System.out.println("✅ Keystore found in classpath!");
        }
    }
}

