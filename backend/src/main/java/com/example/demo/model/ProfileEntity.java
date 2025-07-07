package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_profile")
public class ProfileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //    @OneToOne
    //    @MapsId
    //    @JoinColumn(name = "account_id")
    //    private RegisterUser user;

    @Column(name = "full_name")
    @NotNull(message = "Full name is required")
    private String fullName;

    private LocalDate dob;
    private String address;
    private String mobile;

    private String passNumber;
    private Boolean gender;

    @Column(name = "identification_details")
    private String identificationDetails;

    //    @Column(name = "amount", precision = 19, scale = 2)
    //    private BigDecimal amount;

    @Column(name = "account_type")
    private String accountType;

    private String employer;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime created_at;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updated_at;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    //    public RegisterUser getUser() {
    //        return user;
    //    }
    //
    //    public void setUser(RegisterUser user) {
    //        this.user = user;
    //    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public void setGender(Boolean gender) {
        this.gender = gender;
    }

    public Boolean getGender() {
        return gender;
    }

    public void setPassNumber(String passNumber) {
        this.passNumber = passNumber;
    }

    public String getPassNumber() {
        return passNumber;
    }

    public String getIdentificationDetails() {
        return identificationDetails;
    }

    public void setIdentificationDetails(String identificationDetails) {
        this.identificationDetails = identificationDetails;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public String getEmployer() {
        return employer;
    }

    public void setEmployer(String employer) {
        this.employer = employer;
    }

    public void setCreatedAt(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public LocalDateTime getCreatedAt() {
        return created_at;
    }

    public void setUpdatedAt(LocalDateTime updated_at) {
        this.updated_at = updated_at;
    }

    public LocalDateTime getUpdatedAt() {
        return updated_at;
    }
}
