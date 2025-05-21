package com.example.demo.service;

import com.example.demo.jwtsecurity.JwtUtils;
import com.example.demo.model.LoginUser;
import com.example.demo.model.RegisterUser;
import com.example.demo.repository.LoginRepo;
import com.example.demo.repository.RegisterRepo;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final LoginRepo loginRepo;
    private final RegisterRepo registerRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    private final SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    @Autowired
    public UserService(
            @Lazy LoginRepo loginRepo,
            @Lazy PasswordEncoder passwordEncoder,
            @Lazy RegisterRepo registerRepo,
            JwtUtils jwtUtils) {
        this.loginRepo = loginRepo;
        this.passwordEncoder = passwordEncoder;
        this.registerRepo = registerRepo;
        this.jwtUtils = jwtUtils;
    }

    public List<LoginUser> findAllUser() {
        return loginRepo.findAll();
    }

    public String deleteUserById(Long id) {
        Optional<RegisterUser> user = registerRepo.findById(id);
        if (user.isPresent()) {
            registerRepo.deleteById(id);
            loginRepo.deleteById(id);
            return "User deleted successfully";
        } else {
            return "User not found";
        }
    }

    public RegisterUser registerUser(RegisterUser userDto) {
        if (registerRepo.existsByUsername(userDto.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }
        // Encode password before saving
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));

        LoginUser loginUser = new LoginUser();
        loginUser.setUsername(userDto.getUsername());
        loginUser.setPassword(userDto.getPassword());  // Already encoded password
        loginRepo.save(loginUser);

        return registerRepo.save(userDto);
    }

    public String authenticate(LoginUser loginDto) {
        LoginUser user = loginRepo.findByUsername(loginDto.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password");
        }
        return jwtUtils.generatingToken(user);
    }

    public String authenticateWithoutEncryption(LoginUser loginDto) {
        LoginUser user = loginRepo.findByUsername(loginDto.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

        if (!loginDto.getPassword().equals(user.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password");
        }
        return jwtUtils.generatingToken(user);
    }
}

