//package com.example.demo.model;
//
//import jakarta.persistence.*;
//import java.time.LocalDate;
//import java.util.*;
//
//
//
//public class CardResponseDTO {
//    private Long cardId;
//    private String maskedCardNumber;
//    private String cardType;
//    private LocalDate expirationDate;
//    private String status;
//
//    // Map from the BankCard entity to the DTO
//    public static CardResponseDTO fromEntity(BankCard card) {
//        CardResponseDTO dto = new CardResponseDTO();
//        dto.cardId = card.getCardId();
//        dto.maskedCardNumber = maskCardNumber(card.getCardNumber());
//        dto.cardType = card.getCardType();
//        dto.expirationDate = card.getExpirationDate();
//        dto.status = card.getStatus();
//        return dto;
//    }
//
//    // Mask the card number (e.g., "************1111")
//    private static String maskCardNumber(String cardNumber) {
//        if (cardNumber == null || cardNumber.length() < 4) {
//            return "****";
//        }
//        return "************" + cardNumber.substring(cardNumber.length() - 4);
//    }
//
//    // Getters and Setters
//    public Long getCardId() {
//        return cardId;
//    }
//
//    public void setCardId(Long cardId) {
//        this.cardId = cardId;
//    }
//
//    public String getMaskedCardNumber() {
//        return maskedCardNumber;
//    }
//
//    public void setMaskedCardNumber(String maskedCardNumber) {
//        this.maskedCardNumber = maskedCardNumber;
//    }
//
//    public String getCardType() {
//        return cardType;
//    }
//
//    public void setCardType(String cardType) {
//        this.cardType = cardType;
//    }
//
//    public LocalDate getExpirationDate() {
//        return expirationDate;
//    }
//
//    public void setExpirationDate(LocalDate expirationDate) {
//        this.expirationDate = expirationDate;
//    }
//
//    public String getStatus() {
//        return status;
//    }
//
//    public void setStatus(String status) {
//        this.status = status;
//    }
//}
//
