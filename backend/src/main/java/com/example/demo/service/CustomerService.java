package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import com.example.demo.model.Transaction;
import com.example.demo.model.Customer;
import com.example.demo.repository.CustomerRepo;
import com.example.demo.repository.LoginRepo;
import com.example.demo.repository.RegisterRepo;
import com.example.demo.jwtsecurity.JwtUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.time.LocalDateTime;
import jakarta.validation.Valid;
import com.example.demo.model.RegisterUser;
import com.example.demo.model.UserStatistic;
//import com.example.demo.repository.StatisticRepo;

@Service
public class CustomerService {
    
    private final PasswordEncoder passwordEncoder;
    private final LoginRepo loginRepo;
    private final CustomerRepo customerRepo;
    private final RegisterRepo registerRepo;
   // private final StatisticRepo statisticRepo;
    private final JwtUtils jwtUtils;  // Added the missing jwtUtils

    @Autowired
    public CustomerService(@Lazy LoginRepo loginRepo, @Lazy PasswordEncoder passwordEncoder, 
                           @Lazy RegisterRepo registerRepo, JwtUtils jwtUtils, CustomerRepo customerRepo) {
        this.loginRepo = loginRepo;
        this.passwordEncoder = passwordEncoder;
        this.registerRepo = registerRepo;
       // this.statisticRepo = statisticRepo;
        this.jwtUtils = jwtUtils;
        this.customerRepo = customerRepo;// Fixed the missing assignment
    }   

    // Fixed method to return Customer by username
    public Customer findByProfile(String username) {
        return customerRepo.findByUsername(username); // Assuming findByUsername is defined in customerRepo
    }

    // Fixed update profile logic and method names
    public Customer updateProfile(Customer newInfo) {
        Customer updatedInfo = customerRepo.findByUsername(newInfo.getUsername()); // Fixed the repository call

        if (updatedInfo != null) {
            if (newInfo.getFullName() != null) {
                updatedInfo.setFullName(newInfo.getFullName()); // Fixed incorrect method call
            }
            if (newInfo.getEmail() != null) {
                updatedInfo.setEmail(newInfo.getEmail());
            }
            if (newInfo.getPhoneNumber() != null) {
                updatedInfo.setPhoneNumber(newInfo.getPhoneNumber()); // Fixed the logic for phone number check
            }
            if (newInfo.getAddress() != null) {
                updatedInfo.setAddress(newInfo.getAddress());
            }
            if (newInfo.getUsername() != null) {
                updatedInfo.setUsername(newInfo.getUsername());
            }
            updatedInfo.setUpdatedAt(LocalDateTime.now()); // Fixed the setUpdatedAt method call
        }
        return customerRepo.save(updatedInfo);  // Make sure to save updated info to the repository
    }

    // Fixed formTransaction logic and method name
    public Transaction formTransaction(Transaction transaction, Customer sender) {
        Customer custSender = customerRepo.findByUsername(sender.getUsername());  // Fixed the findByUsername logic

        Transaction newTransaction = new Transaction();  // Fixed typo (Transation to Transaction)

        if (transaction.getTransactionDate() != null) {
            newTransaction.setTransactionDate(transaction.getTransactionDate()); // Fixed the incorrect set method
            newTransaction.setAmount(transaction.getAmount());
            newTransaction.setTransactionType(transaction.getTransactionType());
            newTransaction.setStatus(transaction.getStatus());
        }

        return newTransaction;
    }

    // Fixed change profile information logic
    public Customer changeProfileInformation(Customer customer) {
        Customer cust = customerRepo.findByUsername(customer.getUsername());  // Fixed the findByUsername call
        if (cust != null) {
            cust.setUsername(customer.getUsername());  // Corrected method calls (getUsername to setUsername)
            cust.setEmail(customer.getEmail());
            cust.setPhoneNumber(customer.getPhoneNumber());
            cust.setAddress(customer.getAddress());
            return customerRepo.save(cust);  // Save the changes to the repository
        } else {
            throw new RuntimeException("User not found with username: " + customer.getUsername());  // Fixed error message
        }
    }

    public UserSetings getUserSettings( )

//    public UserStatistic fetchUserStatistic(RegisterUser registerUser) {
//        RegisterUser registerUser = registerRepo.findByUsername(registerUser.getUsername());
//        UserStatistic stat = statisticRepo.findByUserId(registerUser.getId());      
//        return stat;
//
//    }
}

