package com.example.demo.repository;

import com.example.demo.model.BankCardsEnt;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CardRepository extends JpaRepository<BankCardsEnt, Long> {
    Optional<BankCardsEnt> findByCardNumber(String cardNUmber);

    List<BankCardsEnt> findAllByAccountId(Long account_id);

    Optional<BankCardsEnt> findByIban(String iban);
}
