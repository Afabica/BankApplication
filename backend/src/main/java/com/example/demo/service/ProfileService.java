package com.example.demo.service;

import com.example.demo.model.RegisteredAccount;
import com.example.demo.repository.RegisteredAccountRepo;
import com.example.demo.model.Profile;
import com.example.demo.repository.ProfileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;

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
}
