package com.example.demo.repository;

import com.example.demo.model.Transaction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepo extends JpaRepository<Transaction, Long> {

    List<Transaction> findByAccount_AccountId(Long accountId);

    List<Transaction> findByIban(String iban);

    //    List<Transaction> findAllBydestinationaccountid(Long destination_account_id);
    List<Transaction> findAllByDestinationAccount_AccountId(Long accountId);

    void deleteById(Long account_id);

    //    @Modifying
    //    @Transactional
    //    @Query("DELETE FROM transactions where s.user_id = :userId")
    //    void deleteByUserId(@Param("userId") Long userId);
}
