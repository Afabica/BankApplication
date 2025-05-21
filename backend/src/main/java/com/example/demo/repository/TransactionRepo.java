package com.example.demo.repository;

import com.example.demo.model.Transaction;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepo extends JpaRepository<Transaction, Long> {
    Transaction findOneByAccountId(Long accountId);

    List<Transaction> findAllByAccountId(Long accountId);

    //    List<Transaction> findAllBydestinationaccountid(Long destination_account_id);
    List<Transaction> findAllByDestinationAccountId(Long destinationAccountId);

//    @Modifying
//    @Transactional
//    @Query("DELETE FROM transactions where s.user_id = :userId")
//    void deleteByUserId(@Param("userId") Long userId);
}
