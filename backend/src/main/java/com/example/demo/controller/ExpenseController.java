// package com.example.demo.controller;
//
// import com.example.demo.jwtsecurity.JwtUtils;
// import com.example.demo.model.CalculationResult;
// import com.example.demo.repository.ExpensesRepo;
// import com.example.demo.repository.RegisteredAccountRepo;
// import com.example.demo.service.TransactionService;
//
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.Authentication;
// import org.springframework.web.bind.annotation.*;
//
// import java.util.List;
// import java.util.Map;
// import java.util.Optional;
//
// @RestController
// @RequestMapping("/operations")
// public class ExpenseController {
//
//    private final TransactionService transactionService;
//    private final RegisteredAccountRepo registeredAccountRepo;
//    private final TransactionCont transactionCont;
//    private final ExpensesRepo expensesRepo;
//    private final JwtUtils jwtUtils;
//
//    @Autowired
//    public ExpenseController(
//            TransactionService transactionService,
//            RegisteredAccountRepo registeredAccountRepo,
//            TransactionCont transactionCont,
//            JwtUtils jwtUtils,
//            ExpensesRepo expensesRepo) {
//        this.transactionService = transactionService;
//        this.registeredAccountRepo = registeredAccountRepo;
//        this.transactionCont = transactionCont;
//        this.jwtUtils = jwtUtils;
//        this.expensesRepo = expensesRepo;
//    }
//
//    @GetMapping("/monthlyop")
//    public ResponseEntity<?> getMonthlyExpenses(
//            @RequestParam("user_id") Long user_id, Authentication authentication) {
//        try {
//            Optional<List<CalculationResult>> stats = expensesRepo.findAllByUserId(user_id);
//            if (stats.isPresent()) {
//                return ResponseEntity.ok(Map.of("monthly_expenses", stats));
//            }
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.status(400).body("Error occured: " + e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.status(400).body("Error occured: " + e.getMessage());
//        }
//    }
// }
