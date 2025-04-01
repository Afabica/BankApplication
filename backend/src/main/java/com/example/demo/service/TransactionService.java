package com.example.demo.service;

import com.example.demo.model.Transaction;
import com.example.demo.model.BalanceChange;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.repository.CardRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import com.example.demo.repository.TransactionRepo;
import com.example.demo.model.Customer;
import com.example.demo.repository.CustomerRepo;
import com.example.demo.model.BankCardsEnt;
import java.util.ArrayList;
import java.util.List;
import java.math.BigInteger;


@Service 
public class TransactionService {

    private final TransactionRepo transactionRepo;
    private final CustomerRepo customerRepo;
    private final CardRepository cardRepository;

    @Autowired 
    public TransactionService(TransactionRepo transactionRepo, CustomerRepo customerRepo, CardRepository cardRepository) {
        this.transactionRepo = transactionRepo;
        this.customerRepo = customerRepo;
        this.cardRepository =  cardRepository;
    }
    
    // Process a transaction and update account balance
    public void processTransaction(Long accountId, Long transactionAmount) {
        // Fetch the bank card account for the given accountId
        BankCardsEnt account = cardRepository.findByCustomerId(accountId);
        
        if (account == null) {
            throw new IllegalArgumentException("Account not found for customer ID: " + accountId);
        }

        BigInteger oldBalance = account.getBalance();
        BigInteger newBalance = oldBalance.add(transactionAmount);

        // Update the balance in the account
        account.setBalance(newBalance);
        cardRepository.save(account); // Persist the updated balance

        // Create a new transaction record
        Transaction transaction = new Transaction();
        transaction.setId(account.getCustomerId());
        transaction.setAmount(transactionAmount);
        transaction.setTransactionType("Deposit");
        transaction.setBalanceChange(BalanceChange.fromAmount(transactionAmount));  // Assuming BalanceChange is an Enum or a method to define the type of transaction
        transaction.setDescription("Transaction processed for account: " + accountId);

        // Save the transaction
        transactionRepo.save(transaction);
    }
//
    

    public Customer findByUsername(String username) {
        Customer findCust = customerRepo.findByUsername(username);
        return findCust;
    }

    public Transaction findOneTransaction(Long account_id) {

        Transaction findtrans = transactionRepo.findOneByAccountId(account_id);
        return findtrans;
    }

public List<Transaction> fetchAllTransactions(Long account_id) {
    try {
        return transactionRepo.findAllByAccountId(account_id);
    } catch (Exception e) {
        throw new IllegalStateException("Error fetching transactions", e);
    }
}

public void deleteTransaction(Long id) {
    if(transactionRepo.existsById(id)) {
        transactionRepo.deleteById(id);
    } else {
        throw new RuntimeException("Transaction with ID " + id + " not found");
    }
}
}

