package com.example.demo.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.stream.Collectors; // <-- Add this import

public class LoginUser implements UserDetails {

    private final RegisterUser registerUser;

    public LoginUser(RegisterUser registerUser) {
        this.registerUser = registerUser;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return registerUser.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return registerUser.getPassword();
    }

    @Override
    public String getUsername() {
        return registerUser.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public RegisterUser getRegisterUser() {
        return registerUser;
    }
}
