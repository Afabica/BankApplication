package com.example.demo.service;

import com.example.demo.model.Profile;
import com.example.demo.repository.ProfileRepo;
import com.example.demo.repository.RegisteredAccountRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    private final RegisteredAccountRepo registeredAccount;
    private final ProfileRepo profileRepo;

    @Autowired
    public ProfileService(RegisteredAccountRepo registeredAccount, ProfileRepo profileRepo) {
        this.registeredAccount = registeredAccount;
        this.profileRepo = profileRepo;
    }

    public Profile fetchUserProfile(Long id) {
        try {
            return profileRepo.findOneById(id);
        } catch (Exception e) {
            throw new IllegalStateException("Error fetching user profile", e);
        }
    }

    public Boolean createProfile(Profile newprofile) {
        Profile profile = profileRepo.findOneById(newprofile.getRegistrationId());
        if (profile != null) {
            throw new IllegalArgumentException("This profile already exist.");
        } else {
            profileRepo.save(newprofile);
            return true;
        }
    }

    public Boolean deleteProfile(Long id) {
        Profile profile = profileRepo.findOneById(id);

        if (profile != null) {
            profileRepo.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
