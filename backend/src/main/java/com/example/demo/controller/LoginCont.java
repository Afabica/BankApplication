package com.example.demo.controller;

import com.example.demo.model.RegisterUser;
import com.example.demo.model.Transaction;
import com.example.demo.repository.RegisterRepo;
import com.example.demo.service.LoginService;
import com.example.demo.service.TransactionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginCont {

    private final LoginService loginService;
    private final TransactionService transactionService;
    private final RegisterRepo registerRepo;

    @Autowired
    public LoginCont(
            LoginService loginService,
            TransactionService transactionService,
            RegisterRepo registerRepo) {
        this.loginService = loginService;
        this.transactionService = transactionService;
        this.registerRepo = registerRepo;
    }

    /** Login endpoint: authenticates user and returns JWT token, user info, and transactions. */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody RegisterUser loginDto) {
        try {
            // Authenticate and generate token
            String token = loginService.authenticate(loginDto);

            // Fetch customer details
            RegisterUser customer = registerRepo.findByUsername(loginDto.getUsername());
            if (customer == null) {
                return ResponseEntity.status(404).body(Map.of("error", "Customer not found"));
            }

            // Fetch user transactions
            List<Transaction> transactions =
                    transactionService.fetchAllTransactions(customer.getAccountId());

            // Prepare response body
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("customer", customer);
            // response.put("transactions", transactions);

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            // Authentication failed
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            // Unexpected error
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error"));
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin-only")
    public ResponseEntity<String> adminEndpoint() {
        return ResponseEntity.ok("Admin access granted");
    }
}
