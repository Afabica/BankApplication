package com.example.demo.service;

import com.example.demo.model.BankCardsEnt;
import com.example.demo.model.RegisterUser;
import com.example.demo.model.Transaction;
import com.example.demo.repository.CardRepository;
import com.example.demo.repository.RegisterRepo;
import com.example.demo.repository.TransactionRepo;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepo transactionRepo;
    private final RegisterRepo registerRepo;
    private final CardRepository cardRepository;

    @Autowired
    public TransactionService(
            TransactionRepo transactionRepo,
            RegisterRepo registerRepo,
            CardRepository cardRepository) {
        this.transactionRepo = transactionRepo;
        this.registerRepo = registerRepo;
        this.cardRepository = cardRepository;
    }

    @Transactional
    public void processTransaction(Transaction transaction) {
        // Fetch source and destination cards
        BankCardsEnt sourceCard =
                cardRepository
                        .findByCardNumber(transaction.getSourceCardNumber())
                        .orElseThrow(() -> new IllegalArgumentException("Source card not found"));

        BankCardsEnt destinationCard =
                cardRepository
                        .findByCardNumber(transaction.getDestinationCardNumber())
                        .orElseThrow(
                                () -> new IllegalArgumentException("Destination card not found"));

        // Get associated accounts
        RegisterUser sourceAccount = sourceCard.getAccount();
        RegisterUser destinationAccount = destinationCard.getAccount();

        BigDecimal amount = transaction.getAmount();
        if (sourceAccount.getAmount().compareTo(amount) < 0) {
            throw new IllegalArgumentException("Insufficient funds.");
        }

        // Update balances
        sourceAccount.setAmount(sourceAccount.getAmount().subtract(amount));
        destinationAccount.setAmount(destinationAccount.getAmount().add(amount));

        // Prepare transaction data
        LocalDateTime now = LocalDateTime.now();
        transaction.setAccount(sourceAccount);
        transaction.setTransactionDate(now);
        transaction.setCreatedAt(now);
        transaction.setUpdatedAt(now);
        transaction.setStatus("COMPLETED");

        // Save changes
        registerRepo.save(sourceAccount);
        registerRepo.save(destinationAccount);
        transactionRepo.save(transaction);
    }

    public BigDecimal getCurrentBalance(Long accountId) {
        RegisterUser user =
                registerRepo
                        .findByAccountId(accountId)
                        .orElseThrow(
                                () ->
                                        new IllegalArgumentException(
                                                "Account not found for ID: " + accountId));
        return user.getAmount();
    }

    public List<Transaction> fetchAllTransactions(Long accountId) {
        try {
            return transactionRepo.findAllByDestinationAccount_AccountId(accountId);
        } catch (Exception e) {
            throw new IllegalStateException("Error fetching transactions", e);
        }
    }

    public List<Transaction> fetchAllDestTransactions(Long destinationAccountId) {
        try {
            return transactionRepo.findAllByDestinationAccount_AccountId(destinationAccountId);
        } catch (Exception e) {
            throw new IllegalStateException("Error fetching destination transactions", e);
        }
    }

    public void deleteTransaction(Long id) {
        if (!transactionRepo.existsById(id)) {
            throw new IllegalArgumentException("Transaction with ID " + id + " not found");
        }
        transactionRepo.deleteById(id);
    }
}
