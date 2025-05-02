//package com.example.demo.model;
//
//import jakarta.persistence.*;
//import java.math.BigDecimal;
//import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "transactions")
//public class Transaction {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(name = "transaction_date", nullable = false)
//    private LocalDateTime transactionDate;
//
//    @Column(nullable = false, precision = 15, scale = 2)
//    private BigDecimal amount;
//
//    @Column(name = "transaction_type", nullable = false, length = 50)
//    private String transactionType;
//
//    @Column(columnDefinition = "TEXT")
//    private String description;
//
//
//    @ManyToOne
//    @JoinColumn(name = "account_id")
//    private RegisteredAccount account;
//
//    @ManyToOne
//    @JoinColumn(name = "destiation_account_id")
//    private RegisteredAccount destinationAccount;
//
//    @Column(name = "account_id", nullable = false)
//    private Long accountId;
//
//    @Column(name = "destination_account_id")
//    private Long destinationAccountId;
//
//    @Column(nullable = false, length = 20)
//    private String status = "PENDING";
//
//    @Column(nullable = false, length = 34)
//    private String iban;
//
//    @Column(name = "destination_iban", length = 34)
//    private String destinationIban;
//
//    @Column(name = "created_at", nullable = false, updatable = false)
//    private LocalDateTime createdAt = LocalDateTime.now();
//
//    @Column(name = "updated_at", nullable = false)
//    private LocalDateTime updatedAt = LocalDateTime.now();
//
//    @PreUpdate
//    public void preUpdate() {
//        this.updatedAt = LocalDateTime.now();
//    }
//
//    // Getters and Setters
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public LocalDateTime getTransactionDate() {
//        return transactionDate;
//    }
//
//    public void setTransactionDate(LocalDateTime transactionDate) {
//        this.transactionDate = transactionDate;
//    }
//
//    public BigDecimal getAmount() {
//        return amount;
//    }
//
//    public void setAmount(BigDecimal amount) {
//        this.amount = amount;
//    }
//
//    public String getTransactionType() {
//        return transactionType;
//    }
//
//    public void setTransactionType(String transactionType) {
//        this.transactionType = transactionType;
//    }
//
//    public String getDescription() {
//        return description;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }
//
//    public Long getAccountId() {
//        return accountId;
//    }
//
//    public void setAccountId(Long accountId) {
//        this.accountId = accountId;
//    }
//
//    public Long getDestinationAccountId() {
//        return destinationAccountId;
//    }
//
//    public void setDestinationAccountId(Long destinationAccountId) {
//        this.destinationAccountId = destinationAccountId;
//    }
//
//    public String getStatus() {
//        return status;
//    }
//
//    public void setStatus(String status) {
//        this.status = status;
//    }
//
//    public String getIban() {
//        return iban;
//    }
//
//    public void setIban(String iban) {
//        this.iban = iban;
//    }
//
//    public String getDestinationIban() {
//        return destinationIban;
//    }
//
//    public void setDestinationIban(String destinationIban) {
//        this.destinationIban = destinationIban;
//    }
//
//    public LocalDateTime getCreatedAt() {
//        return createdAt;
//    }
//
//    public void setCreatedAt(LocalDateTime createdAt) {
//        this.createdAt = createdAt;
//    }
//
//    public LocalDateTime getUpdatedAt() {
//        return updatedAt;
//    }
//
//    public void setUpdatedAt(LocalDateTime updatedAt) {
//        this.updatedAt = updatedAt;
//    }
//}
package com.example.demo.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "transaction_date", nullable = false)
    private LocalDateTime transactionDate;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(name = "transaction_type", nullable = false, length = 50)
    private String transactionType;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    @JsonIgnore
    private RegisteredAccount account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_account_id")
    @JsonIgnore
    private RegisteredAccount destinationAccount;

    @Column(nullable = false, length = 20)
    private String status = "PENDING";

    @Column(nullable = false, length = 34)
    private String iban;

    @Column(name = "destination_iban", length = 34)
    private String destinationIban;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDateTime transactionDate) {
        this.transactionDate = transactionDate;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public RegisteredAccount getAccount() {
        return account;
    }

    public void setAccount(RegisteredAccount account) {
        this.account = account;
    }

    public RegisteredAccount getDestinationAccount() {
        return destinationAccount;
    }

    public void setDestinationAccount(RegisteredAccount destinationAccount) {
        this.destinationAccount = destinationAccount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getIban() {
        return iban;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }

    public String getDestinationIban() {
        return destinationIban;
    }

    public void setDestinationIban(String destinationIban) {
        this.destinationIban = destinationIban;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}

