//package com.example.demo.blobservice;
//
//import com.azure.storage.blob.BlobContainerClient;
//import com.azure.storage.blob.BlobServiceClient;
//import com.azure.storage.blob.BlobServiceClientBuilder;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class StorageConfig {
//
//    @Value("${azure.storage.connection-string}")
//    private String connectionString;
//
//    @Value("${azure.storage.container.name}")
//    private String containerName;
//
//    /**
//     * Creates and returns a BlobServiceClient bean.
//     *
//     * @return BlobServiceClient
//     */
//    @Bean
//    public BlobServiceClient blobServiceClient() {
//        return new BlobServiceClientBuilder().connectionString(connectionString).buildClient();
//    }
//
//    /**
//     * Creates and returns a BlobContainerClient bean.
//     *
//     * @param blobServiceClient The BlobServiceClient instance
//     * @return BlobContainerClient
//     */
//    @Bean
//    public BlobContainerClient blobContainerClient(BlobServiceClient blobServiceClient) {
//        return blobServiceClient.getBlobContainerClient(containerName);
//    }
//}
//
