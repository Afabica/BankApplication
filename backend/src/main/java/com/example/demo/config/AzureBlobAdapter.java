//package com.example.demo.config;
//
//import com.azure.storage.blob.BlobClient;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//import com.azure.storage.blob.BlobClientBuilder;
//import com.azure.storage.BlobServiceClientBuilder;
//
//import java.io.IOException;
//
//@Service
//public class AzureBlobAdapter {
//
//    @Autowired
//    private BlobClientBuilder client;
//
//    public String upload(Multipart file, String prefixName) {
//        if(file != null && file.getSize() > 0) {
//            try {
//                BlobClient blobClient = client.buildClient().getBlobClient(prefixName + file.getOriginalFilename());
//                blobClieent.upload(file.getInputStream(), file.getSize(), true);
//                return "File uploaded successfully";
//            } catch (IOException e) {
//                e.printStackTrace();
//                return "Failed to upload file";
//            } 
//        }
//        return "File upload failed";
//    }
//
//    public byte[] download(String blobName) {
//        BlobClient blobClient = client.buildClient().getBlobClient(blobName);
//        return blobClient.downloadContent().toBytes();
//    }
//
//}
