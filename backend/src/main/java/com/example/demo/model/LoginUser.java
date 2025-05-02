package com.example.demo.model;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Entity
@Table(name = "loginuser")
public class LoginUser implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;

    // Additional fields can be added like roles, account status etc.

    public LoginUser() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Implement the methods required by UserDetails

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Here you can return authorities/roles (e.g., roles assigned to the user)
        return null; // For simplicity, you can return an empty list or null if no roles are used
    }

    @Override
    public boolean isAccountNonExpired() {
        // Define logic to check if the account is expired (e.g., expired password, locked account)
        return true; // Set to true for now, assuming account is not expired
    }

    @Override
    public boolean isAccountNonLocked() {
        // Define logic for account lock (e.g., after too many failed login attempts)
        return true; // Set to true for now, assuming account is not locked
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // Define logic to check if the credentials (password) are expired
        return true; // Set to true for now
    }

    @Override
    public boolean isEnabled() {
        // Define logic to check if the user is enabled (active user or disabled)
        return true; // Set to true for now, assuming user is always enabled
    }
}

