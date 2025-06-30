package com.example.demo.service;

import com.example.demo.model.LoginUser;
import com.example.demo.model.RegisterUser;
import com.example.demo.repository.RegisterRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomerUserDetailsService implements UserDetailsService {

    private final RegisterRepo registerRepo;

    @Autowired
    public CustomerUserDetailsService(RegisterRepo registerRepo) {
        this.registerRepo = registerRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            RegisterUser user = registerRepo.findByUsername(username);
            if (user == null) {
                throw new UsernameNotFoundException("User not found with username: " + username);
            }

            return new LoginUser(user);
        } catch (Exception e) {
            System.err.println("Error in loadUserByUsername: " + e.getMessage());
            e.printStackTrace();
            throw e; // re-throw so Spring Security can handle it
        }
    }
}
