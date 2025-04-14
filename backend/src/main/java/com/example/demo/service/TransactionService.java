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
import java.math.BigDecimal;
import com.example.demo.model.BalanceChange;

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
    
//    public void processTransaction(BalanceChange transaction) {
//    // Fetch the source and destination accounts
//    BankCardsEnt sourceAccount = cardRepository.findByCustomerId(transaction.getAccountSource());
//    BankCardsEnt destinationAccount = cardRepository.findByCustomerId(transaction.getAccountDestination());
//
//    // Validate accounts exist
//    if (sourceAccount == null || destinationAccount == null) {
//        throw new IllegalArgumentException("One or both accounts not found for provided customer IDs.");
//    }
//
//    // Ensure balance and transaction amount are not null
//    Long sourceBalance = (sourceAccount.getBalance() != null) ? sourceAccount.getBalance() : 0L;
//    Long destinationBalance = (destinationAccount.getBalance() != null) ? destinationAccount.getBalance() : 0L;
//    Long transactionAmount = (transaction.getTransactionAmount() != null) ? transaction.getTransactionAmount() : 0L;
//
//    // Ensure sufficient funds
//    if (sourceBalance < transactionAmount) {
//        throw new IllegalArgumentException("Insufficient funds in source account.");
//    }
//
//    // Perform transaction
//    long newSourceBalance = sourceBalance - transactionAmount; // Deduct from source
//    long newDestinationBalance = destinationBalance + transactionAmount; // Add to destination
//
//    // Update balances
//    sourceAccount.setBalance(newSourceBalance);
//    destinationAccount.setBalance(newDestinationBalance);
//
//    // Save updated accounts
//    cardRepository.save(sourceAccount);
//    cardRepository.save(destinationAccount);
//
//    // Record the transaction
//    Transaction transactionRecord = new Transaction();
//    transactionRecord.setId(sourceAccount.getCustomerId());
//    transactionRecord.setAmount(transactionAmount);
//    transactionRecord.setTransactionType("Transfer");
//    transactionRecord.setDescription("Transferred to account: " + destinationAccount.getCustomerId());
//
//    transactionRepo.save(transactionRecord);
//}
 

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

