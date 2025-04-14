package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
//import org.jasypt.util.text.AES256TextEncryptor;

@Entity
@Table(name = "bank_cards")
public class BankCardsEnt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_id")
    private Long cardId;

    @Column(name = "customer_id", nullable = false)
    private Long customerId;

    @Column(name = "card_number", nullable = false, unique = true, length = 19)
//    @Convert(converter = CardNumberEncryptionConverter.class)
    private String cardNumber;

    @Column(name = "card_type", nullable = false, length = 10)
    private String cardType;

    @Column(name = "expiration_date", nullable = false)
    private LocalDate expirationDate;

    @Column(name = "issue_date", nullable = false)
    private LocalDate issueDate;

    @Column(name = "status", nullable = false, length = 10)
    private String status;

    @Column(name = "cash") 
    private Long cash;

    @Column(name = "daily_limit", precision = 10, scale = 2, nullable = false)
    private Long dailyLimit;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "customers", referencedColumnName = "customer_id", insertable = false, updatable = false)
    private Customer customers;

    public BankCardsEnt(Long customerId, String cardType, LocalDate expirationDate, LocalDate issueDate, String status, Customer customers) {
        this.customerId = customerId;
        this.cardType = cardType; 
        this.expirationDate = expirationDate;
        this.issueDate = issueDate;
        this.status = status;
        this.customers = customers;

    }
    // Default Constructor
    public BankCardsEnt() {
        Long value = 5000L; 
        this.issueDate = LocalDate.now();
        this.status = "Active";
        this.dailyLimit = value;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Lifecycle Hooks
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getCardId() {
        return cardId;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public LocalDate getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(LocalDate issueDate) {
        this.issueDate = issueDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getDailyLimit() {
        return dailyLimit;
    }

    public void setDailyLimit(Long dailyLimit) {
        this.dailyLimit = dailyLimit;
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

    public Customer getCustomer() {
        return customers;
    }

    public void setCustomer(Customer customers) {
        this.customers = customers;

    }

    public Long getBalance() {
        return cash;
    }

    public void setBalance(Long cash) {
        this.cash = cash;
    }

    // Encryption Converter
//    @Converter
//    public static class CardNumberEncryptionConverter implements AttributeConverter<String, String> {
//        private static final String SECRET_KEY = "leopard1000";
//
//        private final AES256TextEncryptor textEncryptor = new AES256TextEncryptor();
//
//        public CardNumberEncryptionConverter() {
//            textEncryptor.setPassword(SECRET_KEY);
//        }
//
//        @Override
//        public String convertToDatabaseColumn(String attribute) {
//            try {
//                if (attribute == null) {
//                    return null;
//                }
//                return textEncryptor.encrypt(attribute);
//            } catch (Exception e) {
//                throw new IllegalArgumentException("Error encrypting card number", e);
//            }
//        }
//
//        @Override
//        public String convertToEntityAttribute(String dbData) {
//            try {
//                if (dbData == null) {
//                    return null;
//                }
//                return textEncryptor.decrypt(dbData);
//            } catch (Exception e) {
//                throw new IllegalArgumentException("Error decrypting card number", e);
//            }
//        }
//    }
}

