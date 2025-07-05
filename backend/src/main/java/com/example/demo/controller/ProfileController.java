package com.example.demo.controller;

import com.example.demo.model.ProfileEntity;
import com.example.demo.service.ProfileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileService service;

    @Autowired
    public ProfileController(ProfileService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ProfileEntity get(@PathVariable Long id) {
        return service.getProfile(id);
    }

    /** Create a profile for the user with given ID. */
    @PostMapping("/{id}")
    public ProfileEntity create(
            @PathVariable("id") Long id, @RequestBody ProfileEntity profileEntity) {
        return service.createProfile(id, profileEntity);
    }

    /** Update the profile for the user with given ID. */
    @PutMapping("/{id}")
    public ProfileEntity update(
            @PathVariable("id") Long id, @RequestBody ProfileEntity profileEntity) {
        return service.updateProfile(id, profileEntity);
    }

    /** Delete the profile for the user with given ID. */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteProfile(id);
    }
}
