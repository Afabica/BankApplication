//package com.example.demo.service;
//
//import static org.assertj.core.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//import com.example.demo.model.*;
//import com.example.demo.repository.*;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.*;
//
//import java.math.BigDecimal;
//import java.util.*;
//
//class TransactionServiceTest {
//
//    @Mock private TransactionRepo transactionRepo;
//
//    @Mock private RegisterRepo registerRepo;
//
//    @Mock private RegisteredAccountRepo accountRepo;
//
//    @InjectMocks private TransactionService transactionService;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    void testProcessTransaction_Successful() {
//        RegisteredAccount source = new RegisteredAccount();
//        source.setIban("SRC123");
//        source.setBalance(new BigDecimal("1000.00"));
//
//        RegisteredAccount destination = new RegisteredAccount();
//        destination.setIban("DST456");
//        destination.setBalance(new BigDecimal("500.00"));
//
//        Transaction tx = new Transaction();
//        tx.setIban("SRC123");
//        tx.setDestinationIban("DST456");
//        tx.setAmount(new BigDecimal("200.00"));
//
//        when(accountRepo.findByIban("SRC123")).thenReturn(Optional.of(source));
//        when(accountRepo.findByIban("DST456")).thenReturn(Optional.of(destination));
//
//        transactionService.processTransaction(tx);
//
//        assertThat(source.getBalance()).isEqualByComparingTo("800.00");
//        assertThat(destination.getBalance()).isEqualByComparingTo("700.00");
//        assertThat(tx.getStatus()).isEqualTo("COMPLETED");
//        assertThat(tx.getTransactionDate()).isNotNull();
//
//        verify(accountRepo).save(source);
//        verify(accountRepo).save(destination);
//        verify(transactionRepo).save(tx);
//    }
//
//    @Test
//    void testProcessTransaction_InsufficientFunds() {
//        RegisteredAccount source = new RegisteredAccount();
//        source.setIban("SRC123");
//        source.setBalance(new BigDecimal("100.00"));
//
//        RegisteredAccount destination = new RegisteredAccount();
//        destination.setIban("DST456");
//        destination.setBalance(new BigDecimal("500.00"));
//
//        Transaction tx = new Transaction();
//        tx.setIban("SRC123");
//        tx.setDestinationIban("DST456");
//        tx.setAmount(new BigDecimal("200.00"));
//
//        when(accountRepo.findByIban("SRC123")).thenReturn(Optional.of(source));
//        when(accountRepo.findByIban("DST456")).thenReturn(Optional.of(destination));
//
//        assertThatThrownBy(() -> transactionService.processTransaction(tx))
//                .isInstanceOf(IllegalArgumentException.class)
//                .hasMessage("Insufficient funds.");
//    }
//
//    @Test
//    void testDeleteTransaction_Successful() {
//        when(transactionRepo.existsById(1L)).thenReturn(true);
//
//        transactionService.deleteTransaction(1L);
//
//        verify(transactionRepo).deleteById(1L);
//    }
//
//    @Test
//    void testDeleteTransaction_NotFound() {
//        when(transactionRepo.existsById(2L)).thenReturn(false);
//
//        assertThatThrownBy(() -> transactionService.deleteTransaction(2L))
//                .isInstanceOf(RuntimeException.class)
//                .hasMessageContaining("Transaction with ID 2 not found");
//    }
//
//    @Test
//    void testFindOneTransaction_ReturnsTransaction() {
//        Transaction tx = new Transaction();
//        when(transactionRepo.findOneByAccountId(1L)).thenReturn(tx);
//
//        Transaction result = transactionService.findOneTransaction(1L);
//        assertThat(result).isEqualTo(tx);
//    }
//
//    @Test
//    void testFetchAllTransactions_ReturnsList() {
//        List<Transaction> transactions = List.of(new Transaction(), new Transaction());
//        when(transactionRepo.findAllByAccountId(1L)).thenReturn(transactions);
//
//        List<Transaction> result = transactionService.fetchAllTransactions(1L);
//        assertThat(result).hasSize(2);
//    }
//
//    @Test
//    void testFindByUsername_ReturnsCustomer() {
//        Customer customer = new Customer();
//        when(customerRepo.findByUsername("user1")).thenReturn(customer);
//
//        Customer result = transactionService.findByUsername("user1");
//        assertThat(result).isEqualTo(customer);
//    }
//}
