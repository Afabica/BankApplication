package com.example.demo.model;

import jakarta.persistence.*;
import com.example.demo.model.RegisterUser;

import java.time.Instant;

@Entity
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // Fixed typo: "ManyYoOne" → "ManyToOne"
    @JoinColumn(name = "user_id", nullable = false)
    private RegisterUser user; // Assuming you're referring to RegisterUser or LoginUser

    @Column(unique = true, nullable = false)
    private String token;

    @Column(name = "expiry_date", nullable = false)
    private Instant expiryDate;

    @Column(name = "issued_at", nullable = false)
    private Instant issuedAt = Instant.now();

    @Column(name = "device_info")
    private String deviceInfo;

    // Default no-arg constructor required by JPA
    public RefreshToken() {}

    // Constructor
    public RefreshToken(
            RegisterUser user,
            String token,
            Instant expiryDate,
            Instant issuedAt,
            String deviceInfo) {
        this.user = user;
        this.token = token;
        this.expiryDate = expiryDate;
        this.issuedAt = issuedAt;
        this.deviceInfo = deviceInfo;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public RegisterUser getUser() {
        return user;
    }

    public void setUser(RegisterUser user) {
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Instant getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Instant expiryDate) {
        this.expiryDate = expiryDate;
    }

    public Instant getIssuedAt() {
        return issuedAt;
    }

    public void setIssuedAt(Instant issuedAt) {
        this.issuedAt = issuedAt;
    }

    public String getDeviceInfo() {
        return deviceInfo;
    }

    public void setDeviceInfo(String deviceInfo) {
        this.deviceInfo = deviceInfo;
    }
}
