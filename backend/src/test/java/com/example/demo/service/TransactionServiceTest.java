package com.example.com.service;

import static org.junit.jupiter.api.Assertions.*;

import com.example.demo.model.BankCardsEnt;
import com.example.demo.model.RegisterUser;
import com.example.demo.repository.CardRepository;
import com.example.demo.repository.RegisterRepo;
import com.example.demo.repository.TransactionRepo;
import com.example.demo.service.TransactionService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@SpringBootTest
@Transactional
@ExtendWith(MockitoExtension.class)
public class TransactionServiceTest {

    @Autowired private TransactionRepo transactionRepo;

    @Autowired private CardRepository cardRepository;

    @Autowired private TransactionService transactionService;

    @Autowired private RegisterRepo registerRepo;

    private RegisterUser testUser;
    private BankCardsEnt testCard;

    @BeforeEach
    void setUp() {
        testUser = new RegisterUser();
        testUser.setAccountId(1L);
        registerRepo.save(testUser);

        testCard = new BankCardsEnt();
        testCard.setId(1L);
        testCard.setAccount(testUser);
        testCard.setBalance(BigDecimal.valueOf(1000));
        testCard.setIsActive(true);
    }

    //    @Test
    //    void craeteTransaction_shouldPersistTransaction() {
    //        Transaction txn =
    //                transactionService.createTransaction(
    //                        testCard.getId(), BigDecimal.valueOf(100), "Test Payment");
    //
    //        assertNotNull(txn.getId());
    //        assertEquals(BigDecimal.valueOf(100), txn.getDescription());
    //        assertEquals(testCard.getId(), txn.getCard().getId());
    //    }

    //    @Test
    //    void getTransactionForCard_returnTransactions() {
    //        transactionService.processTransaction (
    //                testCard.getId(), BigDecimal.valueOf(200), "First Txn");
    //        transactionService.createTransaction(
    //                testCard.getId(), BigDecimal.valueOf(300), "Second Txn");
    //        List<Transaction> txns = transactionService.getTransactionsForCard(testCard.getId());
    //    }

    //    @Test
    //    void createTransaction_throwsIfCardNotFound() {
    //        assertThrows(
    //                IllegalArgumentException.class,
    //                () -> {
    //                    transactionService.processTransaction(
    //                            999L, BigDecimal.valueOf(50), "Should fail");
    //                });
    //    }
}
