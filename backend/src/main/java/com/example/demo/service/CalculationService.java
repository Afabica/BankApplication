package com.example.demo.service;

import com.example.demo.model.StatisticsSummary;
import com.example.demo.model.Transaction;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CalculationService {

    public StatisticsSummary calculateStatistics(List<Transaction> transactions) {
        BigDecimal total = BigDecimal.ZERO;
        BigDecimal min = null;
        BigDecimal max = null;

        for (Transaction transaction : transactions) {
            BigDecimal amount = transaction.getAmount();
            total = total.add(amount);
            if (min == null || amount.compareTo(min) < 0) {
                min = amount;
            }
            if (max == null || amount.compareTo(max) > 0) {
                max = amount;
            }
        }

        BigDecimal average =
                transactions.isEmpty()
                        ? BigDecimal.ZERO
                        : total.divide(
                                BigDecimal.valueOf(transactions.size()),
                                2,
                                BigDecimal.ROUND_HALF_UP);

        StatisticsSummary stats = new StatisticsSummary();
        stats.setAverage(average);
        stats.setTotal(total);

        return stats;
    }

    public List<Transaction> filterTransactionsByMonth(
            List<Transaction> transactions, int year, int month) {
        return transactions.stream()
                .filter(
                        (Transaction t) -> {
                            LocalDateTime date = t.getCreatedAt();
                            return date != null
                                    && date.getYear() == year
                                    && date.getMonthValue() == month;
                        })
                .collect(Collectors.toList());
    }

    public List<Transaction> filterTransactionsByYear(
            List<Transaction> transactions, int year, int month) {
        return transactions.stream()
                .filter(
                        (Transaction t) -> {
                            LocalDateTime date = t.getCreatedAt();
                            return date != null && date.getYear() == year;
                        })
                .collect(Collectors.toList());
    }
}
