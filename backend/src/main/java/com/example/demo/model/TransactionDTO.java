//package com.example.demo.model;
//
//import jakarta.presistence.*;
//import java.math.BigDecimal;
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.ArrayList;
//
//@Entity 
//public class TransactionDTO {
//    private Long id;
//    private String transactionType;
//    private BigDecimal amount;
//    private String description;
//    private String status;
//    private String iban;
//    private String destinationIban;
//    private LocalDateTime createdAt;
//    private LocalDateTime updatedAt;
//
//    public TransactionDTO(Transaction tx) {
//        this.id = tx.getId();
//        this.transactionType = tx.getTransactionType();
//        this.amount = tx.getAmount();
//        this.description = tx.getDescription();
//        this.status = tx.getStatus();
//        this.iban = tx.getIban();
//        this.destinationIban = tx.getDestinationIban();
//        this.createdAt = tx.getCreatedAt();
//        this.updatedAt = tx.getUpdatedAt();
//    }
//}
//
