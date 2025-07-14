package com.example.demo.service;

import com.example.demo.model.RegisterUser;
import com.example.demo.repository.CardRepository;
import com.example.demo.repository.RegisterRepo;
import com.example.demo.repository.TransactionRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {

    private final RegisterRepo registerRepo;
    private final CardRepository cardRepository;
    private final TransactionRepo transactionRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public RegisterService(
            RegisterRepo registerRepo,
            CardRepository cardRepository,
            TransactionRepo transactionRepo,
            PasswordEncoder passwordEncoder) {
        this.registerRepo = registerRepo;
        this.cardRepository = cardRepository;
        this.transactionRepo = transactionRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public RegisterUser registerUser(RegisterUser userDto) {
        // Check if username exists only in registerRepo (which stores RegisterUser)
        if (registerRepo.existsByUsername(userDto.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }

        // Encode the password before saving
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));

        // Save RegisterUser entity (userDto) into registerRepo
        RegisterUser savedUser = registerRepo.save(userDto);

        // If you want to save into loginRepo as well, create a new LoginUser entity and save it
        // But usually LoginUser should NOT be an entity or stored separately
        // So I recommend removing this loginRepo.save unless you have specific reason
        /*
        LoginUser loginUser = new LoginUser(savedUser);
        loginRepo.save(loginUser);
        */

        return savedUser;
    }

    public RegisterUser getUserInfo(Long userId) {
        return registerRepo
                .findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Unexisting id has passed"));
    }

    public RegisterUser updateUserPassword(Long userId, RegisterUser newInfo) {
        RegisterUser user =
                registerRepo
                        .findById(userId)
                        .orElseThrow(() -> new IllegalArgumentException("Account not fraud"));
        if (user.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(newInfo.getPassword()));
        }

        return registerRepo.save(user);
    }

    public void deleteUserAccount(Long account_id) {
        // You should delete related entities carefully to avoid foreign key constraint errors
        // Assuming that cardRepository and transactionRepo have methods to delete by userId
        // properly

        // Delete cards by user id (implement a method in CardRepository if needed)
        cardRepository.deleteByAccountId(account_id);

        // Delete transactions by user id (implement a method in TransactionRepo if needed)
        transactionRepo.deleteById(account_id);

        // Delete login user if exists (only if loginRepo is used)

        // Finally delete the main user
        registerRepo.deleteById(account_id);
    }

    public RegisterUser editUserInfo(RegisterUser newInfo) {
        if (registerRepo.existsById(newInfo.getAccountId())) {
            // Optional: fetch existing entity and update fields selectively before saving
            return registerRepo.save(newInfo);
        } else {
            throw new IllegalArgumentException("Unexisting id has passed");
        }
    }
}
