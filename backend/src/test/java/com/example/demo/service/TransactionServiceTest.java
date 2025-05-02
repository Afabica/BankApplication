//import static org.mockito.Mockito.*;
//import static org.junit.jupiter.api.Assertions.*;
//
//import java.math.BigDecimal;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.*;
//import org.springframework.boot.test.context.SpringBootTest;
//
//@SpringBootTest
//class TransactionServiceTest {
//
//    @InjectMocks
//    private TransactionService transactionService;
//
//    @Mock
//    private TransactionRepository transactionRepo;
//
//    private Transaction sourceAccount;
//    private Transaction destinationAccount;
//
//    @BeforeEach
//    void setup() {
//        MockitoAnnotations.openMocks(this);
//
//        sourceAccount = new Transaction();
//        sourceAccount.setAccountId("ACC123");
//        sourceAccount.setAmount(new BigDecimal("1000.00"));
//
//        destinationAccount = new Transaction();
//        destinationAccount.setAccountId("ACC456");
//        destinationAccount.setAmount(new BigDecimal("500.00"));
//    }
//
//    @Test
//    void testSuccessfulTransactionProcessing() {
//        // Arrange
//        Transaction transaction = new Transaction();
//        transaction.setAccountId("ACC123");
//        transaction.setDestinationAccountId("ACC456");
//        transaction.setAmount(new BigDecimal("200.00"));
//
//        when(transactionRepo.findOneByAccountId("ACC123")).thenReturn(sourceAccount);
//        when(transactionRepo.findOneByAccountId("ACC456")).thenReturn(destinationAccount);
//
//        // Act
//        transactionService.processTransaction(transaction);
//
//        // Assert
//        assertEquals(new BigDecimal("800.00"), sourceAccount.getAmount());
//        assertEquals(new BigDecimal("700.00"), destinationAccount.getAmount());
//        assertEquals("TRANSFER", transaction.getTransactionType());
//        assertEquals("COMPLETED", transaction.getStatus());
//        assertTrue(transaction.getDescription().contains("Transferred to account: ACC456"));
//
//        verify(transactionRepo).save(sourceAccount);
//        verify(transactionRepo).save(destinationAccount);
//        verify(transactionRepo).save(transaction);
//    }
//
//    @Test
//    void testInsufficientFunds() {
//        Transaction transaction = new Transaction();
//        transaction.setAccountId("ACC123");
//        transaction.setDestinationAccountId("ACC456");
//        transaction.setAmount(new BigDecimal("2000.00")); // Too much!
//
//        when(transactionRepo.findOneByAccountId("ACC123")).thenReturn(sourceAccount);
//        when(transactionRepo.findOneByAccountId("ACC456")).thenReturn(destinationAccount);
//
//        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
//            () -> transactionService.processTransaction(transaction));
//
//        assertEquals("Insufficient funds in source account.", exception.getMessage());
//    }
//
//    @Test
//    void testAccountNotFound() {
//        Transaction transaction = new Transaction();
//        transaction.setAccountId("ACC999");
//        transaction.setDestinationAccountId("ACC456");
//        transaction.setAmount(new BigDecimal("100.00"));
//
//        when(transactionRepo.findOneByAccountId("ACC999")).thenReturn(null);
//
//        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
//            () -> transactionService.processTransaction(transaction));
//
//        assertEquals("One or both accounts not found for provided customer IDs.", exception.getMessage());
//    }
//}
//
