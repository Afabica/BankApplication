//package com.example.demo.service;
//
//import com.azure.storage.blob.BlobServiceClient;
//import com.azure.storage.blob.BlobServiceClientBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.beans.factory.annotation.Value;
//
//@Configuration
//public class AzureBlobConfig {
//
//    @Value("${azure.storage.connection-string}")
//    private String connectionString;
//
//    @Bean
//    public BlobServiceClient blobServiceClient() {
//        return new BlobServiceClientBuilder().connectionString(connectionString).buildClient();
//    }
//}
//
