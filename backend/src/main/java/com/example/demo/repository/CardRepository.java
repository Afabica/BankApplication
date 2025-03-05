package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.BankCardsEnt;
import java.util.List;
import java.util.Optional;

@Repository
public interface CardRepository extends JpaRepository<BankCardsEnt, Long> {
    
    // Fetch all cards for a given customer
    List<BankCardsEnt> findAllByCustomerId(Long customerId);

    // Find a card by its unique card number
    BankCardsEnt findByCardNumber(String cardNumber);

    // Find a card by its unique ID
    BankCardsEnt findByCustomerId(Long customerId);

    BankCardsEnt findByCardId(Long cardId);
    

    // Soft delete a card (sets "deleted" field to true instead of actually deleting)
//    @Modifying
//    @Transactional
//    @Query("UPDATE BankCardsEnt b SET b.deleted = true WHERE b.id = :id")
//    int softDeleteById(@Param("id") Long id);
}

