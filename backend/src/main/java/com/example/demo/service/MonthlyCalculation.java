// package com.example.demo.service;
//
// import com.example.demo.model.CalculationResult;
// import com.example.demo.model.Transaction;
//
// import org.springframework.stereotype.Component;
//
// import java.time.LocalDate;
// import java.time.YearMonth;
// import java.util.*;
//
// @Component("monthly")
// public class MonthlyCalculation implements ExpenseCalculationStrategy {
//
//    @Override
//    public List<CalculationResult> calculate(List<Transaction> transactions) {
//        Map<YearMonth, Double> grouped = new TreeMap<>();
//        for (Transaction tx : transactions) {
//            YearMonth ym = YearMonth.from(LocalDate.parse(tx.getDate()));
//            grouped.merge(ym, tx.getAmount(), Double::sum);
//        }
//
//        List<CalculationResult> results = new ArrayList<>();
//        grouped.forEach((k, v) -> results.add(new CalculationResult(k.toString(), v)));
//        return results;
//    }
// }
//
