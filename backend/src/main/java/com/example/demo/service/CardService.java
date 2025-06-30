package com.example.demo.service;

import com.example.demo.model.BankCardsEnt;
import com.example.demo.repository.CardRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CardService {

    private final CardRepository cardRepository;

    @Autowired
    public CardService(@Lazy CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public List<BankCardsEnt> findAllUserCards(Long userId) {
        List<BankCardsEnt> user_cards = cardRepository.findAllByAccount_AccountId(userId);
        return user_cards;
    }

    public String deleteCardById(Long id) {
        Optional<BankCardsEnt> card = cardRepository.findById(id);
        if (card.isPresent()) {
            cardRepository.deleteById(id);
            return ("Card deleted successfully.");
        } else {
            return "User not found";
        }
    }
}
