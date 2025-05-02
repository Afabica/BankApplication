package com.example.demo.service;

import com.example.demo.model.LoginUser;
import com.example.demo.repository.LoginRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private LoginRepo loginRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Look for the user in the database using the repository
        Optional<LoginUser> optionalUser = loginRepo.findByUsername(username);

        if (optionalUser.isPresent()) {
            LoginUser loginUser = optionalUser.get(); // Get the user from the Optional
            return User.builder().username(loginUser.getUsername()).password(loginUser.getPassword()).build(); // Return the LoginUser object which implements UserDetails
        }

        // If the user doesn't exist, throw an exception
        throw new UsernameNotFoundException("User not found: " + username);
    }
}
