package com.example.demo.controller;

import com.example.demo.model.StatisticsSummary;
import com.example.demo.model.Transaction;
import com.example.demo.repository.CardRepository;
import com.example.demo.repository.TransactionRepo;
import com.example.demo.service.CalculationService;
import com.example.demo.service.TransactionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/operations")
public class TransactionCont {

    private final TransactionService transactionService;
    private final CalculationService calculationService;
    private final TransactionRepo transactionRepo;
    private final CardRepository cardRepository;

    @Autowired
    public TransactionCont(
            TransactionService transactionService,
            CalculationService calculationService,
            TransactionRepo transactionRepo,
            CardRepository cardRepository) {
        this.transactionService = transactionService;
        this.calculationService = calculationService;
        this.transactionRepo = transactionRepo;
        this.cardRepository = cardRepository;
    }

    // Endpoint to fetch the transaction list of a user
    //    @GetMapping("/translist")
    //    public ResponseEntity<?> getTransactionList(
    //            @RequestParam("user_id") Long userId, Authentication authentication) {
    //
    //        try {
    //            // Ensure the user is authenticated
    //            //
    //            String loggedInUser = authentication.getName(); // Get the authenticated user from
    // JWT
    //
    //            // Fetch transactions for the given userId
    //            List<Transaction> listtrans = transactionService.fetchAllTransactions(userId);
    //            List<Transaction> listtrans1 =
    // transactionService.fetchAllDestTransactions(userId);
    //            listtrans.addAll(listtrans1);
    //
    //            if (listtrans.isEmpty()) {
    //                return ResponseEntity.status(404).body(Map.of("message", "No transactions
    // found"));
    //            } else {
    //                return ResponseEntity.status(200)
    //                        .body(Map.of("message", "Transactions have found"));
    //            }
    //        } catch (IllegalArgumentException e) {
    //            // Return error response with 400 status for bad request
    //            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
    //        } catch (Exception e) {
    //            // Return generic error response
    //            return ResponseEntity.status(500).body(Map.of("error", "Internal Server Error"));
    //        }
    //    }
    @GetMapping("/translist")
    public ResponseEntity<?> getTransctionList(@RequestParam("user_id") Object userId) {
        try {
            List<Transaction> listtrans = transactionService.fetchAllTransactions(userId);
            if (listtrans.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("message", "No transactions found"));
            }

            return ResponseEntity.ok(listtrans);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Internal Server Error"));
        }
    }

    @PostMapping("/process")
    public ResponseEntity<?> processTransaction(
            @RequestBody Transaction transaction, Authentication authentication) {
        try {

            transactionService.processTransaction(transaction);
            return ResponseEntity.ok(Map.of("message", "Transaction processed sucessfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTransaction(@PathVariable Long id) {
        try {
            // Delete the transaction using the service
            transactionService.deleteTransaction(id);
            return ResponseEntity.ok("Transaction deleted successfully");
        } catch (RuntimeException e) {
            // Return error response if transaction is not found
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping("/balance")
    public ResponseEntity<?> getUserCurrentBalance(@RequestParam("user_id") Long user_id) {
        try {
            BigDecimal balance = transactionService.getCardBalance(user_id);
            if (balance != null) {
                return ResponseEntity.ok(balance);
            } else {
                return ResponseEntity.status(404).body("No balance information found.");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400)
                    .body("Erorr during fetchig balance information. " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Map.of("error", "Ineternal Server Error: " + e.getMessage()));
        }
    }

    //    @GetMapping("/card_balance")
    //    public ResponseEntity<?> getCardCurrentBalance(@RequestParam("user_id") Long user_id) {
    //        try {
    //            BigDecimal balance = transactionService.getBalanceByCard(user_id);
    //
    //        }
    //    }

    @GetMapping("/stats")
    public ResponseEntity<?> getUserStats(
            @RequestParam("user_id") Long user_id, Authentication authentication) {
        LocalDateTime now = LocalDateTime.now();
        List<Transaction> transactions = transactionRepo.findByAccount_AccountId(user_id);
        List<Transaction> yeartrans =
                calculationService.filterTransactionsByYear(
                        transactions, now.getYear(), now.getMonthValue());

        List<Transaction> monthtrans =
                calculationService.filterTransactionsByMonth(
                        transactions, now.getYear(), now.getMonthValue());

        StatisticsSummary yearly = calculationService.calculateStatistics(yeartrans);
        StatisticsSummary monthly = calculationService.calculateStatistics(monthtrans);

        if (yearly.getTotal() != null && monthly.getTotal() != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("yearly", yearly);
            response.put("monthly", monthly);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(404).body("Calculation process was not successful.");
        }
    }

    @GetMapping("/transcheck")
    public String getSecureData() {
        return "This is a secured endpoint.";
    }

    @GetMapping("/iban")
    public ResponseEntity<?> getUserIbans(
            @RequestParam("user_id") Long userId, Authentication auth) {
        System.out.println("Auth: " + auth);
        return ResponseEntity.ok(cardRepository.findAllByAccount_AccountId(userId));
    }

    //    @GetMapping("/iban")
    //    public ResponseEntity<?> getUserIbans(@RequestParam("user_id") Long userId) {
    //        try {
    //            List<BankCardsEnt> cardlist = cardRepository.findAllByAccountId(userId);
    //            if (cardlist.isEmpty()) {
    //                return ResponseEntity.status(404).body(Map.of("message", "No ibans found"));
    //            }
    //            return ResponseEntity.ok(cardlist);
    //        } catch (IllegalArgumentException e) {
    //            return ResponseEntity.status(400).body(Map.of("message", "No ibans found"));
    //        } catch (Exception e) {
    //            return ResponseEntity.status(500).body(Map.of("error", "Internal Server Error"));
    //        }
    //    }

    private boolean isAdmin(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));
    }

    // Optional: Helper method to fetch user ID from username (assuming your JWT contains user info)
    //    private Long getUserIdFromUsername(String username) {
    //        // Fetch the user ID from the database or service layer based on the username
    //        Customer customer = customerRepo.findByUsername(username);
    //        return customer != null ? customer.getId() : null;
    //    }
}
