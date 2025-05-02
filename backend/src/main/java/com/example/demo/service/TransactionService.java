package com.example.demo.service;

import com.example.demo.model.Transaction;
import com.example.demo.model.Customer;
import com.example.demo.model.RegisterUser;
import com.example.demo.repository.TransactionRepo;
import com.example.demo.repository.CustomerRepo;
import com.example.demo.repository.RegisterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.RegisteredAccount;
import com.example.demo.repository.RegisteredAccountRepo;

import java.math.BigDecimal;
import java.util.List;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
public class TransactionService {

    private final TransactionRepo transactionRepo;
    private final CustomerRepo customerRepo;
    private final RegisterRepo registerRepo;
    private final RegisteredAccountRepo accountRepo;

    @Autowired
    public TransactionService(TransactionRepo transactionRepo, CustomerRepo customerRepo, RegisterRepo registerRepo, RegisteredAccountRepo accountRepo) {
        this.transactionRepo = transactionRepo;
        this.customerRepo = customerRepo;
        this.registerRepo = registerRepo;
        this.accountRepo =accountRepo;
    }

    
    public void processTransaction(Transaction transaction) {
        // Fetch source and destination accounts via IBAN
        RegisteredAccount sourceAccount = accountRepo.findByIban(transaction.getIban())
                .orElseThrow(() -> new IllegalArgumentException("Source account not found"));

        RegisteredAccount destinationAccount = accountRepo.findByIban(transaction.getDestinationIban())
                .orElseThrow(() -> new IllegalArgumentException("Destination account not found"));

        BigDecimal transactionAmount = transaction.getAmount();

        if (sourceAccount.getBalance().compareTo(transactionAmount) < 0) {
            throw new IllegalArgumentException("Insufficient funds.");
        }

        // Process transfer
        sourceAccount.setBalance(sourceAccount.getBalance().subtract(transactionAmount));
        destinationAccount.setBalance(destinationAccount.getBalance().add(transactionAmount));

        sourceAccount.setUpdatedAt(LocalDateTime.now());
        destinationAccount.setUpdatedAt(LocalDateTime.now());

        // Update transaction info
        transaction.setAccount(sourceAccount);
        transaction.setDestinationAccount(destinationAccount);
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setStatus("COMPLETED");

        // Save changes
        accountRepo.save(sourceAccount);
        accountRepo.save(destinationAccount);
        transactionRepo.save(transaction);
    }

    public Customer findByUsername(String username) {
        return customerRepo.findByUsername(username);
    }

    public Transaction findOneTransaction(Long accountId) {
        return transactionRepo.findOneByAccountId(accountId);
    }

    public List<Transaction> fetchAllTransactions(Long accountId) {
        try {
            return transactionRepo.findAllByAccountId(accountId);
        } catch (Exception e) {
            throw new IllegalStateException("Error fetching transactions", e);
        }
    }

    public void deleteTransaction(Long id) {
        if (transactionRepo.existsById(id)) {
            transactionRepo.deleteById(id);
        } else {
            throw new RuntimeException("Transaction with ID " + id + " not found");
        }
    }
}

