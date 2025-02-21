package com.example.demo.repository;

import com.example.demo.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepo extends JpaRepository<Transaction, Long> {

    // Use customerId field directly (since it's a simple Long type)
    List<Transaction> findByAccountId(Long account_id);
    Transaction findOneByAccountId(Long account_id); 
    // Find transactions by status
    List<Transaction> findByStatus(String account_id);

    // Find transactions by transaction type
    List<Transaction> findByTransactionType(String transactionType);

    List<Transaction> findAllByAccountId(Long account_id);

}

