package com.example.demo.service;

import com.example.demo.model.BankCardsEnt;
import com.example.demo.model.Transaction;
import com.example.demo.repository.CardRepository;
import com.example.demo.repository.TransactionRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepo transactionRepo;
    private final CardRepository cardRepository;

    @Autowired
    public TransactionService(TransactionRepo transactionRepo, CardRepository cardRepository) {
        this.transactionRepo = transactionRepo;
        this.cardRepository = cardRepository;
    }

    // Processing transaction
    @Transactional
    public Transaction processTransaction(Transaction transaction) {
        // Fetch source and destination cards
        List<Transaction> history =
                transactionRepo.findByAccount_AccountId(transaction.getAccount().getAccountId());

        //        List<String> alerts = FraudEngine.detect(transation, history);
        //        if (!alerts.isEmpty()) {
        //            transaction.setFlagged(true);
        //            transaction.setAlerts(alerts);
        //        }
        BankCardsEnt sourceCard =
                cardRepository
                        .findByCardNumber(transaction.getSourceCardNumber())
                        .orElseThrow(() -> new IllegalArgumentException("Source card not found"));

        BankCardsEnt destinationCard =
                cardRepository
                        .findByCardNumber(transaction.getDestinationCardNumber())
                        .orElseThrow(
                                () -> new IllegalArgumentException("Destination card not found"));

        BigDecimal amount = transaction.getAmount();
        if (sourceCard.getBalance().compareTo(amount) < 0) {
            throw new IllegalArgumentException("Insufficient funds on source card.");
        }

        // Update card balances
        sourceCard.setBalance(sourceCard.getBalance().subtract(amount));
        destinationCard.setBalance(destinationCard.getBalance().add(amount));

        // Persist updated balances
        cardRepository.save(sourceCard);
        cardRepository.save(destinationCard);

        // Prepare transaction record
        LocalDateTime now = LocalDateTime.now();
        transaction.setAccount(sourceCard.getAccount());
        transaction.setIban(sourceCard.getIban());
        transaction.setDestinationIban(destinationCard.getIban());
        transaction.setTransactionDate(now);
        transaction.setCreatedAt(now);
        transaction.setUpdatedAt(now);
        transaction.setStatus("COMPLETED");

        // Save transaction
        return transactionRepo.save(transaction);
    }

    /** Retrieves current balance for a specific card by its ID. */
    public BigDecimal getCardBalance(Long cardId) {
        BankCardsEnt card =
                cardRepository
                        .findById(cardId)
                        .orElseThrow(
                                () -> new IllegalArgumentException("Card not found: " + cardId));
        return card.getBalance();
    }

    /** Fetch all transactions by user ID (all cards belonging to user). */
    public List<Transaction> fetchTransactionsByUserId(Long userId) {
        return transactionRepo.findByAccount_AccountId(userId);
    }

    /** Fetch all transactions by IBAN. */
    public List<Transaction> fetchTransactionsByIban(String iban) {
        return transactionRepo.findByIban(iban);
    }

    /** Fetch transactions by either user ID or IBAN. */
    public List<Transaction> fetchAllTransactions(Object idOrIban) {
        if (idOrIban instanceof String) {
            return fetchTransactionsByIban((String) idOrIban);
        } else if (idOrIban instanceof Long) {
            return fetchTransactionsByUserId((Long) idOrIban);
        } else {
            throw new IllegalArgumentException(
                    "Invalid identifier type. Must be userId (Long) or IBAN (String).");
        }
    }

    /** Delete a transaction by its ID. */
    @Transactional
    public void deleteTransaction(Long id) {
        if (!transactionRepo.existsById(id)) {
            throw new IllegalArgumentException("Transaction with ID " + id + " not found");
        }
        transactionRepo.deleteById(id);
    }
}
