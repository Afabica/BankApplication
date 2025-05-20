package com.example.demo.controller;

import com.example.demo.model.Profile;
import com.example.demo.repository.ProfileRepo;
import com.example.demo.repository.RegisteredAccountRepo;
import com.example.demo.service.ProfileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/profile")
public class ProfileController {
    private final RegisteredAccountRepo registeredAccountRepo;
    private final ProfileRepo profileRepo;
    private final ProfileService profileService;

    @Autowired
    public ProfileController(
            RegisteredAccountRepo registeredAccountRepo,
            ProfileRepo profileRepo,
            ProfileService profileService) {
        this.registeredAccountRepo = registeredAccountRepo;
        this.profileRepo = profileRepo;
        this.profileService = profileService;
    }

    @GetMapping("/oldprofile")
    public ResponseEntity<?> getUserProfile(
            @RequestParam("id") Long userId, Authentication authentication) {
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

    @PostMapping("/newprofile")
    public ResponseEntity<?> addUserProfile(
            @RequestBody Profile profile, Authentication authentication) {
        try {
            Boolean operation = profileService.createProfile(profile);
            if (operation == true) {
                return ResponseEntity.status(200).body("User profile successfully added.");
            } else {
                return ResponseEntity.status(200).body("User profile seccessfully added.");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Internal Server Error"));
        }
    }

    @DeleteMapping("/delprofile")
    public ResponseEntity<?> deleteUserProfile(
            @RequestParam("user_id") Long user_id, Authentication authentication) {
        try {
            Boolean operation = profileService.deleteProfile(user_id);
            if (operation == true) {
                return ResponseEntity.status(200).body("Profile deleted successfully.");
            } else {
                return ResponseEntity.status(400).body("Profile not deleted, please try again.");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}
