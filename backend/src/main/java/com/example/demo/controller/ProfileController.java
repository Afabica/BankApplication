package com.example.demo.controller;

import com.example.demo.model.Profile;
import com.example.demo.repository.ProfileRepo;
import com.example.demo.service.ProfileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileRepo profileRepo;
    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileRepo profileRepo, ProfileService profileService) {
        this.profileRepo = profileRepo;
        this.profileService = profileService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserProfile(
            @PathVariable("id") Long userId, Authentication authentication) {
        try {
            String loggedInUser = authentication.getName();

            Profile userProfile = profileService.fetchUserProfile(userId);

            if (userProfile == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "No user profile found."));
            }
            return ResponseEntity.ok(userProfile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Internal Server Error"));
        }
    }

    @PostMapping
    public ResponseEntity<?> addUserProfile(
            @RequestBody Profile profile, Authentication authentication) {
        try {
            boolean operation = profileService.createProfile(profile);
            if (operation) {
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body("User profile successfully added.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Profile creation failed.");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Internal Server Error"));
        }
    }

    @DeleteMapping("/{user_id}")
    public ResponseEntity<?> deleteUserProfile(
            @PathVariable("user_id") Long userId, Authentication authentication) {
        try {
            boolean operation = profileService.deleteProfile(userId);
            if (operation) {
                return ResponseEntity.ok("Profile deleted successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Profile not deleted, please try again.");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
