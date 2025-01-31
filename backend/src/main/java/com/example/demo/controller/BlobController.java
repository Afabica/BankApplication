//package com.example.demo.controller;
//
//import com.example.demo.exception.AzureBlobStorageException;
//import com.example.demo.model.Storage;
//import com.example.demo.service.AzureBlobStorage;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/blob")
//public class BlobController {
//
//    private final AzureBlobStorage azureBlobStorage;
//
//    @Autowired
//    public BlobController(AzureBlobStorage azureBlobStorage) {
//        this.azureBlobStorage = azureBlobStorage;
//    }
//
//    // Write (Upload) a file to Azure Blob Storage
//    @PostMapping("/upload")
//    public ResponseEntity<String> uploadBlob(@RequestParam("file") MultipartFile file,
//                                             @RequestParam("path") String path,
//                                             @RequestParam("fileName") String fileName) {
//        try {
//            // Create a Storage object and call the write method
//            Storage storage = new Storage();
//            storage.setFileName(fileName);
//            storage.setPath(path);
//            storage.setInputStream(file.getInputStream());
//
//            String uploadedPath = azureBlobStorage.write(storage);
//            return ResponseEntity.status(HttpStatus.CREATED).body("File uploaded to: " + uploadedPath);
//        } catch (AzureBlobStorageException | IOException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file: " + e.getMessage());
//        }
//    }
//
//    // Update an existing file in Azure Blob Storage
//    @PostMapping("/update")
//    public ResponseEntity<String> updateBlob(@RequestParam("file") MultipartFile file,
//                                             @RequestParam("path") String path,
//                                             @RequestParam("fileName") String fileName) {
//        try {
//            Storage storage = new Storage();
//            storage.setFileName(fileName);
//            storage.setPath(path);
//            storage.setInputStream(file.getInputStream());
//
//            String updatedPath = azureBlobStorage.update(storage);
//            return ResponseEntity.ok("File updated at: " + updatedPath);
//        } catch (AzureBlobStorageException | IOException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating file: " + e.getMessage());
//        }
//    }
//
//    // Read (Download) a file from Azure Blob Storage
//    @GetMapping("/read")
//    public ResponseEntity<byte[]> readBlob(@RequestParam("path") String path,
//                                           @RequestParam("fileName") String fileName) {
//        try {
//            Storage storage = new Storage();
//            storage.setPath(path);
//            storage.setFileName(fileName);
//
//            byte[] fileContent = azureBlobStorage.read(storage);
//            return ResponseEntity.ok(fileContent);
//        } catch (AzureBlobStorageException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }
//    }
//
//    // List all files in a specific path in Azure Blob Storage
//    @GetMapping("/list")
//    public ResponseEntity<List<String>> listFiles(@RequestParam("path") String path) {
//        try {
//            Storage storage = new Storage();
//            storage.setPath(path);
//
//            List<String> fileNames = azureBlobStorage.listFiles(storage);
//            return ResponseEntity.ok(fileNames);
//        } catch (AzureBlobStorageException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }
//    }
//
//    // Delete a specific file from Azure Blob Storage
//    @DeleteMapping("/delete")
//    public ResponseEntity<String> deleteBlob(@RequestParam("path") String path,
//                                              @RequestParam("fileName") String fileName) {
//        try {
//            Storage storage = new Storage();
//            storage.setPath(path);
//            storage.setFileName(fileName);
//
//            azureBlobStorage.delete(storage);
//            return ResponseEntity.ok("File deleted successfully");
//        } catch (AzureBlobStorageException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting file: " + e.getMessage());
//        }
//    }
//
//    // Create a new Blob Container
//    @PostMapping("/createContainer")
//    public ResponseEntity<String> createContainer() {
//        try {
//            azureBlobStorage.createContainer();
//            return ResponseEntity.status(HttpStatus.CREATED).body("Blob container created successfully");
//        } catch (AzureBlobStorageException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating container: " + e.getMessage());
//        }
//    }
//
//    // Delete a Blob Container
//    @DeleteMapping("/deleteContainer")
//    public ResponseEntity<String> deleteContainer() {
//        try {
//            azureBlobStorage.deleteContainer();
//            return ResponseEntity.ok("Blob container deleted successfully");
//        } catch (AzureBlobStorageException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting container: " + e.getMessage());
//        }
//    }
//}
//
package com.example.demo.controller;

import com.example.demo.blobservice.BlobStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/blob")
public class BlobController {

    private final BlobStorage blobStorage;

    @Autowired
    public BlobController(BlobStorage blobStorage) {
        this.blobStorage = blobStorage;
    }

    @PostMapping("/upload")
    public String uploadFile(@RequestParam String containerName,
                             @RequestParam String blobName,
                             @RequestParam String filePath) {
        blobStorage.uploadFile(containerName, blobName, filePath);
        return "File uploaded successfully!";
    }

    @PostMapping("/download")
    public String downloadFile(@RequestParam String containerName,
                               @RequestParam String blobName,
                               @RequestParam String downloadFilePath) {
        blobStorage.downloadFile(containerName, blobName, downloadFilePath);
        return "File downloaded successfully!";
    }

    @PostMapping("/delete")
    public String deleteFile(@RequestParam String containerName,
                             @RequestParam String blobName) {
        blobStorage.deleteFile(containerName, blobName);
        return "File deleted successfully!";
    }
}

