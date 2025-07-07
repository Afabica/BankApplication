package com.example.demo.service;

import com.example.demo.model.ProfileEntity;
import com.example.demo.model.RegisterUser;
import com.example.demo.repository.ProfileRepo;
import com.example.demo.repository.RegisterRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {

    private final ProfileRepo profileRepo;
    private final RegisterRepo registerRepo;

    @Autowired
    public ProfileService(ProfileRepo profileRepo, RegisterRepo registerRepo) {
        this.profileRepo = profileRepo;
        this.registerRepo = registerRepo;
    }

    /**
     * Fetches the profile by its user ID.
     *
     * @throws IllegalArgumentException if no profile is found.
     */
    public ProfileEntity getProfile(Long userId) {
        return profileRepo
                .findById(userId)
                .orElseThrow(
                        () -> new IllegalArgumentException("Profile not found for id: " + userId));
    }

    /**
     * Creates a new profile for an existing user.
     *
     * @param userId ID of the user to attach the profile to.
     * @param dto Profile data transfer object containing profile fields.
     * @return the saved ProfileEntity
     * @throws IllegalArgumentException if the user doesn't exist or profile already exists.
     */
    @Transactional
    public ProfileEntity createProfile(Long userId, ProfileEntity dto) {
        // Fetch the user entity
        RegisterUser user =
                registerRepo
                        .findById(userId)
                        .orElseThrow(
                                () ->
                                        new IllegalArgumentException(
                                                "User not found for id: " + userId));

        // Check if profile already exists for this user
        if (profileRepo.existsById(userId)) {
            throw new IllegalArgumentException("Profile already exists for user id: " + userId);
        }

        ProfileEntity profile = new ProfileEntity();
        //        profile.setUser(user); // Set user relation

        // Copy fields from DTO to entity
        profile.setId(dto.getId());
        profile.setFullName(dto.getFullName());
        profile.setDob(dto.getDob());
        profile.setAddress(dto.getAddress());
        profile.setMobile(dto.getMobile());
        profile.setPassNumber(dto.getPassNumber()); // If you have this field
        profile.setGender(dto.getGender()); // If you have this field
        profile.setIdentificationDetails(dto.getIdentificationDetails());
        profile.setAccountType(dto.getAccountType());
        profile.setEmployer(dto.getEmployer());
        profile.setCreatedAt(dto.getCreatedAt()); // If you allow client to set
        profile.setUpdatedAt(dto.getUpdatedAt()); // Usually updated automatically

        return profileRepo.save(profile);
    }

    /**
     * Updates an existing profile for a given user.
     *
     * @param userId ID of the user whose profile is updated.
     * @param dto Profile data transfer object containing updated fields.
     * @return the updated ProfileEntity
     * @throws IllegalArgumentException if the profile doesn't exist.
     */
    @Transactional
    public ProfileEntity updateProfile(Long userId, ProfileEntity dto) {
        ProfileEntity existing =
                profileRepo
                        .findById(userId)
                        .orElseThrow(
                                () ->
                                        new IllegalArgumentException(
                                                "Cannot update; profile not found for id: "
                                                        + userId));

        // Update fields from DTO
        System.out.println("FULL USER NAME: " + dto.getFullName());
        existing.setFullName(dto.getFullName());
        existing.setDob(dto.getDob());
        existing.setAddress(dto.getAddress());
        existing.setMobile(dto.getMobile());
        existing.setPassNumber(dto.getPassNumber());
        existing.setGender(dto.getGender());
        existing.setIdentificationDetails(dto.getIdentificationDetails());
        existing.setAccountType(dto.getAccountType());
        existing.setEmployer(dto.getEmployer());
        existing.setUpdatedAt(dto.getUpdatedAt()); // You may want to set current time here instead

        return profileRepo.save(existing);
    }

    /**
     * Deletes a profile by user ID.
     *
     * @throws IllegalArgumentException if no profile exists to delete.
     */
    @Transactional
    public void deleteProfile(Long userId) {
        if (!profileRepo.existsById(userId)) {
            throw new IllegalArgumentException(
                    "Cannot delete; profile not found for id: " + userId);
        }
        profileRepo.deleteById(userId);
    }
}
