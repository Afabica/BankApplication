package com.example.demo.controller;

import com.example.demo.model.RegisterUser;
import com.example.demo.service.LoginService;
import com.example.demo.service.RegisterService;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class RegisterCont {

    private final LoginService loginService;
    private final PasswordEncoder passwordEncoder;
    private final RegisterService registerService;

    public RegisterCont(
            @Lazy LoginService loginService,
            @Lazy PasswordEncoder passwordEncoder,
            RegisterService registerService) {
        this.loginService = loginService;
        this.passwordEncoder = passwordEncoder;
        this.registerService = registerService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterUser userDto) {
        try {
            // Assuming registerUser is moved to LoginService or a dedicated RegisterService
            registerService.registerUser(userDto);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // For demonstration/debugging: return all users stored in your loginService or repo (implement
    // accordingly)
    // Removed the unused 'users' map from your original code.
    // You could implement a method in LoginService or RegisterService to get all registered
    // usernames if needed.

}
