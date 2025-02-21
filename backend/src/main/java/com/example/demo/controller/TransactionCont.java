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

    @GetMapping("/transcheck")
    public String gegtSecureData() {
        return "this is a secured endpoint.";
    }

}

//package com.example.demo.controller;
//
//import org.springframework.http.ResponseEntity;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.Cookie;
//import org.springframework.http.HttpStatus;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.*;
//import com.example.demo.service.TransactionService;
//import com.example.demo.jwtsecurity.JwtUtils;
//import com.example.demo.model.Transaction;
//
//
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/operations")
//public class TransactionCont {
//
//    private final TransactionService transactionService;
//    private final JwtUtils jwtUtils;
//
//    public TransactionCont(TransactionService transactionService, JwtUtils jwtUtils) {
//        this.transactionService = transactionService;
//        this.jwtUtils = jwtUtils;
//    }
//
//    @GetMapping("/translist")
//    public ResponseEntity<?> getTransactionList(
//            @RequestParam("userId") Long userId, 
//            HttpServletRequest request, // ✅ Add HttpServletRequest here
//            Authentication authentication) {
//
//        // ✅ Extract token from cookies
//        String token = null;
//        Cookie[] cookies = request.getCookies();
//        if (cookies != null) {
//            for (Cookie cookie : cookies) {
//                if ("token".equals(cookie.getName())) {
//                    token = cookie.getValue();
//                    break;
//                }
//            }
//        }
//
//        if (token == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT missing");
//        }
//
//        // ✅ Verify JWT
//        if (!jwtUtils.verifyToken(token)) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid JWT");
//        }
//
//        try {
//            List<Transaction> listtrans = transactionService.fetchAllTransactions(userId);
//
//            if (listtrans.isEmpty()) {
//                return ResponseEntity.status(404).body(Map.of("message", "No transactions found"));
//            }
//
//            return ResponseEntity.ok(listtrans);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body(Map.of("error", "Internal Server Error"));
//        }
//    }
//
////    @GetMapping("/translist")
////public ResponseEntity<?> getTransactionList(
////        @RequestParam("userId") Long userId, 
////        HttpServletRequest request, 
////        Authentication authentication) {
////
////    // ✅ Debug: Print cookies
////    Cookie[] cookies = request.getCookies();
////    if (cookies != null) {
////        for (Cookie cookie : cookies) {
////            System.out.println("Cookie Name: " + cookie.getName() + ", Value: " + cookie.getValue());
////        }
////    } else {
////        System.out.println("No cookies received.");
////    }
////
////    // ✅ Try to extract token
////    String token = null;
////    if (cookies != null) {
////        for (Cookie cookie : cookies) {
////            if ("token".equals(cookie.getName())) {
////                token = cookie.getValue();
////                break;
////            }
////        }
////    }
////
////    if (token == null) {
////        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT missing");
////    }
////
////    System.out.println("Extracted Token: " + token);
////    
////    return ResponseEntity.ok("Token received: " + token);
////}
//
//}



