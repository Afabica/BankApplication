package com.example.demo.repository;

import com.example.demo.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepo extends JpaRepository<Transaction, Long> {

    // Use customerId field directly (since it's a simple Long type)
    List<Transaction> findByCustomerId(Long customerId);
    Transaction findOneByCustomerId(Long customerId); 
    // Find transactions by status
    List<Transaction> findByStatus(String status);

    // Find transactions by transaction type
    List<Transaction> findByTransactionType(String transactionType);

    List<Transaction> findAllByCustomerId(Long customerId);

    Optional<Transaction> findTopByCustomerIdOrderByTransactionDateDesc(Long customerId);
}

