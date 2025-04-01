package com.example.demo.controller;

import com.example.demo.blobservice.BlobStorage;
import com.example.demo.exception.AzureBlobStorageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blob")
public class BlobController {

    private final BlobStorage blobStorage;

    @Autowired
    public BlobController(BlobStorage blobStorage) {
        this.blobStorage = blobStorage;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam String containerName,
                                             @RequestParam String blobName,
                                             @RequestParam String filePath) {
        try {
            blobStorage.uploadFile(containerName, blobName, filePath);
            return ResponseEntity.ok("✅ File uploaded successfully!");
        } catch (AzureBlobStorageException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Upload failed: " + e.getMessage());
        }
    }

    @GetMapping("/download")
    public ResponseEntity<String> downloadFile(@RequestParam String containerName,
                                               @RequestParam String blobName,
                                               @RequestParam String downloadFilePath) {
        try {
            blobStorage.downloadFile(containerName, blobName, downloadFilePath);
            return ResponseEntity.ok("✅ File downloaded successfully!");
        } catch (AzureBlobStorageException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Download failed: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteFile(@RequestParam String containerName,
                                             @RequestParam String blobName) {
        try {
            blobStorage.deleteFile(containerName, blobName);
            return ResponseEntity.ok("✅ File deleted successfully!");
        } catch (AzureBlobStorageException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Deletion failed: " + e.getMessage());
        }
    }

    @GetMapping("/fetchAllFiles")
    public ResponseEntity<List<String>> fetchAllFiles(@RequestParam String containerName) {
        try {
            List<String> files = blobStorage.fetchAllFiles(containerName);
            return ResponseEntity.ok(files);
        } catch (AzureBlobStorageException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
}

