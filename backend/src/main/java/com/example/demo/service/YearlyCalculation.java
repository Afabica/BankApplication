// package com.example.demo.service;
//
// import com.example.demo.model.CalculationResult;
// import com.example.demo.model.Transaction;
//
// import org.springframework.stereotype.Component;
//
// import java.time.LocalDate;
// import java.util.*;
//
// @Component("yearly")
// public class YearlyCalculation implements ExpenseCalculationStrategy {
//    @Override
//    public List<CalculationResult> calculate(List<Transaction> transactions) {
//        Map<Integer, Double> grouped = new TreeMap<>();
//        for (Transaction tx : transactions) {
//            int year = LocalDate.parse(tx.getDate()).getYear();
//            grouped.merge(year, tx.getAmount(), Double::sum);
//        }
//
//        List<CalculationResult> results = new ArrayList<>();
//        grouped.forEach((k, y) -> results.add(new CalculationResult(String.valueOf(k), v)));
//        return results;
//    }
// }
