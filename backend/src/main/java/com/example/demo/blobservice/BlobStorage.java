package com.example.demo.blobservice;

import com.azure.storage.blob.*;
import com.azure.storage.blob.models.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.example.demo.exception.AzureBlobStorageException;

import java.util.List;
import java.util.ArrayList;

@Service  // Correct annotation
public class BlobStorage {

    private final BlobServiceClient blobServiceClient;
    private BlobContainerClient blobContainerClient;

    // Spring will automatically inject this value from `application.properties`
    public BlobStorage(@Value("${azure.storage.connection-string}") String connectionString) {
        if (connectionString == null || connectionString.isEmpty()) {
            throw new IllegalArgumentException("Azure Storage connection string is missing!");
        }

        this.blobServiceClient = new BlobServiceClientBuilder().connectionString(connectionString).buildClient();
    }

    public void uploadFile(String containerName, String blobName, String filePath) {
        BlobContainerClient containerClient = getContainerClient(containerName);
        BlobClient blobClient = containerClient.getBlobClient(blobName);
        blobClient.uploadFromFile(filePath, true);
    }

    public void downloadFile(String containerName, String blobName, String downloadFilePath) {
        BlobContainerClient containerClient = getContainerClient(containerName);
        BlobClient blobClient = containerClient.getBlobClient(blobName);
        blobClient.downloadToFile(downloadFilePath);
    }

    public void deleteFile(String containerName, String blobName) {
        BlobContainerClient containerClient = getContainerClient(containerName);
        BlobClient blobClient = containerClient.getBlobClient(blobName);
        blobClient.delete();
    }

    public List<String> fetchAllFiles(String containerName) {
        List<String> fileNames = new ArrayList<>();
        BlobContainerClient containerClient = getContainerClient(containerName);

        try {
            for (BlobItem blobItem : containerClient.listBlobs()) {
                fileNames.add(blobItem.getName());
            }
        } catch (Exception e) {
            throw new AzureBlobStorageException("Error fetching files: " + e.getMessage());
        }
        return fileNames;
    }

    private BlobContainerClient getContainerClient(String containerName) {
        if (blobContainerClient == null || !blobContainerClient.getBlobContainerName().equals(containerName)) {
            blobContainerClient = blobServiceClient.getBlobContainerClient(containerName);
        }
        return blobContainerClient;
    }
}

