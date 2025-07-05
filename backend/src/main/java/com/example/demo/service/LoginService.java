package com.example.demo.service;

import com.example.demo.jwtsecurity.JwtUtils;
import com.example.demo.model.RegisterUser;
import com.example.demo.repository.RefreshTokenRepo;
import com.example.demo.repository.RegisterRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    private final RegisterRepo registerRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final RefreshTokenRepo refreshTokenRepo;

    @Autowired
    public LoginService(
            @Lazy RegisterRepo registerRepo,
            @Lazy PasswordEncoder passwordEncoder,
            @Lazy RefreshTokenRepo refreshTokenRepo,
            JwtUtils jwtUtils) {
        this.registerRepo = registerRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.refreshTokenRepo = refreshTokenRepo;
    }

    public String deleteUserById(Long id) {
        Optional<RegisterUser> user = registerRepo.findById(id);
        if (user.isPresent()) {
            registerRepo.deleteById(id);
            return "User deleted successfully";
        } else {
            return "User not found";
        }
    }

    public String authenticate(RegisterUser loginDto) {
        RegisterUser user = registerRepo.findByUsername(loginDto.getUsername());
        if (user == null) {
            throw new IllegalArgumentException(
                    "User not found with username: " + loginDto.getUsername());
        }

        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        return jwtUtils.generateTokenFromUser(user); // assuming this method generates JWT token
    }
}
