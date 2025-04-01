package com.example.demo.controller;

import com.example.demo.model.Transaction;
import com.example.demo.service.CustomerService;
import com.example.demo.repository.CustomerRepo;
import com.example.demo.repository.LoginRepo;
import com.example.demo.repository.RegisterRepo;
import com.example.demo.repository.TransactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.example.demo.model.RegisterUser;
import com.example.demo.service.TransactionService;
import com.example.demo.jwtsecurity.JwtUtils;
import java.util.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;

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

//    @GetMapping("/translist")
//    public ResponseEntity<?> getTransactionList(@RequestParam("userId") Long userId) {
//        try {
//            // Fetch the transactions for the given userId
//            List<Transaction> listtrans = transactionService.fetchAllTransactions(userId);
//            
//            if (listtrans.isEmpty()) {
//                return ResponseEntity.status(404).body(Map.of("message", "No transactions found"));
//            }
//            // Return the list of transactions with a 200 OK status
//            return ResponseEntity.ok(listtrans);
//        } catch (IllegalArgumentException e) {
//            // Return error response with 400 status
//            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
//        } catch (Exception e) {
//            // Return generic error response
//            return ResponseEntity.status(500).body(Map.of("error", "Internal Server Error"));
//        }
//    }
      @GetMapping("/translist")
    public ResponseEntity<?> getTransactionList(
            @RequestParam("userId") Long userId, 
            Authentication authentication) {

        


        try {
            String loggedInUser = authentication.getName(); // Get the authenticated user from JWT

            List<Transaction> listtrans = transactionService.fetchAllTransactions(userId);

            if (listtrans.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("message", "No transactions found"));
            }

            return ResponseEntity.ok(listtrans);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Internal Server Error"));
        }
    }
//    @GetMapping("/translist")
//public ResponseEntity<?> getTransactionList(
//        @RequestParam("userId") Long userId, 
//        Authentication authentication) {
//    
//    // Check if authentication is null
//    if (authentication == null) {
//        return ResponseEntity.status(401).body(Map.of("error", "Unauthorized: No authentication provided"));
//    }
//
//    // Get the authenticated user
//    String loggedInUser = authentication.getName();
//
//    // Optional: Verify user ID matches authenticated user (unless admin)
//    if (!isAdmin(authentication) && !userId.equals(getUserIdFromUsername(loggedInUser))) {
//        return ResponseEntity.status(403).body(Map.of("error", "Forbidden: Cannot access other users' transactions"));
//    }
//
//    try {
//        List<Transaction> listtrans = transactionService.fetchAllTransactions(userId);
//
//        if (listtrans.isEmpty()) {
//            return ResponseEntity.status(404).body(Map.of("message", "No transactions found"));
//        }
//
//        return ResponseEntity.ok(listtrans);
//    } catch (IllegalArgumentException e) {
//        return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
//    } catch (Exception e) {
//        return ResponseEntity.status(500).body(Map.of("error", "Internal Server Error"));
//    }
//}


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTransaction(@PathVariable Long id) {
        try {
                transactionService.deleteTransaction(id);
                return ResponseEntity.ok("Transaction deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping("/transcheck")
    public String gegtSecureData() {
        return "this is a secured endpoint.";
    }

}



