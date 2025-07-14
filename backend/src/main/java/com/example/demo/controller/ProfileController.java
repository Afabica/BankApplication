package com.example.demo.controller;

import com.example.demo.model.ProfileEntity;
import com.example.demo.service.ProfileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/{id}")
    public ProfileEntity get(@PathVariable Long id) {
        return profileService.getProfile(id);
    }

    /** Create a profile for the user with given ID. */
    @PostMapping("/{id}")
    public ProfileEntity create(
            @PathVariable("id") Long id, @RequestBody ProfileEntity profileEntity) {
        return profileService.createProfile(id, profileEntity);
    }

    /** Update the profile for the user with given ID. */
    @PutMapping("/{id}")
    public ProfileEntity update(
            @PathVariable("id") Long id, @RequestBody ProfileEntity profileEntity) {
        return profileService.updateProfile(id, profileEntity);
    }

    /** Delete the profile for the user with given ID. */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        profileService.deleteProfile(id);
    }
}
