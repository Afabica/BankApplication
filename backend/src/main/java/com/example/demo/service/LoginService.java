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

        return jwtUtils.generatingToken(user); // assuming this method generates JWT token
    }

    //    public String authenticate(RegisterUser loginDto) {
    //        try {
    //            // Find user by username
    //            RegisterUser optionalUser = registerRepo.findByUsername(loginDto.getUsername());
    //
    //            if (optionalUser == null) {
    //                throw new IllegalArgumentException("Invalid username or password");
    //            }
    //
    //            RegisterUser user = optionalUser;
    //
    //            // Validate password
    //            if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
    //                throw new IllegalArgumentException("Invalid username or password");
    //            }
    //
    //            // Generate token
    //            return jwtUtils.generateAccessToken(user.getUsername());
    //
    //        } catch (IllegalArgumentException e) {
    //            throw e; // Bubble up for a global handler to catch and map to 401 or 403
    //        } catch (Exception e) {
    //            e.printStackTrace(); // Optional: use a logger instead
    //            throw new RuntimeException("An unexpected error occurred during authentication");
    //        }
    //    }
    //
    //    public String refreshAccessToken(String refreshToken) {
    //        try {
    //            RefreshToken token =
    //                    refreshTokenRepo
    //                            .findByToken(refreshToken)
    //                            .map(jwtUtils::verifyExpiration)
    //                            .orElseThrow(
    //                                    () ->
    //                                            new IllegalArgumentException(
    //                                                    "Invalid or expired refresh token"));
    //
    //            String username = token.getUser().getUsername();
    //            return jwtUtils.generateAccessToken(username);
    //
    //        } catch (IllegalArgumentException e) {
    //            throw e;
    //        } catch (Exception e) {
    //            e.printStackTrace();
    //            throw new RuntimeException("An error occurred while refreshing the access token");
    //        }
    //    }
    //
    //    public void logout(String refreshToken) {
    //        try {
    //            refreshTokenRepo.deleteByToken(refreshToken);
    //        } catch (Exception e) {
    //            e.printStackTrace();
    //            throw new RuntimeException("Failed to logout user");
    //        }
    //    }
}
