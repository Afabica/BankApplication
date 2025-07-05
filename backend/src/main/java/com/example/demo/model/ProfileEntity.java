package com.example.demo.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "user_profile")
public class ProfileEntity {

    @Id private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "account_id")
    private RegisterUser user;

    @Column(name = "full_name")
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

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RegisterUser getUser() {
        return user;
    }

    public void setUser(RegisterUser user) {
        this.user = user;
    }

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
}
