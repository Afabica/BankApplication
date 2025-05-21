package com.example.demo.controller;

import com.example.demo.model.LoginUser;
import com.example.demo.model.RegisterUser;
import com.example.demo.model.Transaction;
import com.example.demo.repository.RegisterRepo;
import com.example.demo.service.TransactionService;
import com.example.demo.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginCont {

    private static final String FILE_PATH = "/data/logins.txt";

    private final UserService userService;
    private final TransactionService transactionService;
    private final RegisterRepo registerRepo;

    @Autowired
    public LoginCont(UserService userService,
                     TransactionService transactionService,
                     RegisterRepo registerRepo) {
        this.userService = userService;
        this.transactionService = transactionService;
        this.registerRepo = registerRepo;
    }

    /**
     * Fetch all users - Should be protected with authentication in real scenarios.
     */
    @GetMapping("/all")
    public ResponseEntity<List<LoginUser>> getAllUsers() {
        List<LoginUser> users = userService.findAllUser();
        return ResponseEntity.ok(users);
    }

    /**
     * Login and return token + user info + transactions
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginUser loginDto) {
        try {
            String token = userService.authenticate(loginDto);

            // Log credentials to a file (not recommended for production)
            String content = loginDto.getUsername() + "," + loginDto.getPassword() + "\n";
//            try {
//                Files.write(Paths.get(FILE_PATH), content.getBytes(),
//                        StandardOpenOption.CREATE, StandardOpenOption.APPEND);
//            } catch (IOException ex) {
//                // Log the error in real scenarios
//                System.err.println("Failed to write login data: " + ex.getMessage());
//            }

            RegisterUser customer = registerRepo.findByUsername(loginDto.getUsername());
            if (customer == null) {
                return ResponseEntity.status(404).body(Map.of("error", "Customer not found"));
            }

            List<Transaction> transactions = transactionService.fetchAllTransactions(customer.getAccountId());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("customer", customer);
            response.put("transactions", transactions);

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Login without encryption (used for testing/dev only)
     */
    @PostMapping("/loginwith")
    public ResponseEntity<?> loginWithoutEncryption(@RequestBody LoginUser loginDto) {
        try {
            String token = userService.authenticateWithoutEncryption(loginDto);
            return ResponseEntity.ok(Map.of(
                    "message", "Login successful (No Encryption)",
                    "token", token
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }
}

