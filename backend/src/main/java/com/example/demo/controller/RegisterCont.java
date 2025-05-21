package com.example.demo.controller;

import com.example.demo.model.RegisterUser;
import com.example.demo.repository.RegisterRepo;
import com.example.demo.service.UserService;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class RegisterCont {

    private Map<String, String> users = new HashMap<>();

    private UserService userService;
    private RegisterRepo registerRepo;
    private PasswordEncoder passwordEncoder;

    public RegisterCont(
            @Lazy UserService userService,
            @Lazy RegisterRepo registerRepo,
            @Lazy PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.registerRepo = registerRepo;
        this.passwordEncoder = passwordEncoder;
    }

    //    @PostMapping("/register")
    //    public ResponseEntity<?> registration( @RequestBody RegisterUser userDto) {
    //        registerRepo.save(userDto);
    //        //boolean regist = userService.registerUser(userDto);
    //        //if(regist) {
    //        //    return ResponseEntity.ok("User registered");
    //        //} else {
    //        //    return ResponseEntity.badRequest().body("User not registered");
    //       // }
    ////        try {
    ////            RegisterUser registeredUser = userService.registerUser(userDto);
    ////            return ResponseEntity.ok("User registered successfully.");
    ////        } catch (IllegalArgumentException ex) {
    ////            return ResponseEntity.badRequest().body(ex.getMessage());
    ////        }
    //      //  if(users.containsKey(userDto.getUsername())) {
    //       //     return ResponseEntity.badRequest().body("User already exist");
    //        //}
    //        //users.put(userDto.getUsername(), userDto.getPassword());
    //    return ResponseEntity.ok("User registered");
    //    }
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterUser userDto) {
        try {
            userService.registerUser(userDto);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/users")
    public ResponseEntity<Map<String, String>> getRegisteredUsers() {
        // Returns all registered users for debugging
        return ResponseEntity.ok(users);
    }

    //    @GetMappign("/stat")
    //    public ResponseEntity<?> getUserStat(@RequestBody RegisterUser registerUser) {
    //        RegisterUser regUser =
    //
    //    }

}
