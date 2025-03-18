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
    public void processTransaction(Long accountId, BigInteger transactionAmount) {
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
        transaction.setCustomerId(account.getCustomerId());
        transaction.setAmount(transactionAmount);
        transaction.setTransactionType("Deposit");
        transaction.setBalanceChange(BalanceChange.fromAmount(transactionAmount));  // Assuming BalanceChange is an Enum or a method to define the type of transaction
        transaction.setDescription("Transaction processed for account: " + accountId);

        // Save the transaction
        transactionRepo.save(transaction);
    }
//
    

//    public void transfer(String sender_card_number, String getter_card_number, Long amount) {
//        BankCardsEnt card1 = cardRepository.findByCardNumber(sender_card_number);
//        BankCardsEnt card2 = cardRepository.findByCardNumber(getter_card_number);
//
//        if(card1 && card2) {
//            card1.setBalance(card1.getBalance() - amount);
//            card2.setBalance(card2.getBalance() + amount);
//        }
//    }


    public Customer findByUsername(String username) {
        Customer findCust = customerRepo.findByUsername(username);
        return findCust;
    }

    public Transaction findOneTransaction(Long account_id) {

        Transaction findtrans = transactionRepo.findOneByAccountId(account_id);
        return findtrans;
    }

    // Fetch all transactions for a given customer
//    public List<Transaction> fetchAllTransactions(Long customerId) {
//        List<Transaction> transactions = transactionRepo.findAll();
//        List<Transaction> customerTransactions = new ArrayList<>();
//
//        for (Transaction transaction : transactions) {
//            if (transaction.getCustomerId().equals(customerId)) {
//                customerTransactions.add(transaction);
//            }
//        }
//        return customerTransactions;
//    }
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
    // Additional methods could include:

    // Fetch a transaction by its ID
//    public Transaction fetchTransactionById(Long transactionId) {
//        return transactionRepo.findById(transactionId)
//                .orElseThrow(() -> new IllegalArgumentException("Transaction not found for ID: " + transactionId));
//    }
//
//    // Fetch balance for a specific account
//    public Double fetchAccountBalance(Long accountId) {
//        BankCardsEnt account = cardRepository.findByCustomerId(accountId);
//        if (account == null) {
//            throw new IllegalArgumentException("Account not found for customer ID: " + accountId);
//        }
//        return account.getBalance();
//    }
//
//    // Method for generating balance reports, etc.
//    // This could be more advanced depending on your use case.
//    public List<BalanceChange> generateBalanceReport(Long accountId) {
//        // You can extend this to return a detailed report
//        return cardRepository.findBalanceChangesByAccountId(accountId);
//    }
}

