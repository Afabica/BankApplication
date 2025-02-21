package com.example.demo.controller;

import com.example.demo.model.LoginUser;
import com.example.demo.model.RegisterUser;
import com.example.demo.model.Transaction;
import com.example.demo.repository.CustomerRepo;
import com.example.demo.repository.RegisterRepo;
import com.example.demo.repository.TransactionRepo;
import com.example.demo.service.TransactionService;
import com.example.demo.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginCont {

    private final UserService userService;
    private final CustomerRepo customerRepo;
    private final TransactionService transactionService;
    private final RegisterRepo registerRepo;

    @Autowired
    public LoginCont(UserService userService, CustomerRepo customerRepo,
                     TransactionService transactionService, RegisterRepo registerRepo) {
        this.userService = userService;
        this.customerRepo = customerRepo;
        this.transactionService = transactionService;
        this.registerRepo = registerRepo;
    }

    /**
     * Fetch all users - Make sure this is protected.
     */
    @GetMapping("/all")
    public ResponseEntity<List<LoginUser>> getAllUsers() {
        List<LoginUser> users = userService.findAllUser();
        return ResponseEntity.ok(users);
    }

    /**
     * Authenticate user and return JWT token (with encryption)
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginUser loginDto) {
        try {
            // Authenticate the user and generate JWT token
            String token = userService.authenticate(loginDto);

            // Find the user by username from the register repository
            RegisterUser customer = registerRepo.findByUsername(loginDto.getUsername());
            if (customer == null) {
                return ResponseEntity.status(404).body(Map.of("error", "Customer not found"));
            }

            // Fetch transactions related to the customer
            List<Transaction> transactions = transactionService.fetchAllTransactions(customer.getId());

            // Prepare response with token, customer info, and transactions
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
     * Authenticate user and return JWT token (without encryption)
     */
    @PostMapping("/loginwith")
    public ResponseEntity<?> loginWithoutEncryption(@RequestBody LoginUser loginDto) {
        try {
            String token = userService.authenticateWithoutEncryption(loginDto);
            return ResponseEntity.ok(Map.of("message", "Login successful (No Encryption)", "token", token));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }
}

