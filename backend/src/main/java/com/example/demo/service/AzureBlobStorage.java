package com.example.demo.service;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import com.example.demo.exception.AzureBlobStorageException;
import com.example.demo.model.Storage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import lombok.extern.slf4j.Slf4j;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AzureBlobStorage {

    private final BlobContainerClient blobContainerClient;

    @Autowired
    public AzureBlobStorage(@Value("${azure.storage.connection-string}") String connectionString,
                        @Value("${azure.storage.container-name}") String containerName) {
    BlobServiceClient blobServiceClient = new BlobServiceClientBuilder()
            .connectionString(connectionString)
            .buildClient();
    this.blobContainerClient = blobServiceClient.getBlobContainerClient(containerName);
}


    public String write(Storage storage) throws AzureBlobStorageException {
        try {
            BlobClient blobClient = blobContainerClient.getBlobClient(storage.getPath());
            blobClient.upload(storage.getInputStream(), storage.getSize(), true);
            return blobClient.getBlobUrl();
        } catch (Exception e) {
            throw new AzureBlobStorageException("Error writing file", e);
        }
    }

    public byte[] read(Storage storage) throws AzureBlobStorageException {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            blobContainerClient.getBlobClient(storage.getPath()).downloadStream(outputStream);
            return outputStream.toByteArray();
        } catch (IOException e) {
            throw new AzureBlobStorageException("Error reading file", e);
        }
    }

    public List<String> listFiles(String path) throws AzureBlobStorageException {
        try {
            return blobContainerClient.listBlobsByHierarchy(path)
                    .stream()
                    .map(blobItem -> blobItem.getName())
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new AzureBlobStorageException("Error listing files", e);
        }
    }

    public void delete(String path) throws AzureBlobStorageException {
        try {
            blobContainerClient.getBlobClient(path).delete();
        } catch (Exception e) {
            throw new AzureBlobStorageException("Error deleting file", e);
        }
    }
}

