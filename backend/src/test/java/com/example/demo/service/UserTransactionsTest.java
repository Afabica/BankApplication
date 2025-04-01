package com.example.demo.service;

import com.example.demo.model.Transaction;
import com.example.demo.model.Customer;
import com.example.demo.repository.CardRepository;
import com.example.demo.repository.TransactionRepo;
import com.example.demo.repository.CustomerRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;


import java.util.List;
import org.junit.jupiter.api.extension.ExtendWith;
import java.util.ArrayList;
import java.math.BigInteger;

public class UserTransactionsTest {

    @Mock
    private TransactionRepo transactionRepo;

    @Mock
    private CustomerRepo customerRepo;

    @Mock
    private CardRepository cardRepository;
    

    private TransactionService transactionService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);  // Initializes the mocks
        transactionService = new TransactionService(transactionRepo, customerRepo, cardRepository);
    }

    @Test
    public void testFindByUsername() {
        // Arrange
        String username = "john_doe";
        Customer mockCustomer = new Customer();
        mockCustomer.setUsername(username);
        when(customerRepo.findByUsername(username)).thenReturn(mockCustomer);

        // Act
        Customer foundCustomer = transactionService.findByUsername(username);

        // Assert
        assertNotNull(foundCustomer);
        assertEquals(username, foundCustomer.getUsername());
    }

    @Test
    public void testFindOneTransaction() {
        // Arrange
        Long accountId = 123L;
        Transaction mockTransaction = new Transaction();
        mockTransaction.setAccountId(accountId);
        when(transactionRepo.findOneByAccountId(accountId)).thenReturn(mockTransaction);

        // Act
        Transaction foundTransaction = transactionService.findOneTransaction(accountId);

        // Assert
        assertNotNull(foundTransaction);
        assertEquals(accountId, foundTransaction.getAccountId());
    }

    @Test
    public void testFetchAllTransactions() {
        // Arrange
        Long accountId = 123L;
        List<Transaction> mockTransactions = new ArrayList<>();
        Transaction transaction1 = new Transaction();
        transaction1.setAccountId(accountId);
        mockTransactions.add(transaction1);
        when(transactionRepo.findAllByAccountId(accountId)).thenReturn(mockTransactions);

        // Act
        List<Transaction> transactions = transactionService.fetchAllTransactions(accountId);

        // Assert
        assertNotNull(transactions);
        assertFalse(transactions.isEmpty());
        assertEquals(accountId, transactions.get(0).getAccountId());
    }


    @Test
    public void testDeleteTransaction_Success() {
        // Arrange
        Long transactionId = 123L;
        when(transactionRepo.existsById(transactionId)).thenReturn(true);

        // Act
        transactionService.deleteTransaction(transactionId);

        // Assert
        verify(transactionRepo, times(1)).deleteById(transactionId);
    }

    @Test
    public void testDeleteTransaction_NotFound() {
        // Arrange
        Long transactionId = 123L;
        when(transactionRepo.existsById(transactionId)).thenReturn(false);

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            transactionService.deleteTransaction(transactionId);
        });

        assertEquals("Transaction with ID 123 not found", exception.getMessage());
    }

    // Additional tests for edge cases, exceptions, etc. could be added here
}

