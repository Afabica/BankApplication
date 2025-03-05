//package com.example.demo.controller;
//
//import com.example.demo.model.Customer;
//import com.example.demo.model.LoginUser;
//import com.example.demo.model.RegisterUser;
//import com.example.demo.model.Transaction;
//import com.example.demo.repository.CustomerRepo;
//import com.example.demo.repository.LoginRepo;
//import com.example.demo.repository.RegisterRepo;
//import com.example.demo.repository.TransactionRepo;
//import com.example.demo.service.CustomerService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//
//import java.util.*;
//
//@RestController
//@RequestMapping("/dashboard")
//public class CustomerCont {
//
//    private final CustomerService customerService;
//    private final CustomerRepo customerRepo;
//    private final LoginRepo loginRepo;
//    private final RegisterRepo registerRepo;
//    private final TransactionRepo transactionRepo;
//
//    @Autowired
//    public CustomerCont(CustomerService customerService, CustomerRepo customerRepo, LoginRepo loginRepo, RegisterRepo registerRepo, TransactionRepo transactionRepo) {
//        this.customerService = customerService;
//        this.customerRepo = customerRepo;
//        this.loginRepo = loginRepo;
//        this.registerRepo = registerRepo;
//        this.transactionRepo = transactionRepo;
//    }
//
////    @GetMapping("/profile")
////    public ResponseEntity<?> getAuthenticatedUser() {
////        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
////        String email;
////
////        if (principal instanceof String) {
////            email = (String) principal;
////        } else if (principal instanceof CustomUserDetails) {
////            email = ((CustomUserDetails) principal).getUsername();
////        } else {
////            return ResponseEntity.status(401).body("Unauthorized access.");
////        }
////
////        Customer customer = customerRepo.findByEmail(email);
////        return customer != null ? ResponseEntity.ok(customer) : ResponseEntity.status(404).body("Customer not found.");
////    }
//
//    @GetMapping("/registereduser")
//    public ResponseEntity<?> getInfoAboutRegisteredUser(@RequestParam String username) {
//        RegisterUser registerUser = registerRepo.findByUsername(username);
//        return registerUser != null
//                ? ResponseEntity.ok(registerUser)
//                : ResponseEntity.status(404).body("User not found.");
//    }
//
////    @GetMapping("/statistic")
////    public ResponseEntity<?> getStatisticUser(@RequestParam Long user_id) 
//
////    @PostMapping("/transaction")
////    public ResponseEntity<?> executeTransaction(@RequestBody Transaction transaction) {
////        try {
////            Objects.requireNonNull(transaction, "Transaction cannot be null");
////            Objects.requireNonNull(transaction.getTransactionType(), "Transaction type cannot be null");
////
////            transactionRepo.save(transaction);
////            return ResponseEntity.ok("Transaction executed successfully.");
////        } catch (NullPointerException e) {
////            return ResponseEntity.badRequest().body("Missing required transaction details: " + e.getMessage());
////        } catch (Exception e) {
////            return ResponseEntity.badRequest().body("Error processing transaction: " + e.getMessage());
////        }
////    }
//
////    @PostMapping("/editprofile")
////    public ResponseEntity<?> editProfilePage(@RequestBody Customer customer) {
////        Customer existingCustomer = customerRepo.findByUsername(customer.getUsername());
////        if (existingCustomer != null) {
////            if (customer.getUsername() != null) existingCustomer.setUsername(customer.getUsername());
////            if (customer.getEmail() != null) existingCustomer.setEmail(customer.getEmail());
////            if (customer.getPhoneNumber() != null) existingCustomer.setPhoneNumber(customer.getPhoneNumber());
////            if (customer.getAddress() != null) existingCustomer.setAddress(customer.getAddress());
////
////            customerRepo.save(existingCustomer);
////            return ResponseEntity.ok("Profile updated successfully.");
////        } else {
////            return ResponseEntity.status(404).body("User not found.");
////        }
////    }
//
////    @GetMapping("/usersettings")
////    public ResponseEntity<?> getUserSettings(@RequestParam Long user_id) {
////        UserSettings set = customerService.getUserSettings(user_id);
////        if((set.getLanguage()) != null) {
////            return ResponseEntity.ok("Settings fetched: " + set);
////        } else {
////            return ResponseEntity.status(404).body("User not found.");
////        }
////    }
//
//
////    @GetMapping("/userstatistic")
////    public ResponseEntity<?> getUserStatistic(@RequestParam Long user_id) {
////        UserStatistic stat = customerService.getUserStatistic(user_id);
////        if((stat.getCreditScore()) != null) {
////            return ResponseEntity.ok("User statistic fetched. " + stat);
////        } else {
////            return ResponseEntity.status(404).body("User not found.");
////        }
////    }
//
////    @GetMapping("/usercards")
////    public ResponseEntity<?> fetchUserCards(@RequestParam String username) {
////        Customer customer = customerRepo.findByUsername(username);
////        if (customer != null) {
////            List<Transaction> transactions = transactionRepo.findByCustomerId(customer.getId());
////            return ResponseEntity.ok(transactions != null ? transactions : Collections.emptyList());
////        } else {
////            return ResponseEntity.status(404).body("User not found.");
////        }
////    }
//}
//
