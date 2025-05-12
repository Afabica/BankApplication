package com.example.demo.controller;

import com.example.demo.model.Profile;
import com.example.demo.model.RegisteredAccount;
import com.example.demo.repository.ProfileRepo;
import com.example.demo.repository.RegisteredAccountRepo;

import com.example.demo.service.ProfileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.math.BigDecimal;
import java.util.List;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/profile")
public class ProfileController {
    private final RegisteredAccountRepo registeredAccountRepo;
    private final ProfileRepo profileRepo;
    private final ProfileService profileService;

    @Autowired
    public ProfileController(RegisteredAccountRepo registeredAccountRepo, ProfileRepo profileRepo, ProfileService profileService) {
        this.registeredAccountRepo = registeredAccountRepo;
        this.profileRepo = profileRepo;
        this.profileService = profileService;
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserProfile(@RequestParam("id") Long userId, Authentication authentication) {
        try {
            String loggedInUser = authentication.getName();

            Profile userprofile = profileService.fetchUserProfile(userId);

            if (userprofile == null) {
                return ResponseEntity.status(404).body(Map.of("message", "No user profile found."));
            }
            return ResponseEntity.ok(userprofile);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Internal ServiceError"));
        }
    }
}
