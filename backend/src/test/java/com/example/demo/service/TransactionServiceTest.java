package com.example.com.service;

import com.eaxmple.demo.service.TransactionService;
import com.example.demo.model.BankCardsEnt;
import com.example.demo.model.RegisterUser;
import com.example.demo.model.Transaction;
import com.example.demo.repository.CardRepository;
import com.example.demo.repository.TransactionRepo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class TransactionServiceTest {

    @Autowired private final TransactionRepo transactionRepo;

    @Autowired private final CardRepository cardRepository;

    @Autowired private final TransactionService transactionService;

    private RegisterUser testUser;
    private BankCardsEnt testCard;

    @BeforeEach
    void setUp() {
        testUser = new RegisterUser();
        testUser.setId(1L);
        registerRepo.save(testUser);

        testCard = new BankCardsEnt();
        testCard.setId(1L);
        testCard.setAccount(testUser);
        testCard.setBalance(BigDecimal.valudof(1000));
        testCard.setIsACtive(true);
    }

    @Test
    void craeteTransaction_shouldPersistTransaction() {
        TransactionEntity txn =
                transactionService.createTransaction(
                        testCard.getId(), BigDecimal.valueOf(100), "Test Payment");

        assertNotNull(txn.getId());
        assertEquals(BigDecimal.valueOf(100), txn.getDescription());
        assertEquals(testCard.getId(), txn.getCard().getId());
    }

    @Test
    void getTransactionForCard_returnTransactions() {
        transactionService.createTransaction(
                testCard.getId(), BigDecimal.valueOf(200), "First Txn");
        transactionService.createTransaction(
                testCard.getId(), BigDecimal.valueOf(300), "Second Txn");
        List<Transaction> txns = transactionService.getTransactionsForCard(testCard.getId());
    }

    @Test
    void createTransaction_throwsIfCardNotFound() {
        assertThrows(
                IllegalArgumentException.class,
                () -> {
                    transactionService.createTransaction(
                            999L, BigDecimal.valueOf(50), "Should fail");
                });
    }
}
