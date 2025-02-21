//package com.example.demo.controller;
//
//import com.example.demo.exception.AzureBlobStorageException;
//import com.example.demo.model.Storage;
////import com.example.demo.service.AzureBlobStorage;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import org.springframework.web.multipart.MultipartFile;
//import com.example.demo.blobservice.BlobStorage;
//
//
//import java.io.IOException;
//import java.util.List;
//
//@RestController
//@RequestMapping("/blob")
//public class BlobController {
//
//    @Autowired
//    private final BlobStorage blobStorage;
//
//    @Autowired
//    public BlobController(BlobStorage blobStorage) {
//        this.blobStorage = blobStorage;
//    }
//
//    @PostMapping("/upload")
//    public ResponseEntity<String> uploadFile(@RequestParam String containerName,
//                                             @RequestParam String blobName,
//                                             @RequestParam String filePath) {
//        blobStorage.uploadFile(containerName, blobName, filePath);
//        return ResponseEntity.ok("File uploaded successfully!");
//    }
//
//    @PostMapping("/download")
//    public ResponseEntity<String> downloadFile(@RequestParam String containerName,
//                                               @RequestParam String blobName,
//                                               @RequestParam String downloadFilePath) {
//        blobStorage.downloadFile(containerName, blobName, downloadFilePath);
//        return ResponseEntity.ok("File downloaded successfully!");
//    }
//
//    @DeleteMapping("/delete")
//    public ResponseEntity<String> deleteFile(@RequestParam String containerName,
//                                             @RequestParam String blobName) {
//        blobStorage.deleteFile(containerName, blobName);
//        return ResponseEntity.ok("File deleted successfully!");
//    }
//
//    @GetMapping("/fetchAllFiles")
//    public ResponseEntity<List<String>> fetchAllFiles() {
//        List<String> files = blobStorage.fetchAllFiles("users");
//        return ResponseEntity.ok(files);
//    }
//}
//
