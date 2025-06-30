package com.example.demo.service;

import com.example.demo.model.Profile;
import com.example.demo.repository.ProfileRepo;
import com.example.demo.repository.RegisterRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {
    private final ProfileRepo profileRepo;
    private final RegisterRepo registerRepo;

    @Autowired
    public ProfileService(ProfileRepo profileRepo, RegisterRepo registerRepo) {
        this.profileRepo = profileRepo;
        this.registerRepo = registerRepo;
    }

    public Profile fetchUserProfile(Long id) {
        try {
            Optional<Profile> userProfile = profileRepo.findOneById(id);
            return userProfile.orElse(null);
        } catch (Exception e) {
            throw new IllegalStateException("Error fetching user profile", e);
        }
    }

    public Boolean createProfile(Profile newProfile) {
        Optional<Profile> existingProfile = profileRepo.findOneById(newProfile.getRegistrationId());
        if (existingProfile.isPresent()) {
            throw new IllegalArgumentException("This profile already exists.");
        } else {
            profileRepo.save(newProfile);
            return true;
        }
    }

    public Boolean deleteProfile(Long id) {
        Optional<Profile> profile = profileRepo.findOneById(id);
        if (profile.isPresent()) {
            profileRepo.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public Profile editProfile(Profile profile) {
        Optional<Profile> userProfile = profileRepo.findOneById(profile.getId());
        if (userProfile.isPresent()) {
            return profileRepo.save(profile); // Updates the profile
        } else {
            throw new IllegalArgumentException("This profile doesn't exist.");
        }
    }
}

