package com.example.demo.repository;

import com.example.demo.model.BankCardsEnt;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface CardRepository extends JpaRepository<BankCardsEnt, Long> {
    Optional<BankCardsEnt> findByCardNumber(String cardNumber);

    List<BankCardsEnt> findAllByAccount_AccountId(Long accountId);

    //    List<String> findIbansByUserId(Long account_id);

    Optional<BankCardsEnt> findByIban(String iban);

    @Modifying
    @Transactional
    @Query("DELETE FROM BankCardsEnt b where b.account.accountId = :accountId")
    void deleteByAccountId(Long accountId);
}
