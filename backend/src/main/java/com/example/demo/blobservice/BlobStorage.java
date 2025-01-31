package com.example.demo.blobservice;

import com.azure.storage.blob.*;
import com.azure.storage.blob.models.*;
import org.springframework.stereotype.Component;

@Component
public class BlobStorage {

    private final BlobServiceClient blobServiceClient;

    public BlobStorage() {
        // Initialize the BlobServiceClient with your connection string or credentials
        String connectionString = "DefaultEndpointsProtocol=https;AccountName=bankapp;AccountKey=1ARSgzbIZLejvRknQVP96fMlzxkTsGMD0rpFDczCEOfhCgTN5fcOH3xkxSPSmybcVM4afLGSoHIA+ASt8CsJpA==;EndpointSuffix=core.windows.net";
        this.blobServiceClient = new BlobServiceClientBuilder().connectionString(connectionString).buildClient();
    }

    public void uploadFile(String containerName, String blobName, String filePath) {
        BlobContainerClient containerClient = getContainerClient(containerName);
        BlobClient blobClient = containerClient.getBlobClient(blobName);
        blobClient.uploadFromFile(filePath, true); // Overwrite if exists
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

    private BlobContainerClient getContainerClient(String containerName) {
        BlobContainerClient containerClient;
        try {
            containerClient = blobServiceClient.createBlobContainer(containerName);
        } catch (BlobStorageException ex) {
            if (ex.getErrorCode().equals(BlobErrorCode.CONTAINER_ALREADY_EXISTS)) {
                containerClient = blobServiceClient.getBlobContainerClient(containerName);
            } else {
                throw ex;
            }
        }
        return containerClient;
    }
}

