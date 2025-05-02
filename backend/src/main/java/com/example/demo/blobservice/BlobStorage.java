package com.example.demo.blobservice;

import com.azure.storage.blob.*;
import com.azure.storage.blob.models.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.example.demo.exception.AzureBlobStorageException;
import java.util.List;
import java.util.ArrayList;

@Service  // Correct annotation to mark this as a Spring service
public class BlobStorage {
    
    private final BlobServiceClient blobServiceClient;
    private BlobContainerClient blobContainerClient;

    // Constructor with injected Azure Storage connection string
    public BlobStorage(@Value("DefaultEndpointsProtocol=https;AccountName=bankapp;AccountKey=1ARSgzbIZLejvRknQVP96fMlzxkTsGMD0rpFDczCEOfhCgTN5fcOH3xkxSPSmybcVM4afLGSoHIA+ASt8CsJpA==;EndpointSuffix=core.windows.net") String connectionString) {
        if (connectionString == null || connectionString.isEmpty()) {
            throw new IllegalArgumentException("Azure Storage connection string is missing!");
        }
        this.blobServiceClient = new BlobServiceClientBuilder()
            .connectionString(connectionString)
            .buildClient();
    }

//    public void uploadFile(String containerName, String blobName, String filePath) {
//        BlobSericeClient blobServiceClient = new BlobServiceClientBuilder()
//            .connectionString()
//            .buildClient();
//
//        BlobContainerClient containerClient = blobSericeClient.getBLobContainerClient(containerName);
//
//        if(!containerCliet.exists()) {
//            containerClient.create();
//        }
//
//        BlobClient blobClient = containerClient.getBlobClient(blobName);
//        blobClient.uploadFromFile(filePath, true);
//    }

    // Method to upload a file
    public void uploadFile(String containerName, String blobName, String filePath) {
        try {
            BlobContainerClient containerClient = getContainerClient(containerName);
            BlobClient blobClient = containerClient.getBlobClient(blobName);
            blobClient.uploadFromFile(filePath, true);  // `true` for overwrite
        } catch (Exception e) {
            throw new AzureBlobStorageException("Error uploading file: " + e.getMessage(), e);
        }
    } 

    // Method to download a file
    public void downloadFile(String containerName, String blobName, String downloadFilePath) {
        try {
            BlobContainerClient containerClient = getContainerClient(containerName);
            BlobClient blobClient = containerClient.getBlobClient(blobName);
            blobClient.downloadToFile(downloadFilePath);
        } catch (Exception e) {
            throw new AzureBlobStorageException("Error downloading file: " + e.getMessage(), e);
        }
    }

    // Method to delete a file
    public void deleteFile(String containerName, String blobName) {
        try {
            BlobContainerClient containerClient = getContainerClient(containerName);
            BlobClient blobClient = containerClient.getBlobClient(blobName);
            blobClient.delete();
        } catch (Exception e) {
            throw new AzureBlobStorageException("Error deleting file: " + e.getMessage(), e);
        }
    }

    // Method to fetch all files in a container
    public List<String> fetchAllFiles(String containerName) {
        List<String> fileNames = new ArrayList<>();
        try {
            BlobContainerClient containerClient = getContainerClient(containerName);
            for (BlobItem blobItem : containerClient.listBlobs()) {
                fileNames.add(blobItem.getName());
            }
        } catch (Exception e) {
            throw new AzureBlobStorageException("Error fetching files: " + e.getMessage(), e);
        }
        return fileNames;
    }

    // Method to get or create a container client
    private BlobContainerClient getContainerClient(String containerName) {
        if (blobContainerClient == null || !blobContainerClient.getBlobContainerName().equals(containerName)) {
            blobContainerClient = blobServiceClient.getBlobContainerClient(containerName);
        }
        return blobContainerClient;
    }
}

