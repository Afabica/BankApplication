package com.example.demo.controller;

import com.example.demo.model.Transaction;
import com.example.demo.service.CustomerService;
import com.example.demo.repository.CustomerRepo;
import com.example.demo.repository.LoginRepo;
import com.example.demo.repository.RegisterRepo;
import com.example.demo.repository.TransactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/operations")
public class TransactionCont {

    private final CustomerService customerService;
    private final CustomerRepo customerRepo;
    private final LoginRepo loginRepo;
    private final RegisterRepo registerRepo;
    private final TransactionRepo transactionRepo;

    @Autowired
    public TransactionCont(
        CustomerService customerService,
        LoginRepo loginRepo,
        RegisterRepo registerRepo,
        TransactionRepo transactionRepo,
        CustomerRepo customerRepo
    ) {
        this.customerService = customerService;
        this.loginRepo = loginRepo;
        this.registerRepo = registerRepo;
        this.transactionRepo = transactionRepo;
        this.customerRepo = customerRepo;
    }

    @GetMapping("/translist")
    public List<Transaction> getTransactionList() {
        // Fetch all transactions from the repository
        return transactionRepo.findAll(); // Assuming you want to fetch all transactions
    }
}

