package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "otps")
public class OTPUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "phone_number")
    private String phoneNumber;

    private String otpCode;

    private LocalDateTime createdAt;

    private LocalDateTime expiresAt;

    private boolean verified;

//    @ManyToOne
//    @JoinColumn(name = "customer_id", nullable = false)
//    private RegisterUser registerUser;

    // Constructors
    public OTPUser() {}

    public OTPUser(String phoneNumber, String otpCode, LocalDateTime createdAt, LocalDateTime expiresAt) {
        this.phoneNumber = phoneNumber;
        this.otpCode = otpCode;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.verified = false; // By default, OTP is not verified
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getOtpCode() {
        return otpCode;
    }

    public void setOtpCode(String otpCode) {
        this.otpCode = otpCode;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }
}

