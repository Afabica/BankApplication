package com.example.demo.service;

import com.example.demo.model.BankCardsEnt;
import com.example.demo.model.CurrentBalance;
import com.example.demo.model.RegisterUser;
import com.example.demo.model.Transaction;
import com.example.demo.repository.CardRepository;
import com.example.demo.repository.RegisterRepo;
import com.example.demo.repository.RegisteredAccountRepo;
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
    private final RegisteredAccountRepo accountRepo;

    @Autowired
    public TransactionService(
            TransactionRepo transactionRepo,
            RegisterRepo registerRepo,
            CardRepository cardRepository,
            RegisteredAccountRepo accountRepo) {
        this.transactionRepo = transactionRepo;
        this.registerRepo = registerRepo;
        this.accountRepo = accountRepo;
        this.cardRepository = cardRepository;
    }

    //    public void processTransaction(Transaction transaction) {
    //        // Fetch source and destination accounts via IBAN
    //        RegisteredAccount sourceAccount =
    //                accountRepo
    //                        .findByIban(transaction.getIban())
    //                        .orElseThrow(
    //                                () -> new IllegalArgumentException("Source account not
    // found"));
    //
    //        RegisteredAccount destinationAccount =
    //                accountRepo
    //                        .findByIban(transaction.getDestinationIban())
    //                        .orElseThrow(
    //                                () ->
    //                                        new IllegalArgumentException(
    //                                                "Destination account not found"));
    //
    //        BigDecimal transactionAmount = transaction.getAmount();
    //
    //        if (sourceAccount.getBalance().compareTo(transactionAmount) < 0) {
    //            throw new IllegalArgumentException("Insufficient funds.");
    //        }
    //
    //        // Process transfer
    //        sourceAccount.setBalance(sourceAccount.getBalance().subtract(transactionAmount));
    //        destinationAccount.setBalance(destinationAccount.getBalance().add(transactionAmount));
    //
    //        sourceAccount.setUpdatedAt(LocalDateTime.now());
    //        destinationAccount.setUpdatedAt(LocalDateTime.now());
    //
    //        // Update transaction info
    //        transaction.setAccount(sourceAccount);
    //        transaction.setDestinationAccount(destinationAccount);
    //        transaction.setTransactionDate(LocalDateTime.now());
    //        transaction.setStatus("COMPLETED");
    //
    //        // Save changes
    //        accountRepo.save(sourceAccount);
    //        accountRepo.save(destinationAccount);
    //        transactionRepo.save(transaction);
    //    }
    @Transactional
    public void processTransaction(Transaction transaction) {
        BankCardsEnt sourceCard =
                cardRepository
                        .findByCardNumber(transaction.getSourceCardNumber())
                        .orElseThrow(() -> new IllegalArgumentException("Source card not found"));

        BankCardsEnt destinationCard =
                cardRepository
                        .findByCardNumber(transaction.getDestinationCardNumber())
                        .orElseThrow(
                                () -> new IllegalArgumentException("Destination card not found"));

        RegisterUser sourceAccount = sourceCard.getAccount();
        RegisterUser destinationAccount = destinationCard.getAccount();

        BigDecimal amount = transaction.getAmount();

        if (sourceAccount.getAmount().compareTo(amount) < 0) {
            throw new IllegalArgumentException("Insufficient funds.");
        }

        // Deduct from source, add to destination
        sourceAccount.setAmount(sourceAccount.getAmount().subtract(amount));

        destinationAccount.setAmount(destinationAccount.getAmount().add(amount));

        LocalDateTime now = LocalDateTime.now();
        //        sourceAccount.setUpdatedAt(now);
        //        destinationAccount.setUpdatedAt(now);

        transaction.setAccount(sourceAccount);
        transaction.setDestinationAccount(destinationAccount);
        transaction.setTransactionDate(now);
        transaction.setStatus("COMPLETED");

        registerRepo.save(sourceAccount);
        registerRepo.save(destinationAccount);
        transactionRepo.save(transaction);
    }

    public CurrentBalance getCurrentBalance(Long accountId) {
        RegisterUser user = registerRepo.findOneById(accountId);
        if (user != null) {
            CurrentBalance balance = new CurrentBalance();
            balance.setId(user.getAccountId());
            balance.setAmount(user.getAmount());
            balance.setCurrency("USD");
            balance.setStatus(true);
            return balance;
        } else {
            CurrentBalance balance = new CurrentBalance();
            balance.setStatus(false);
            return balance;
        }
    }

    public Transaction findOneTransaction(Long accountId) {
        return transactionRepo.findOneByAccountId(accountId);
    }

    public List<Transaction> fetchAllTransactions(Long accountId) {
        try {
            return transactionRepo.findAllByDestinationAccountId(accountId);
        } catch (Exception e) {
            throw new IllegalStateException("Error fetching transactions", e);
        }
    }

    public List<Transaction> fetchAllDestTransactions(Long destination_account_id) {
        try {
            return transactionRepo.findAllByDestinationAccountId(destination_account_id);
        } catch (Exception e) {
            throw new IllegalStateException("Error feetching transactions1", e);
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
