package com.example.demo.exception;

public class AzureBlobStorageException extends RuntimeException {
    public AzureBlobStorageException(String message) {
        super(message);
    }

    public AzureBlobStorageException(String message, Throwable cause) {
        super(message, cause);
    }
}

