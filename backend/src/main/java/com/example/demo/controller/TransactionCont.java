package com.example.demo.controller;

import com.example.demo.model.Transaction;
import com.example.demo.service.TransactionService;
import com.example.demo.service.CustomerService;
import com.example.demo.repository.CustomerRepo;
import com.example.demo.repository.LoginRepo;
import com.example.demo.repository.RegisterRepo;
import com.example.demo.repository.TransactionRepo;
import com.example.demo.jwtsecurity.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import com.example.demo.model.Customer;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/operations")
public class TransactionCont {

    private final CustomerService customerService;
    private final JwtUtils jwtUtils;
    private final CustomerRepo customerRepo;
    private final LoginRepo loginRepo;
    private final RegisterRepo registerRepo;
    private final TransactionRepo transactionRepo;
    private final TransactionService transactionService;

    @Autowired
    public TransactionCont(
        CustomerService customerService,
        LoginRepo loginRepo,
        RegisterRepo registerRepo,
        TransactionRepo transactionRepo,
        CustomerRepo customerRepo,
        TransactionService transactionService,
        JwtUtils jwtUtils
    ) {
        this.customerService = customerService;
        this.loginRepo = loginRepo;
        this.registerRepo = registerRepo;
        this.transactionRepo = transactionRepo;
        this.jwtUtils = jwtUtils;
        this.customerRepo = customerRepo;
        this.transactionService = transactionService;
    }

    // Endpoint to fetch the transaction list of a user
    @GetMapping("/translist")
    public ResponseEntity<?> getTransactionList(
            @RequestParam("userId") Long userId,
            Authentication authentication) {

        try {
            // Ensure the user is authenticated
            String loggedInUser = authentication.getName(); // Get the authenticated user from JWT

            // Fetch transactions for the given userId
            List<Transaction> listtrans = transactionService.fetchAllTransactions(userId);

            if (listtrans.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("message", "No transactions found"));
            }

            // Return the list of transactions with a 200 OK status
            return ResponseEntity.ok(listtrans);

        } catch (IllegalArgumentException e) {
            // Return error response with 400 status for bad request
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            // Return generic error response
            return ResponseEntity.status(500).body(Map.of("error", "Internal Server Error"));
        }
    }

    // Endpoint to process a transaction (Deposit, Withdrawal, Transfer, Payment)
    @PostMapping("/process")
    public ResponseEntity<?> processTransaction(@RequestBody Transaction transaction, Authentication authentication) {

        try {
            // Ensure the user is authenticated
            String loggedInUser = authentication.getName(); // Get the authenticated user from JWT

            // Process the transaction
            transactionService.processTransaction(transaction);

            // Return success response
            return ResponseEntity.ok(Map.of("message", "Transaction processed successfully"));

        } catch (IllegalArgumentException e) {
            // Return error response if transaction processing fails
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            // Return generic error response
            return ResponseEntity.status(500).body(Map.of("error", "Internal Server Error"));
        }
    }

    // Endpoint to delete a transaction by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTransaction(@PathVariable Long id) {
        try {
            // Delete the transaction using the service
            transactionService.deleteTransaction(id);
            return ResponseEntity.ok("Transaction deleted successfully");
        } catch (RuntimeException e) {
            // Return error response if transaction is not found
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    // Secured endpoint (accessible only for authenticated users)
    @GetMapping("/transcheck")
    public String getSecureData() {
        return "This is a secured endpoint.";
    }
 

    // Optional: Helper method to check if the authenticated user is an admin
    private boolean isAdmin(Authentication authentication) {
        // You can check if the authenticated user has admin privileges based on roles or any other logic
        return authentication.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));
    }

    // Optional: Helper method to fetch user ID from username (assuming your JWT contains user info)
//    private Long getUserIdFromUsername(String username) {
//        // Fetch the user ID from the database or service layer based on the username
//        Customer customer = customerRepo.findByUsername(username);
//        return customer != null ? customer.getId() : null;
//    }
}
